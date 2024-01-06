"use client";

import { useEffect } from "react";
import CartSidebar from "./CartSidebar";
import Header from "./Header";
import { hideLoading } from "@/redux/slices/cartSlice";
import { useAppDispatch } from "@/redux/hooks";

export default function App({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(hideLoading());
  }, [dispatch]);

  return (
    <div>
      <div className="mr-32">
        <Header />
        <main className="p-4">{children}</main>
      </div>
      <CartSidebar />
    </div>
  );
}
