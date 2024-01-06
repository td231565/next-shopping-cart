"use client";

import React, { useState } from "react";
import { addToCart, type CartItem } from "@/redux/slices/cartSlice";
import type { Product } from "@/utils/data";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

interface Param {
  product: Product;
  showQty: boolean;
  redirect: boolean;
  increasePerClick: boolean;
}

export default function AddToCart({
  product,
  showQty = true,
  redirect = false,
  increasePerClick = false,
}: Param) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { cartItems } = useAppSelector((state) => state.cart);
  const [qty, setQty] = useState(1);

  const addToCartHandler = () => {
    let newQty: number = qty;
    if (increasePerClick) {
      const existItem: CartItem | undefined = cartItems.find(
        (x) => x.id === product.id
      );
      if (existItem) {
        if (existItem.qty + 1 <= product.stock) {
          newQty = existItem.qty + 1;
        } else {
          return alert("No more product exist");
        }
      }
    }
    dispatch(addToCart({ ...product, qty: newQty }));

    if (redirect) {
      router.push("/cart");
    }
  };

  return (
    <>
      {product.stock > 0 && showQty && (
        <div className="mb-2 flex justify-between">
          <p>Qty</p>
          <div>
            <select
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
            >
              {[...Array(product.stock).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </select>
            <span>' '</span>
          </div>
        </div>
      )}
      <div>
        {product.stock > 0 ? (
          <button
            className="btn btn--primary w-full"
            onClick={addToCartHandler}
          >
            Add to cart
          </button>
        ) : (
          <button disabled>Out of stock</button>
        )}
      </div>
    </>
  );
}
