import axios from "axios";
import React from "react";

export default function id({ food }) {
  return <div>Hello</div>;
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
  return {
    props: {
      category: res.data.data,
    },
  };
}
