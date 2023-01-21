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
            <TableCell className="text-2xl" align="left">
              Order Menu
            </TableCell>
            <TableCell className="text-2xl" align="right">
              個数
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.title.map((title: string, i: number) => (
            <TableRow key={i}>
              <TableCell className="text-2xl" align="left">
                {title}
              </TableCell>
              <TableCell className="text-2xl" align="right">
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
