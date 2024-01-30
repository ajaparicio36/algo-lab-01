import { WeightedQuickUnionUF } from "./WeightedQuickUnion";

export class Percolation {
  private grid: boolean[][];
  private uf: WeightedQuickUnionUF;

  constructor(N: number) {
    this.grid = Array(N)
      .fill(0)
      .map(() => Array(N).fill(false));
    this.uf = new WeightedQuickUnionUF(N * N + 2);
  }

  openWithProbability(i: number, j: number, probability: number): void {
    if (!this.isValid(i, j)) throw new Error("Invalid coordinates");
    if (Math.random() <= probability) {
      this.open(i, j);
    }
  }

  open(i: number, j: number): void {
    if (!this.isValid(i, j)) throw new Error("Invalid coordinates");

    if (this.isOpen(i, j)) return;
    this.grid[i][j] = true;

    if (i > 0 && this.isOpen(i - 1, j))
      this.uf.union(this.index(i, j), this.index(i - 1, j));

    if (i < this.grid.length - 1 && this.isOpen(i + 1, j))
      this.uf.union(this.index(i, j), this.index(i + 1, j));

    if (j > 0 && this.isOpen(i, j - 1))
      this.uf.union(this.index(i, j), this.index(i, j - 1));

    if (j < this.grid[0].length - 1 && this.isOpen(i, j + 1))
      this.uf.union(this.index(i, j), this.index(i, j + 1));

    if (i == 0) this.uf.union(this.index(i, j), 0);

    if (i == this.grid.length - 1)
      this.uf.union(
        this.index(i, j),
        this.grid.length * this.grid[0].length + 1
      );
  }

  isOpen(i: number, j: number): boolean {
    if (!this.isValid(i, j)) throw new Error("Invalid coordinates");
    return this.grid[i][j];
  }

  isFull(i: number, j: number): boolean {
    if (!this.isValid(i, j)) throw new Error("Invalid coordinates");
    return this.isOpen(i, j) && this.uf.connected(this.index(i, j), 0);
  }

  percolates(): boolean {
    return this.uf.connected(0, this.grid.length * this.grid[0].length + 1);
  }

  printGrid(): void {
    for (let i = 0; i < this.grid.length; i++) {
      let line = "";
      for (let j = 0; j < this.grid[0].length; j++) {
        line += this.grid[i][j]
          ? "\u001b[34m[■]\u001b[0m"
          : "\u001b[30m[ ]\u001b[0m";
      }
      console.log(line);
    }
  }

  private isValid(i: number, j: number): boolean {
    return i >= 0 && i < this.grid.length && j >= 0 && j < this.grid[0].length;
  }

  private index(i: number, j: number): number {
    return i * this.grid[0].length + j + 1;
  }
}
