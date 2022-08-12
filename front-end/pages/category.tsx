import { Container } from "@mui/material";
import axios from "axios";
import React from "react";
import CategoryTable from "../components/categoryTable";

export default function category({ categories }: any) {
  return (
    <>
      <Container>
        <CategoryTable categories={categories} />
      </Container>
    </>
  );
}

category.getInitialProps = async (ctx: any) => {
  const res = await axios.get("http://18.141.207.7:3002/category");
  const json = await res.data.data;
  return { categories: json };
};
