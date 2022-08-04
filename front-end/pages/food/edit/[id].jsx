import axios from "axios";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import { FormGroup } from "@mui/material";

const style = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
};

export default function id({ food }) {
  const [category, setCategory] = React.useState("");
  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  function submitHandler(e) {
    console.log(e.target);
  }
  return (
    <div style={style}>
      <Button href="/food" variant="contained" color="success">
        Back
      </Button>
      <h1>Edit Food</h1>
      <FormGroup
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
          defaultValue={food[0].discount}
          focused
        />
        <TextField
          label="Sales"
          variant="standard"
          color="success"
          defaultValue={food[0].sales}
          focused
        />
        <TextField
          label="Name"
          variant="standard"
          color="success"
          defaultValue={food[0].name}
          focused
        />
        <TextField
          label="Price"
          variant="standard"
          color="success"
          defaultValue={food[0].price}
          focused
        />
        <TextField
          label="Portion"
          variant="standard"
          color="success"
          defaultValue={food[0].portion}
          focused
        />
        <TextField
          label="Stock"
          variant="standard"
          color="success"
          defaultValue={food[0].stock}
          focused
        />
        <TextField
          label="Image"
          variant="standard"
          color="success"
          defaultValue={food[0].image}
          focused
        />
        <TextField
          label="Tumbnail image"
          variant="standard"
          color="success"
          defaultValue={food[0].tumb_img}
          focused
        />
        <TextField
          label="Ingredients"
          variant="standard"
          color="success"
          defaultValue={food[0].ingredients}
          focused
        />
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Age"
          value={category}
          onChange={handleChange}
        >
          <MenuItem value={1}>Үндсэн хоол</MenuItem>
          <MenuItem value={2}>Салад ба зууш</MenuItem>
          <MenuItem value={3}>Амттан</MenuItem>
          <MenuItem value={4}>Хямдралтай</MenuItem>
        </Select>
        <Button variant="contained" color="success" type="submit">
          Хадгалах
        </Button>
      </FormGroup>
    </div>
  );
}

export async function getStaticPaths() {
  const res = await axios.get(`http://18.141.207.7:3002/food`);
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
  const res = await axios.get(`http://18.141.207.7:3002/food/${params.id}`);
  console.log(res.data.data);
  return {
    props: {
      food: res.data.data,
    },
  };
}
