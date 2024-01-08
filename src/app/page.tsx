import Image from "next/Image";
import { data } from "@/utils/data";
import type { Product } from "@/utils/data";
import ProductItem from "@/components/ProductItem";

export default function Home() {
  const { products } = data;
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
      {products.map((p: Product) => (
        <ProductItem key={p.id} product={p}></ProductItem>
      ))}
    </div>
  );
}
