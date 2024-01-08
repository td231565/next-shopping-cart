import Link from "next/link";
import React from "react";
import { useAppSelector } from "@/redux/hooks";
import { usePathname } from "next/navigation";

export default function Header() {
  const { loading, cartItems } = useAppSelector((state) => state.cart);
  const pathname = usePathname();

  return (
    <header>
      <nav className="flex justify-between items-center h-12 px-4 shadow-md bg-gray-800 text-white">
        <Link href="/" className="text-lg font-bold">
          Shopping Cart
        </Link>
        <div>
          <span className="cart-badge">
            {loading ? "" : cartItems.reduce((acc, curr) => acc + curr.qty, 0)}
          </span>
          <Link href="/cart">Cart</Link>
          {!loading && cartItems.length > 0 && pathname !== "/cart" && (
            <div className="caret"></div>
          )}
        </div>
      </nav>
    </header>
  );
}
