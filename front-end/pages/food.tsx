import { Button, Container } from "@mui/material";
import axios from "axios";
import React from "react";
import FoodTable from "../components/FoodTable";

export default function food({ foods, categories }: any) {
  return (
    <div>
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
