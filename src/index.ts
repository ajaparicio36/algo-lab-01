import { PercolationStats } from "./PercolationStats";
import { Percolation } from "./Percolation";
import * as readlineSync from "readline-sync";

// Monte Carlo simulation and statistics for percolation
let gridSize = Number(readlineSync.question("Enter grid size: "));
let trials = Number(readlineSync.question("Enter number of trials: "));
let ps = new PercolationStats(gridSize, trials);

console.log(`\nStatistics for grid size ${gridSize}`);
console.log(`\nMean: ${ps.getMean()}`);
console.log(`Standard Deviation: ${ps.getStdDev()}`);
console.log(`Lower bound of 95% confidence interval: ${ps.confidenceLo()}`);
console.log(`Upper bound of 95% confidence interval: ${ps.confidenceHi()}`);

// visualize grid percolation
let probability = Number(readlineSync.question("Enter probability: "));
let p = new Percolation(gridSize);

for (let i = 0; i < gridSize; i++) {
  for (let j = 0; j < gridSize; j++) {
    p.openWithProbability(i, j, probability);
  }
}

p.printGrid();
console.log("Does the grid percolate? ", p.percolates());
