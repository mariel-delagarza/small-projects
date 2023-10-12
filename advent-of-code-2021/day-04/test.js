const makeGrid = (rows, columns) => {
  const grid = [];

  for (let i = 0; i < rows; i++) {
    grid.push(Array(columns).fill(""));
  }

  console.log(grid);
};

makeGrid(5, 3);
makeGrid(6, 12);
