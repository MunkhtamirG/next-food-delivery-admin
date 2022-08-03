import { Container } from "@mui/material";
import axios from "axios";
import React from "react";
import FoodTable from "../components/foodTable";

export default function food({ foods }: any) {
  return (
    <Container>
      <FoodTable foods={foods} />
    </Container>
  );
}

food.getInitialProps = async (ctx: any) => {
  const res = await axios.get("http://18.141.207.7:3002/food");
  const json = await res.data.data;
  return { foods: json };
};
