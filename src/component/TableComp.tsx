import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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
