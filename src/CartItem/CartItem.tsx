import React from "react";
import { CartItemType } from "../App";
import { Wrapper } from "./CartItem.Styles";
import { Button } from "@mui/material";

type Props = {
  item: CartItemType;
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

const CartItem: React.FC<Props> = ({ item, addToCart, removeFromCart }) => {
  return (
    <Wrapper>
      <div>
        <h3>{item.title}</h3>
        <div className="info">
          <p>Price:${item.price}</p>
          <p>Total:${item.amount * item.price}</p>
        </div>
        <div className="btns">
          <Button
            size={"small"}
            variant="contained"
            onClick={() => removeFromCart(item.id)}
          >
            -
          </Button>
          <p>{item.amount}</p>
          <Button
            size={"small"}
            variant="contained"
            onClick={() => addToCart(item)}
          >
            +
          </Button>
        </div>
        
      </div>
      <img src={item.image} alt={item.title}/>
    </Wrapper>
  );
};

export default CartItem;
