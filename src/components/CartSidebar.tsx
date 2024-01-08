import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import Link from "next/link";
import Image from "next/Image";
import { addToCart, removeFromCart } from "@/redux/slices/cartSlice";
import type { CartItem } from "@/redux/slices/cartSlice";
import { usePathname } from "next/navigation";

export default function CartSidebar() {
  const { loading, cartItems, itemsPrice } = useAppSelector(
    (state) => state.cart
  );
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const addToCartHandler = (product: CartItem, qty: number) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id: number) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div
      className={`${
        loading
          ? ""
          : cartItems.length > 0 &&
            (pathname === "/" || pathname.indexOf("/product/") >= 0)
          ? "fixed top-0 right-0 w-32 h-full shadow-lg border-1 border-l-gray-700 overflow-scroll"
          : "hidden"
      }`}
    >
      {loading ? (
        <div className="py-5 px-2">Loading...</div>
      ) : cartItems.length === 0 ? (
        <div className="py-5 px-2">Cart is empty</div>
      ) : (
        <>
          <div className="p-2 flex flex-col items-center border-b border-b-gray-600">
            <p>subtotal</p>
            <p className="font-bold text-orange-700">$ {itemsPrice}</p>
            <div className="my-2">
              <Link
                href="/cart"
                className="w-full text-center p-1 rounded-2xl border-2"
              >
                Go to cart
              </Link>
            </div>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="p-2 flex flex-col items-center border-b border-b-gray-600"
              >
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
                </Link>
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
                <button
                  className="btn mt-2"
                  onClick={() => removeFromCartHandler(item.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
