import React from "react";
import { Wrapper } from "./Cart.style";
import { CartItemType } from "../App";
import CartItem from "../CartItem/CartItem";

type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
  const calculateTotalPrice = (items: CartItemType[]) => {
    return items.reduce(
      (acc: number, item: CartItemType) => acc + item.amount * item.price,
      0
    );
  };

  return (
    <Wrapper>
      <h2>Your SHopping Cart</h2>
      {cartItems.length === 0 ? <p>No Items IN Cart</p> : null}
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}

        <h2 className="totla">
          Total: ${calculateTotalPrice(cartItems)}
        </h2>

    </Wrapper>
  );
};

export default Cart;
