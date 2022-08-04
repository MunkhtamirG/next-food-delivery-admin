import axios from "axios";
import React from "react";
import { Button } from "@mui/material";

export default function id({ category }) {
  return (
    <div>
      <Button href="/category" variant="contained" color="success">
        Back
      </Button>
      <h1>{category.name}</h1>
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
