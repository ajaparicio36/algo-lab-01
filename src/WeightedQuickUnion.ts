export class WeightedQuickUnionUF {
  public id: number[];
  public sz: number[];

  constructor(n: number) {
    this.id = Array(n)
      .fill(0)
      .map((_, i) => i);
    this.sz = Array(n).fill(1);
  }

  root(i: number): number {
    while (i !== this.id[i]) {
      i = this.id[i];
    }
    return i;
  }

  connected(p: number, q: number): boolean {
    return this.root(p) === this.root(q);
  }

  union(p: number, q: number): void {
    const i = this.root(p);
    const j = this.root(q);
    if (i === j) return;
    if (this.sz[i] < this.sz[j]) {
      this.id[i] = j;
      this.sz[j] += this.sz[i];
    } else {
      this.id[j] = i;
      this.sz[i] += this.sz[j];
    }
  }
}
