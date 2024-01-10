import Link from "next/link";
import Image from "next/Image";
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
          Pokemon Souvenir
        </Link>
        <div>
          <Link href="/cart" className="relative">
            <span className="cart-badge absolute top-1 right-10">
              {loading
                ? ""
                : cartItems.reduce((acc, curr) => acc + curr.qty, 0)}
            </span>
            <Image
              src="/images/cart.svg"
              alt="cart"
              width={40}
              height={40}
            ></Image>
          </Link>
          {/* {!loading && cartItems.length > 0 && pathname !== "/cart" && (
            <div className="caret"></div>
          )} */}
        </div>
      </nav>
    </header>
  );
}
