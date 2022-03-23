import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Item from "./Item/Item";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Wrapper, StyleButton } from "./App.styles";
import { Grid, Badge } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import Cart from "./Cart/Cart";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import CartDetails from "./CartDetails/CartDetails";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
//Types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const getProds = async (): Promise<CartItemType[]> => {
  return await (await fetch("https://fakestoreapi.com/products")).json();
};


function App() {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const [cartItem, setCartItem] = useState({} as CartItemType);

  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProds
  );

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((acc: number, item: CartItemType) => acc + item.amount, 0);

  const handleAddToCart = (item: CartItemType) => {
    setCartItems((prev) => {
      const isItemInCart = prev.find((i) => i.id === item.id);

      if (isItemInCart) {
        return prev.map((i) => {
          return i.id === item.id ? { ...i, amount: i.amount + 1 } : i;
        });
      }
      //First time Item ADded'
      return [...prev, { ...item, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number): void => {
    setCartItems((prev) => {
      return prev.reduce((acc, prod) => {
        if (prod.id === id) {
          if (prod.amount === 1) return acc;
          return [...acc, { ...prod, amount: prod.amount - 1 }];
        } else {
          return [...acc, prod];
        }
      }, [] as CartItemType[]);
    });
  };
  const params = useParams();
  const navigate = useNavigate();


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
      <Drawer
        anchor="left"
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      >
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>

      <StyleButton onClick={() => setIsCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color="secondary">
          <AddShoppingCartIcon />
        </Badge>
      </StyleButton>
      <Routes>
        <Route
          path="/"
          element={
            <Grid container spacing={2}>
              {data?.map((prod) => (
                <Grid item key={prod.id} xs={12} sm={4}>
                  <Item item={prod} handleAddToCart={handleAddToCart} />
                </Grid>
              ))}
            </Grid>
          }
        />
        <Route path="/products/:id" element={<CartDetails/>} />
        <Route
          path="*"
          element={
            <Grid container spacing={2}>
              {data?.map((prod) => (
                <Grid item key={prod.id} xs={12} sm={4}>
                  <Item item={prod} handleAddToCart={handleAddToCart} />
                </Grid>
              ))}
            </Grid>
          }
        />
      </Routes>
    </Wrapper>
  );
}

export default App;
