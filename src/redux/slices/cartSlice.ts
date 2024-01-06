import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import Cookies from "js-cookie";
import type { Product } from "@/utils/data";
import { addDecimals } from "@/utils/calculate";

export interface CartItem extends Product {
  qty: number;
}
export interface CartState {
  loading: boolean;
  cartItems: CartItem[];
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
}

const initialState: CartState = {
  loading: true,
  cartItems: [],
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
};

type CartPriceName = "itemsPrice" | "shippingPrice" | "taxPrice";

const cartPrice: CartPriceName[] = ["itemsPrice", "shippingPrice", "taxPrice"];

const calcFee = (state: CartState) => {
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, curr) => acc + curr.price * curr.qty, 0)
  );
  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 100);
  state.taxPrice = addDecimals(state.itemsPrice * 0.15);
  const feeSum: number = cartPrice.reduce(
    (acc, keyName: CartPriceName) => acc + state[keyName],
    0
  );
  state.totalPrice = addDecimals(feeSum);
};

const cartSlice = createSlice({
  name: "cart",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item: CartItem = action.payload;
      const existItem: CartItem | undefined = state.cartItems.find(
        (x) => x.id === item.id
      );
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x.id === existItem.id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      calcFee(state);
      Cookies.set("cart", JSON.stringify(state));
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter((x) => x.id !== action.payload);
      calcFee(state);
      Cookies.set("cart", JSON.stringify(state));
    },
    hideLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { addToCart, removeFromCart, hideLoading } = cartSlice.actions;

export const getCartLoading = (state: RootState) => state.cart.loading;

export default cartSlice.reducer;
