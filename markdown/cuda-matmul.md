### Kernel 5 — Blocktiling and 2D Threadtiling

#### Implementation

We start by setting up the block- and threadtiling parameters along with arrays for the shared memory tiles and the register accumulators. Then we start our loop sliding over the `K` dimension.

```cpp
#define BM ...  // block tile height in M (rows of C per block)
#define BN ...  // block tile width in N (cols of C per block)
#define BK ...  // block tile width in K
#define TM ...  // thread tile height in M (rows of C per thread)
#define TN ...  // thread tile width in N (cols of C per thread)

// assumes:
//   - blockDim.y == BM / TM
//   - blockDim.x == BN / TN

__global__ void sgemm_blocktiling_2dthreadtiling(
  int M, int N, int K, float alpha, float beta,
  const float* __restrict__ A, 
  const float* __restrict__ B,
  float* __restrict__ C
) {
  // block indices
  const int blockRow = blockIdx.y;
  const int blockCol = blockIdx.x;
  
  // thread indices
  const int threadCol = threadIdx.x;  // 0 .. (BN/TN)-1
  const int threadRow = threadIdx.y;  // 0 .. (BM/TM)-1
  
  // global output coordinates in C
  const int globalColBase = blockCol * BN + threadCol * TN;
  const int globalRowBase = blockRow * BM + threadRow * TM;
  
  // shared memory tiles
  __shared__ float As[BM][BK];
  __shared__ float Bs[BK][BN];
  
  // register accumulators (TM x TN per thread)
  float acc[TM][TN];
  #pragma unroll
  for (int r = 0; r < TM; ++r) {
    #pragma unroll
    for (int c = 0; c < TN; ++c) {
      acc[r][c] = 0.0f;
    }
  }
  
  // register cache for (a part of) col of A and row of B
  float aReg[TM];
  float bReg[TN];
  
  // slide over K
  for (int bk = 0; bk < K; bk += BK) {
    ...  
```

<div class="body-image">
  <img src="cuda-matmul-k5-overview.jpg" alt="Loop result">
  <div class="image-text">We slide over the <code>K</code> dimension in blocks of size <code>BK</code>.</div>
</div>

For each iteration of the `bk`-loop, we do the steps outlined below.

First, each block loads a tile of `A` and `B` from global memory into shared memory `As[BM][BK]` and `Bs[BK][BN]`.

```cpp
    // load A tile
    for (int kCol = threadCol; kCol < BK; kCol += blockDim.x) {
      const int aCol = bk + kCol;
      #pragma unroll
      for (int r = 0; r < TM; ++r) {
        const int aRow = globalRowBase + r;
        As[threadRow * TM + r][kCol] =
          (aRow < M && aCol < K) ? A[aRow * K + aCol] : 0.0f;
      }
    }
    
    // load B tile
    for (int kRow = threadRow; kRow < BK; kRow += blockDim.y) {
      const int bRow = bk + kRow;
      #pragma unroll
      for (int c = 0; c < TN; ++c) {
        const int bCol = globalColBase + c;
        Bs[kRow][threadCol * TN + c] =
          (bRow < K && bCol < N) ? B[bRow * N + bCol] : 0.0f;
      }
    }
```

Ignoring the `kCol` loop for now, each thread loads a `TM`-element long slice, at the column index `threadCol`, from `A` into `As`. Similarly, ignoring the `kRow` loop, each thread loads a `TN`-element long slice, at the row index `threadRow`, from `B` into `Bs`.

However, the threads in this block need to load its entire tile of `A` and `B` into shared memory. For `As` we know that we have the `BM` dimension covered as `BM / TM == blockDim.y`. But we don't know whether we have the `BK` dimension covered as we don't know whether `BK <= blockDim.x`. If `BK > blockDim.x` then we have columns of `As` that don't get covered. This is why we need the `kCol` loop. We stride over the columns by `blockDim.x` to cover any remaining columns. Similarly, we need the `kRow` loop to cover any remaining rows of `B`.

<div class="body-image">
  <img src="cuda-matmul-k5-load.jpg" alt="Load result">
  <div class="image-text">The threads in the block cooperatively load a tile of <code>A</code> and <code>B</code> from global memory into shared memory. Here, I show three threads and the elements they laod into <code>As</code> and <code>Bs</code>.</div>
</div>

Next, each thread computes the results for its thread tile. As usual, we need to synchronize before computing the results to ensure that all threads have loaded their data into shared memory, and after to ensure that no thread begins loading the next tile before all threads have finished computing the results for the current tile.

```cpp
    __syncthreads();

    // compute
    #pragma unroll
    for (int k = 0; k < BK; ++k) {
      #pragma unroll
      for (int r = 0; r < TM; ++r) {
        aReg[r] = As[threadRow * TM + r][k];
      }
      #pragma unroll
      for (int c = 0; c < TN; ++c) {
        bReg[c] = Bs[k][threadCol * TN + c];
      }
      #pragma unroll
      for (int r = 0; r < TM; ++r) {
        #pragma unroll
        for (int c = 0; c < TN; ++c) {
          acc[r][c] += aFrag[r] * bFrag[c];
        }
      }
    }

    __syncthreads();
```

In each iteration of the `k`-loop, each thread computes the product of the elements it is responsible for in `As` and `Bs` and adds it to the corresponding element in `acc`.

<div class="body-image">
  <img src="cuda-matmul-k5-compute.jpg" alt="Compute result">
  <div class="image-text">Each thread computes the product of the elements it is responsible for in <code>As</code> and <code>Bs</code> and adds it to the corresponding element in <code>acc</code>.</div>
</div>

It is easier to see what's happening if we look at just the first iteration of the `k`-loop. First, we loop over `r` to load a `TM`-element vector from `As` into `aReg` — that is from shared memory into registers. Then, we loop over `c` to load a `TN`-element vector from `Bs` into `bReg`. Finally, we loop over both `r` and `c` to take the product of each element in `aReg` and `bReg` and add it to the corresponding element in `acc`.

<div class="body-image">
  <img src="cuda-matmul-k5-compute-k0.jpg" alt="Compute result">
  <div class="image-text">Each thread first loads the elements it is responsible for in this iteration of the <code>k</code>-loop into registers. Then, it computes the product of each element in <code>aReg</code> and <code>bReg</code> and adds it to the corresponding element in <code>acc</code>.</div>
</div>

We now have the results that the thread has computed in `acc`. We just have to write the values to `C`.

```cpp
  // write results
  #pragma unroll
  for (int r = 0; r < TM; ++r) {
    const int row = globalRowBase + r;
    if (row < M) {
      #pragma unroll
      for (int c = 0; c < TN; ++c) {
        const int col = globalColBase + c;
        if (col < N) {
          const int idx = row * N + col;
          C[idx] = alpha * acc[r][c] + beta * C[idx];
        }
      }
    }
  }
}
```

This is a simple loop over each element in `acc`.

<div class="body-image">
  <img src="cuda-matmul-k5-write.jpg" alt="Write result">
  <div class="image-text">Each thread writes the values in its <code>acc</code> to the corresponding position in <code>C</code>.</div>
</div>

#### Performance
