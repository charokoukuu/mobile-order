import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// function createData(
//   name: string,
//   calories: number,
//   fat: number,
//   carbs: number,
//   protein: number
// ) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];
interface RowsProps {
  title: string[];
  count: number[];
}

const TableComp = (rows: RowsProps) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: "100%" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ fontSize: "1.5rem" }} align="left">
              Order Menu
            </TableCell>
            <TableCell style={{ fontSize: "1.5rem" }} align="right">
              個数
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {rows.title.map((title: string, i: number) => (
            <TableRow
              key={i}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">
                {title}
              </TableCell>
              <TableCell align="center">{rows.count[i]}</TableCell>
            </TableRow>
          ))} */}
          {rows.title.map((title: string, i: number) => (
            <TableRow key={i}>
              <TableCell style={{ fontSize: "1.5rem" }} align="left">
                {title}
              </TableCell>
              <TableCell style={{ fontSize: "1.5rem" }} align="right">
                {rows.count[i]}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComp;
