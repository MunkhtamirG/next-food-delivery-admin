import { Button, Container } from "@mui/material";
import axios from "axios";
import React from "react";
import FoodTable from "../components/foodTable";

export default function food({ foods }: any) {
  return (
    <div style={{ height: "100vh" }}>
      <Button href="/category" variant="contained" color="success">
        Show Category Table
      </Button>
      <FoodTable foods={foods} />
    </div>
  );
}

food.getInitialProps = async (ctx: any) => {
  const res = await axios.get("http://18.141.207.7:3002/food");
  const json = await res.data.data;
  return { foods: json };
};
