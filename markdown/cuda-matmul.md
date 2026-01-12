### Kernel 1 — Naive

#### Implementation



<div class="body-image">
  <img src="cuda-matmul-k1-thread-hierarchy.jpg" alt="Thread hierarchy">
  <div class="image-text">Each invocation of a CUDA kernel creates a new grid, which consists of multiple blocks. Each block consists of up to 1024 individual threads.</div>
</div>



For our first kernel, we'll assign each thread to a unique entry in the output matrix `C`. That thread will compute the dot product of the corresponding row of `A` and column of `B`, and write the result to `C`. 

We launch the kernel like this.

```cpp
// e.g. 32x32 threads per block (i.e. blockDim.x = blockDim.y = 32)
dim3 block(32, 32);
// create as many blocks as necessary to map all of C
// (i.e. gridDim.x = N/32, gridDim.y = M/32
dim3 grid(CEIL_DIV(N, 32), CEIL_DIV(M, 32));
// launch the asynchronous execution of the kernel on the device
// the function call returns immediately on the host
sgemm_naive<<<grid, block>>>(M, N, K, alpha, beta, A, B, C);
```

The kernel itself looks like this.

```cpp
__global__ void sgemm_naive(
  int M, int N, int K, float alpha, float beta,
  const float* __restrict__ A, 
  const float* __restrict__ B,
  float* __restrict__ C
) {
  // compute position in C that this thread is responsible for
  const uint globalRow = blockIdx.y * blockDim.y + threadIdx.y;
  const uint globalCol = blockIdx.x * blockDim.x + threadIdx.x;

  // the `if` condition is needed if M is not a multiple of gridDim.y 
  // or N is not a multiple of gridDim.x
  if (globalRow < M && globalCol < N) {
    float tmp = 0.0f;
    for (int i = 0; i < K; ++i) {
      // recall: A (MxK) and B (KxN)
      // tmp += A[y, i] * B[i, x]
      tmp += A[y * K + i] * B[i * N + x];
    }
    // C = α*(A@B)+β*C
    // C[y, x]
    C[y * N + x] = alpha * tmp + beta * C[y * N + x];
  }
}
```

Note that if the size of the matrix is not divisible by the size of the block, we'll have to launch extra blocks to process the remainder. This is called [tile quantization](https://docs.nvidia.com/deeplearning/performance/dl-performance-matrix-multiplication/index.html#tile-quant).



<div class="body-image">
  <img src="cuda-matmul-k1-tile-quantization.jpg" alt="Tile quantization">
  <div class="image-text">Here, we need to create 9 blocks to cover <code>C</code>. Only 4 of those utilize all their threads.</div>
</div>


#### Performance

### Kernel 2 — Global Memory Coalescing

For execution, the threads of a block are grouped into warps, consisting of 32 threads. The grouping into warps happens based on a consecutive `threadId`, which is calculated as `threadId = threadIdx.x + blockDim.x * threadIdx.y`. Threads with neighboring `threadId` become part of the same warp.

Contiguous memory accesses by threads that are part of the same warp can be grouped and executed as one. This is referred to as global memory coalescing.

<div class="body-image">
  <img src="cuda-matmul-k2-gmem-coalescing.jpg" alt="Global memory coalescing">
  <div class="image-text">The threads are at the top, in increasing <code>threadId</code>. For ease of visualization, <code>gridDim.x</code> is 4. Here, threads in a warp access consecutive memory addresses, so the 32 accesses (one by each thread) of a 32-bit (4B) float, can be grouped into one 128B access.</div>
</div>

Global memory coalescing is only possible if the floats loaded are consecutive in memory, and if access is aligned. If they aren't, then the GPU will execute as many 32B loads (the smallest load size — with the other options being 64B and 128B) as necessary to fetch all floats, leading to a lot of wasted bandwidth.

Fortunately, our naive kernel already supports global memory coalescing. Why? Because it choses the warp-contiguous index to be the contiguous memory dimension of `B` and `C`, i.e. the column. 

<div class="body-image">
  <img src="cuda-matmul-k2-gmem-coalescing-contiguous.jpg" alt="Global memory coalescing">
  <div class="image-text">Our kernel maps threads to positions in matrix <code>C</code> like this. This means that threads access memory in both <code>B</code> and <code>C</code> that are next to each other. In <code>A</code> all threads access the same memory.</div>
</div>

<div class="body-image">
  <img src="cuda-matmul-k2-gmem-coalescing-non-contiguous.jpg" alt="Global memory coalescing">
  <div class="image-text">If we instead mapped threads to positions in <code>C</code> like this, threads would not be accessing memory that is next to each other. The memory would be <code>N</code> positions apart.</div>
</div>




### Kernel 3 — Blocktiling

#### Implementation

Each SM has one shared memory (SMEM). As the shared memory is located on-chip, it has a much lower latency and higher bandwidth than global memory. For Volta (released in 2017) the benchmarks performed in [this paper](https://arxiv.org/abs/1804.06826) report 750 GiB/s of global memory bandwidth, and 12,080 GiB/s of shared memory bandwidth.

For this kernel, we'll load a tile of `A` and a tile of `B` from global memory into shared memory. Then we'll perform as much work as possible on the two tiles, with each thread still being assigned one entry of `C`. We'll slide the tiles along the columns of `A` and the rows of `B` computing partial sums in `C` until we have have the full result.

We start by setting up the blocktiling parameters (namely the block size `BS`) along with arrays for the shared memory tiles. Then we start our loop sliding over the K dimension. (SHOULD I USE DIFFERENT WIDTH AND HEIGHT FOR THE BLOCK TILES?)

```cpp
```


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
          acc[r][c] += aReg[r] * bReg[c];
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


### Kernel 6 — Vectorize SMEM and GMEM Accesses

#### Implementation

Let's take another look at how each thread accesses shared memory in the previous kernel. Here is the same sketch where we look at the first iteration of the `k`-loop.

From `As`, each thread loads a slice of a column, which is a strided access. From `Bs`, each thread loads a slice of a row, which is a contiguous access. We can improve the performance by making both accesses contiguous, allowing for vectorized loads.

<div class="body-image">
  <img src="cuda-matmul-k5-compute-k0.jpg" alt="Compute result">
  <div class="image-text">The access from <code>Bs</code> is contiguous, while the access from <code>As</code> is strided.</div>
</div>

We can achieve this by transposing `As`. That is, we change the layout of `As` from `As[BM][BK]` to `As[BK][BM]`. This way, when each thread loads its `TM`-element vector from `As`, it will be a contiguous access.

<div class="body-image">
  <img src="cuda-matmul-k6-compute-k0.jpg" alt="Compute result">
  <div class="image-text">Now the access from both <code>As</code> and <code>Bs</code> is contiguous. (Note that <code>aReg</code> is also contiguous, just illustrated as a column vector here for clarity.)</div>
</div>

The initialization code changes accordingly.

```cpp
  __shared__ float As[BK][BM];
  __shared__ float Bs[BK][BN];
```

And the only change to the loading code is that we swap the indices when loading `As`.

```cpp
    // load A tile
    for (int kCol = threadCol; kCol < BK; kCol += blockDim.x) {
      const int aCol = bk + kCol;
      #pragma unroll
      for (int r = 0; r < TM; ++r) {
        const int aRow = globalRowBase + r;
        As[kCol][threadRow * TM + r] =
          (aRow < M && aCol < K) ? A[aRow * K + aCol] : 0.0f;
      }
    }
```
