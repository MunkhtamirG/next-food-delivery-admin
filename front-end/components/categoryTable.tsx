import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/router";

export default function BasicTable({ categories }: any) {
  const router = useRouter();
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Category</TableCell>
            <TableCell align="right">Index</TableCell>
            <TableCell align="right">Color</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories?.map(
            (category: { _id: number; name: string; color: string }) => (
              <TableRow
                key={category._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {category.name}
                </TableCell>
                <TableCell align="right">{category._id}</TableCell>
                <TableCell align="right">{category.color}</TableCell>
                <TableCell align="right">
                  <Button
                    href={`http://localhost:3000/category/edit/${category._id}`}
                    variant="outlined"
                  >
                    {<EditIcon />}
                  </Button>
                </TableCell>
                <TableCell align="left">
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      axios.delete("http://18.141.207.7:3002/category", {
                        data: category,
                      });
                      router.push("/category");
                    }}
                  >
                    {<DeleteIcon />}
                  </Button>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
