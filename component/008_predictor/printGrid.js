// Function to log the grid in a clean format with row and column labels
export function printGrid(grid) {
  const columnLabels = '   ' + grid[0].map((_, index) => String.fromCharCode(65 + index)).join(' ');
  const gridString = grid.map((row, rowIndex) => {
    const rowLabel = rowIndex + 1 < 10 ? ` ${rowIndex + 1}` : `${rowIndex + 1}`;
    return `${rowLabel} ${row.join(' ')}`;
  }).join('\n');
  console.log(`${columnLabels}\n${gridString}`);
}
