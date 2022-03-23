import React from "react";
import { Wrapper } from "./Item.styles";
import { CartItemType } from "../App";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

type Props = {
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void;
};

const Item: React.FC<Props> = ({ item, handleAddToCart }) => {
  return (
    <Wrapper>
      <img src={item.image} alt={item.title} />
      <div>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <h3>{item.price}</h3>
      </div>
      <Button onClick={() => handleAddToCart(item)}>Add To Cart</Button>
      <Button>
        <Link to={`products/${item.id}`}>View More</Link>
      </Button>
    </Wrapper>
  );
};

export default Item;
