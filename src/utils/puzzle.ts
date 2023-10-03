const generateItem = () => ({
  value: 1 + Math.floor(Math.random() * 9),
  status: 'none',
  used: Math.random() > 0.65 ? true : false,
  error: false,
});

const generateRow = () =>
  Array(8)
    .fill(1)
    .map((_) => generateItem());

export const generateGrid = () => {
  let puz = [];
  for (let i = 0; i < 8; i++) {
    const row = generateRow();
    // const sum = row.reduce((acc, cur) => (cur.used ? acc + cur.value : acc), 0);
    // row.push({ value: sum, status: 'none', used: false });
    puz.push(row);
  }

  // let lastRow = [];

  // for (let i = 0; i < puz.length; i++) {
  //   let sum = 0;
  //   for (let j = 0; j < puz.length; j++) {
  //     if (puz[j][i].used) {
  //       sum += puz[j][i].value;
  //     }
  //   }
  //   lastRow.push({ value: sum, status: 'none', used: false });
  // }
  // puz.push(lastRow);

  return puz;
}