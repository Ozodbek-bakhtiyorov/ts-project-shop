import React from "react";
import { CartItemType } from "../App";
import { Wrapper } from "./CartDetails.styles";
import { useQuery } from "react-query";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

const getItem = async (id:string): Promise<CartItemType> => {
  return await (await fetch(`https://fakestoreapi.com/products/${id}`)).json();
};


const CartDetails: React.FC = () => {
  const {id}= useParams() as {id:string};
  console.log(id)

  const [item, setItem] = useState<CartItemType>({} as CartItemType);

  const { data, isLoading, error } = useQuery(`product`, getItem(id));

  useEffect(() => {
    if (data) {
      setItem(data);
    }
  } , [data]);

  if (isLoading) {
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );
  }
  if (error) {
    return <h1>Something Went Wrong...</h1>;
  }

  return (
    <Wrapper>
      <div>
        <h3>{item.title}</h3>
        <div className="info">
          <p>Price:${item.price}</p>
          <p>Total:${item.amount * item.price}</p>
        </div>
        <img src={item.image} alt="item" />
      </div>
    </Wrapper>
  );
};
export default CartDetails;
