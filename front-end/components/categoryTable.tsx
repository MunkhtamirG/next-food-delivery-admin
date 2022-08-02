import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Category } from "@mui/icons-material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 250,
  bgcolor: "background.paper",
  border: "2px solid #000000",
  boxShadow: 24,
  p: 4,
};

export default function BasicTable() {
  const [open, setOpen] = useState(false);
  const [render, setRender] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [categories, setCategories] = useState<
    | [
        {
          name: string;
          _id: number;
          color: string;
        }
      ]
    | null
  >();
  useEffect(() => {
    axios.get("http://localhost:3001/category").then((res) => {
      setCategories(res.data.data);
    });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Category</TableCell>
            <TableCell align="right">Index</TableCell>
            <TableCell align="right">Color</TableCell>
            <TableCell align="right">Edit</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories?.map((category) => (
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
                <Button variant="outlined">Edit</Button>
              </TableCell>
              <TableCell align="right">
                <Button variant="contained" color="error" onClick={handleOpen}>
                  Delete
                </Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style} color="red" textAlign="center">
                    <h3>Delete?</h3>
                    <div>
                      <Button onClick={handleClose} color="error">
                        Cancel
                      </Button>
                      <Button
                        color="success"
                        variant="contained"
                        onClick={() => {
                          axios.delete("http://localhost:3001/category", {
                            data: category,
                          });
                          handleClose();
                          setRender(true);
                        }}
                      >
                        Confirm
                      </Button>
                    </div>
                  </Box>
                </Modal>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
