import React from "react";
import type { Product } from "@/utils/data";
import Link from "next/link";
import Image from "next/Image";
import ProductRate from "./ProductRate";
import AddToCart from "./AddToCart";

export default function ProductItem({ product }: { product: Product }) {
  return (
    <div className="card">
      <Link href={`/product/${product.id}`}>
        <Image
          src={product.image}
          width={400}
          height={400}
          alt={product.name}
          className="shadow object-cover w-full bg-white p-8 md:p-2 rounded-md"
        />
      </Link>
      <div className="flex flex-col items-center justify-center pt-4 pb-8 md:pb-5">
        <Link href={`product/${product.id}`}>
          <h2 className="text-lg">{product.name}</h2>
        </Link>
        <ProductRate rate={product.rating} count={product.reviews} />
        <p className="mt-1 md:mt-2 mb-3 md:mb-2 font-bold">$ {product.price}</p>
        <AddToCart
          showQty={false}
          product={product}
          increasePerClick={true}
          redirect={false}
        />
      </div>
    </div>
  );
}
