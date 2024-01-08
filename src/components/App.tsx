"use client";

import { useEffect } from "react";
import CartSidebar from "./CartSidebar";
import Header from "./Header";
import { hideLoading } from "@/redux/slices/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { usePathname } from "next/navigation";

export default function App({ children }: { children: React.ReactNode }) {
  const { loading, cartItems } = useAppSelector((state) => state.cart);
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(hideLoading());
  }, [dispatch]);

  return (
    <div>
      <div
        className={`${
          loading
            ? ""
            : cartItems.length > 0 &&
              (pathname === "/" || pathname.indexOf("/product/") >= 0)
            ? "mr-32"
            : ""
        }`}
      >
        <Header />
        <main className="p-4">{children}</main>
      </div>
      <CartSidebar />
    </div>
  );
}
