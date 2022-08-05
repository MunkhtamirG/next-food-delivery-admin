import { Button, Container } from "@mui/material";
import axios from "axios";
import React from "react";
import FoodTable from "../components/foodTable";

export default function food({ foods, categories }: any) {
  return (
    <div style={{ height: "100vh" }}>
      <Button href="/category" variant="contained" color="success">
        Show Category Table
      </Button>
      <FoodTable foods={foods} categories={categories} />
    </div>
  );
}

food.getInitialProps = async (ctx: any) => {
  const resFood = await axios.get("http://18.141.207.7:3002/food");
  const foods = await resFood.data.data;
  const resCategory = await axios.get("http://18.141.207.7:3002/category");
  const categories = await resCategory.data.data;
  return { foods: foods, categories: categories };
};
