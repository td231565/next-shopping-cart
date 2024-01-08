import { data } from "@/utils/data";
import Link from "next/link";
import Image from "next/Image";
import ProductRate from "@/components/ProductRate";
import AddToCart from "@/components/AddToCart";

interface Param {
  params: { id: number };
}

export default function ProductDetailPage({ params: { id } }: Param) {
  const product = data.products.find((x) => x.id === Number(id));

  if (!product) {
    return <div>Product Not Found</div>;
  }

  return (
    <div>
      <div className="py-2">
        <Link href="/">Back to products</Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          ></Image>
        </div>
        <div>
          <ul>
            <li>
              <h1 className="text-lg">{product.name}</h1>
            </li>
            <li>
              <ProductRate rate={product.rating} count={product.reviews} />
            </li>
            <li>
              <hr className="my-3" />
              <span>Description:</span>
              <p>{product.description}</p>
            </li>
          </ul>
        </div>
        <div>
          <div className="card p-5">
            <div className="mb-2 flex justify-between">
              <p>Price</p>
              <p>$ {product.price}</p>
            </div>
            <AddToCart product={product} redirect={true} />
          </div>
        </div>
      </div>
    </div>
  );
}
