import { data } from "@/utils/data";
import ProductItem from "@/components/ProductItem";

export default function Home() {
  const { products } = data;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-0 md:gap-4">
      {products.map((p) => (
        <ProductItem key={p.id} product={p}></ProductItem>
      ))}
    </div>
  );
}
