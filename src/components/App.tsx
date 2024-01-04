"use client";

import CartSidebar from "./CartSidebar";
import Header from "./Header";

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="mr-32">
        <Header></Header>
        <main className="p-4">{children}</main>
      </div>
      <CartSidebar></CartSidebar>
    </div>
  );
}
