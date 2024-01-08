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
          className="rounded shadow object-cover h-96 w-full"
        />
      </Link>
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`product/${product.id}`}>
          <h2 className="text-lg">{product.name}</h2>
        </Link>
        <ProductRate rate={product.rating} count={product.reviews} />
        <p className="mb-2">$ {product.price}</p>
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
