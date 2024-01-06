import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

export default function Header() {
  const { loading, cartItems } = useSelector((state: RootState) => state.cart);

  return (
    <header>
      <nav className="flex justify-between items-center h-12 px-4 shadow-md bg-gray-800 text-white">
        <Link href="/" className="text-lg font-bold">
          Shopping Cart
        </Link>
        <div>
          <span className="cart-badge">0</span>
          <Link href="/cart">Cart</Link>
        </div>
      </nav>
    </header>
  );
}
