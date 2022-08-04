import axios from "axios";
import React from "react";
import {
  Button,
  FormGroup,
  TextField,
  InputLabel,
  Select,
} from "@mui/material";

export default function id({ category }) {
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
      <Button href="/category" variant="contained" color="success">
        Back
      </Button>
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
      >
        <TextField
          label="Name"
          variant="standard"
          color="success"
          defaultValue={category[0].name}
          focused
        />
        <TextField
          label="ID"
          variant="standard"
          color="success"
          defaultValue={category[0]._id}
          focused
        />
        <TextField
          label="Color"
          variant="standard"
          color="success"
          defaultValue={category[0].color}
          focused
        />
        <Button variant="contained" color="success" type="submit">
          Хадгалах
        </Button>
      </FormGroup>
    </div>
  );
}

export async function getStaticPaths() {
  const res = await axios.get(`http://18.141.207.7:3002/category`);
  return {
    fallback: false,
    paths: res.data.data.map((category) => ({
      params: {
        id: category._id.toString(),
      },
    })),
  };
}

export async function getStaticProps({ params }) {
  const res = await axios.get(`http://18.141.207.7:3002/category/${params.id}`);
  return {
    props: {
      category: res.data.data,
    },
  };
}
