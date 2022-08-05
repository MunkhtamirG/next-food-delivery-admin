import axios from "axios";
import * as React from "react";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Button,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import { useRouter } from "next/router";

export default function add({ categories }) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  function submitHandler(e) {
    e.preventDefault();
    axios.post("http://18.141.207.7:3002/food", {
      discount: +e.target.discount.value,
      sales: +e.target.sales.value,
      name: e.target.name.value,
      price: +e.target.price.value,
      portion: +e.target.portion.value,
      stock: +e.target.stock.value,
      image: e.target.image.value,
      tumb_img: e.target.tumb_img.value,
      ingredients: e.target.ingredients.value,
      category_id: e.target.category.value,
    });
    router.push("/food");
    setOpen(true);
  }
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Button href="/food" variant="contained" color="success">
        Back
      </Button>
      <h1>Add Food</h1>
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Амжилттай хадгалагдлаа!
          </Alert>
        </Snackbar>
      </Stack>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          "& .MuiTextField-root": { width: "50ch" },
        }}
        spacing={2}
        noValidate
        autoComplete="off"
        onSubmit={submitHandler}
      >
        <TextField
          label="Discount"
          variant="standard"
          color="success"
          name="discount"
          focused
          type="number"
        />
        <TextField
          label="Sales"
          variant="standard"
          color="success"
          name="sales"
          focused
          type="number"
        />

        <TextField
          label="Name"
          variant="standard"
          color="success"
          name="name"
          focused
        />
        <TextField
          label="Price"
          variant="standard"
          color="success"
          name="price"
          focused
          type="number"
        />
        <TextField
          label="Portion"
          variant="standard"
          color="success"
          name="portion"
          focused
          type="number"
        />
        <TextField
          label="Stock"
          variant="standard"
          color="success"
          name="stock"
          focused
          type="number"
        />
        <TextField
          label="Image"
          variant="standard"
          color="success"
          name="image"
          focused
        />
        <TextField
          label="Tumbnail image"
          variant="standard"
          color="success"
          name="tumb_img"
          focused
        />
        <TextField
          label="Ingredients"
          variant="standard"
          color="success"
          name="ingredients"
          focused
        />
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Age"
          name="category"
          defaultValue={categories[0]._id}
        >
          {categories.map((category) => {
            return (
              <MenuItem value={category._id} key={category._id}>
                {category.name}
              </MenuItem>
            );
          })}
        </Select>
        <Button variant="contained" color="success" type="submit">
          Хадгалах
        </Button>
      </Box>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const categories = await axios.get(`http://18.141.207.7:3002/category`);
  return {
    props: {
      categories: categories.data.data,
    },
  };
}
