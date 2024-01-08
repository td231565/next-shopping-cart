"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToCart, removeFromCart } from "@/redux/slices/cartSlice";
import { useRouter } from "next/navigation";
import type { Product } from "@/utils/data";
import Link from "next/link";
import Image from "next/Image";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading, cartItems, itemsPrice } = useAppSelector(
    (state) => state.cart
  );

  const removeFromCartHandler = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const addToCartHandler = (product: Product, qty: number) => {
    dispatch(addToCart({ ...product, qty }));
  };

  return (
    <div>
      <h1 className="mb-4 text-xl">Shopping Cart</h1>
      {loading ? (
        <p>Loading...</p>
      ) : cartItems.length === 0 ? (
        <div>
          Cart is empty. <Link href="/">Go shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th className="p-5 text-left">Product</th>
                  <th className="p-5 text-right">Quantity</th>
                  <th className="p-5 text-right">Price</th>
                  <th className="p-5">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td>
                      <Link
                        href={`/product/${item.id}`}
                        className="flex items-center"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={50}
                          height={50}
                          className="p-1"
                        ></Image>
                        <span>{item.name}</span>
                      </Link>
                    </td>
                    <td className="p-5 text-right">
                      <select
                        value={item.qty}
                        onChange={(e) =>
                          addToCartHandler(item, Number(e.target.value))
                        }
                      >
                        {[...Array(item.stock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-5 text-right">$ {item.price}</td>
                    <td className="p-5 text-center">
                      <button
                        className="btn"
                        onClick={() => removeFromCartHandler(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <div className="card p-5">
              <ul>
                <li>
                  <p className="pb-3 text-xl">
                    Subtotal (
                    {cartItems.reduce((acc, curr) => acc + curr.qty, 0)}) : ${" "}
                    {itemsPrice}
                  </p>
                </li>
                <li>
                  <button
                    onClick={() => router.push("/shipping")}
                    className="btn btn--primary w-full"
                  >
                    Proceed to checkout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
