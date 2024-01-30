import { Percolation } from "./Percolation";

export class PercolationStats {
  private p: number;
  private t: number;
  private mean: number;
  private stddev: number;

  constructor(N: number, T: number) {
    this.t = T;
    let totalOpened = 0;
    let count = 0;
    for (let i = 0; i < T; i++) {
      const percolation = new Percolation(N);
      let opened = 0;
      let nBlocked = N * N;
      while (!percolation.percolates()) {
        let x = Math.floor(Math.random() * N);
        let y = Math.floor(Math.random() * N);
        if (!percolation.isOpen(x, y)) {
          percolation.open(x, y);
          opened++;
          nBlocked--;
        }
      }
      totalOpened += opened;
      if (opened / (N * N) >= 0.5903) {
        count++;
      }
    }
    this.p = count / T;
    this.mean = totalOpened / (T * N * N);
    this.stddev = Math.sqrt((this.p * (1 - this.p)) / T);
  }

  getMean(): number {
    return this.mean;
  }

  getStdDev(): number {
    return this.stddev;
  }

  confidenceLo(): number {
    return this.mean - (1.96 * this.stddev) / Math.sqrt(this.t);
  }

  confidenceHi(): number {
    return this.mean + (1.96 * this.stddev) / Math.sqrt(this.t);
  }
}
