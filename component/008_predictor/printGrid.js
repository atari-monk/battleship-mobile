// Function to log the grid in a clean format
export function printGrid(grid) {
  grid.forEach((row) => {
    console.log(row.join(' '))
  })
}
