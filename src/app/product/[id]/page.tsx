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
      <div>
        <Link href="/" className="btn">
          Back to products
        </Link>
      </div>
      <div className="mt-4 grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2 mb-4">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            sizes="100vw"
            className="w-full h-auto bg-white p-4 rounded-md"
          ></Image>
        </div>
        <div className="mb-5">
          <ul>
            <li>
              <h1 className="text-lg">{product.name}</h1>
            </li>
            <li>
              <ProductRate
                rate={product.rating}
                count={product.reviews}
                align="left"
              />
            </li>
            <hr className="my-4" />
            <li>
              <p>{product.description}</p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur, deleniti?
              </p>
            </li>
          </ul>
        </div>
        <div>
          <div className="card p-5">
            <div className="mb-4 md:mb-2 flex justify-between">
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
