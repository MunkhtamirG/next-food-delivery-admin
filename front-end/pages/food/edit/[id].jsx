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

const style = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
};

export default function id({ food, categories }) {
  const [open, setOpen] = React.useState(false);
  let router = useRouter();
  async function submitHandler(e) {
    e.preventDefault();
    await axios.put("http://13.250.98.180:3002/food", {
      discount: +e.target.discount.value,
      sales: +e.target.sales.value,
      food_id: +e.target.id.value,
      name: e.target.name.value,
      price: +e.target.price.value,
      portion: +e.target.portion.value,
      stock: +e.target.stock.value,
      image: e.target.image.value,
      tumb_img: e.target.tumb_img.value,
      ingredients: e.target.ingredients.value,
      category_id: +e.target.category.value,
    });
    await setOpen(true);
    await router.push("/food");
  }
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <div style={style}>
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
      <Button href="/food" variant="contained" color="success">
        Back
      </Button>
      <h1>Edit Food</h1>
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
          defaultValue={food[0].discount}
          focused
        />
        <TextField
          label="Sales"
          variant="standard"
          color="success"
          name="sales"
          defaultValue={food[0].sales}
          focused
        />
        <TextField
          label="ID"
          variant="standard"
          color="success"
          name="id"
          defaultValue={food[0].food_id}
          InputProps={{ readOnly: true }}
          focused
        />
        <TextField
          label="Name"
          variant="standard"
          color="success"
          name="name"
          defaultValue={food[0].name}
          focused
        />
        <TextField
          label="Price"
          variant="standard"
          color="success"
          name="price"
          defaultValue={food[0].price}
          focused
        />
        <TextField
          label="Portion"
          variant="standard"
          color="success"
          name="portion"
          defaultValue={food[0].portion}
          focused
        />
        <TextField
          label="Stock"
          variant="standard"
          color="success"
          name="stock"
          defaultValue={food[0].stock}
          focused
        />
        <TextField
          label="Image"
          variant="standard"
          color="success"
          name="image"
          defaultValue={food[0].image}
          focused
        />
        <TextField
          label="Tumbnail image"
          variant="standard"
          color="success"
          name="tumb_img"
          defaultValue={food[0].tumb_img}
          focused
        />
        <TextField
          label="Ingredients"
          variant="standard"
          color="success"
          name="ingredients"
          defaultValue={food[0].ingredients}
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

export async function getStaticPaths() {
  const res = await axios.get(`http://13.250.98.180:3002/food`);
  return {
    fallback: false,
    paths: res.data.data.map((food) => ({
      params: {
        id: food.food_id.toString(),
      },
    })),
  };
}

export async function getStaticProps({ params }) {
  const res = await axios.get(`http://13.250.98.180:3002/food/${params.id}`);
  const categories = await axios.get(`http://13.250.98.180:3002/category`);
  return {
    props: {
      food: res.data.data,
      categories: categories.data.data,
    },
  };
}
