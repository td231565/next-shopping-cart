"use client";

import CheckoutWizard from "@/components/CheckoutWizard";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import Image from "next/Image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PlaceOrderScreen() {
  const {
    cartItems,
    itemsPrice,
    shippingPrice,
    totalPrice,
    taxPrice,
    shippingAddress,
    paymentMethod,
    loading,
  } = useAppSelector((state) => state.cart);
  const router = useRouter();

  useEffect(() => {
    if (!paymentMethod) {
      router.push("/payment");
    }
  }, [paymentMethod, router]);

  return (
    <div>
      <CheckoutWizard activeStep={3} />
      <h1 className="mb-4 text-xl">Place Order</h1>
      {loading ? (
        <div>Loading...</div>
      ) : cartItems.length === 0 ? (
        <div>
          Cart is empty. <Link href="/">Go shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <div className="card p-5">
              <h2 className="mb-2 text-lg">Shipping Address</h2>
              <div>
                {shippingAddress.fullName}, {shippingAddress.address},{" "}
                {shippingAddress.city}, {shippingAddress.postalCode},{" "}
                {shippingAddress.country}
              </div>
              <div>
                <Link href="/shipping" className="btn inline-block">
                  Edit
                </Link>
              </div>
            </div>
            <div className="card p-5">
              <h2 className="mb-2 text-lg">Payment Method</h2>
              <p>{paymentMethod}</p>
              <div>
                <Link href="/payment" className="btn inline-block">
                  Edit
                </Link>
              </div>
            </div>
            <div className="card overflow-x-auto p-5">
              <h2 className="mb-2 text-lg">Order Items</h2>
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <td className="px-5 text-left">Item</td>
                    <td className="px-5 text-right">Quantity</td>
                    <td className="px-5 text-right">Price</td>
                    <td className="px-5 text-right">Subtotal</td>
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
                            style={{
                              maxWidth: "100%",
                              height: "auto",
                            }}
                            className="p-1"
                          ></Image>
                          <span>{item.name}</span>
                        </Link>
                      </td>
                      <td className="p-5 text-right">{item.qty}</td>
                      <td className="p-5 text-right">$ {item.price}</td>
                      <td className="p-5 text-right">
                        $ {item.qty * item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div>
                <Link href="/cart" className="btn inline-block">
                  Edit
                </Link>
              </div>
            </div>
            <div className="card p-5">
              <h2 className="mb-2 text-lg">Order Summary</h2>
              <ul>
                <li>
                  <div className="mb-2 flex justify-between">
                    <p>Items</p>
                    <p>$ {itemsPrice}</p>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <p>Tax</p>
                    <p>$ {taxPrice}</p>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <p>Shipping</p>
                    <p>$ {shippingPrice}</p>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <p>Total</p>
                    <p>$ {totalPrice}</p>
                  </div>
                </li>
                <li>
                  <button
                    className="btn btn--primary w-full"
                    onClick={() => alert("Not implemented")}
                  >
                    Place Order
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
