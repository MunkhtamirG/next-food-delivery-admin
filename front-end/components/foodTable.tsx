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
import category from "../pages/category";

const header: {} = {
  color: "white",
};

export default function BasicTable({ foods, categories }: any) {
  const router = useRouter();
  return (
    <TableContainer style={header}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>discount</TableCell>
            <TableCell align="right">sales</TableCell>
            <TableCell align="right">ID</TableCell>
            <TableCell align="right">name</TableCell>
            <TableCell align="right">price</TableCell>
            <TableCell align="right">portion</TableCell>
            <TableCell align="right">stock</TableCell>
            <TableCell align="right">image</TableCell>
            <TableCell align="right">tumb_img</TableCell>
            <TableCell align="right">ingredients</TableCell>
            <TableCell align="right">category</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {foods?.map(
            (food: {
              discount: number;
              sales: number;
              food_id: number;
              name: string;
              price: number;
              portion: number;
              stock: number;
              image: string;
              tumb_img: string;
              ingredients: string;
              category_id: number;
            }) => (
              <TableRow
                key={food.food_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {food.discount}
                </TableCell>
                <TableCell align="right">{food.sales}</TableCell>
                <TableCell align="right">{food.food_id}</TableCell>
                <TableCell align="right">{food.name}</TableCell>
                <TableCell align="right">{food.price}</TableCell>
                <TableCell align="right">{food.portion}</TableCell>
                <TableCell align="right">{food.stock}</TableCell>
                <TableCell align="right">{food.image}</TableCell>
                <TableCell align="right">{food.tumb_img}</TableCell>
                <TableCell align="right">{food.ingredients}</TableCell>
                <TableCell align="right">
                  {categories.map(
                    (category: {
                      _id: number;
                      name: string;
                      color: string;
                    }) => {
                      if (category._id == food.category_id) {
                        return category.name;
                      }
                    }
                  )}
                </TableCell>
                <TableCell align="right">
                  <Button
                    href={`http://localhost:3000/food/edit/${food.food_id}`}
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
                      axios.delete("http://18.141.207.7:3002/food", {
                        data: food,
                      });
                      router.push("/food");
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
