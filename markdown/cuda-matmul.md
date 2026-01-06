### Kernel 5 — Blocktiling and 2D Threadtiling

Foo. Inline `code`. 

```cpp
// BM: block tile height in M (rows of C per block)
#define BM ...
// BN: block tile width in N (cols of C per block)
#define BN ...
// BK: block tile width in K
#define BK ...
// TM: number of rows of C computed per thread
#define TM ...
// TN: number of cols of C computer per thread
#define TN ...

// assumes:
//   - BM % TM == 0
//   - BN % TN == 0
//   - blockDim.x = BN / TN
//   - blockDim.y = BM / TM

// each thread:
//   - computes TM rows (threadRow * TM + r)
//   - computes TN cols (threadCol * TN + c)

__global__ void sgemm_shared_mem_block(
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
  
  // global output coordinates
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
  
    // load A tile
    #pragma unroll
    for (int c = 0; c < TM; ++r) {
      const int aRow = globalRowBase + r;
      const int aCol = bk + threadCol;
      As[threadRow * TM + r][threadCol] =
        (aRow < M && aCol < K) ? A[aRow * K + aCol] : 0.0f;
    }
    
    // load B tile
    #pragma unroll
    for (int c = 0; c < TN; ++c) {
      const int bCol = globalColBase + c;
      const int bRow = bk + threadRow;
      Bs[threadRow][threadCol * TN + c] =
      (bRow < K && bCol < N) ? B[bRow * N + bCol] : 0.0f;
    }
    // NOTE: bRow = bk + threadRow → threadRow only 
    // ranges 0 .. (BM/TM)-1, but B’s tile has BK rows, 
    // so you'll only load the first BM/TM rows of the BK 
    // rows unless BM/TM == BK. You need a loop/stride over kRow.
    // Similar for As.
    // In other words:
    //  - For B: your threadRow must cover BK rows → need stride if blockDim.y < BK.
    //  - For A: your threadCol must cover BK cols → need stride if blockDim.x < BK.
    
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
  }
  
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

===

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

