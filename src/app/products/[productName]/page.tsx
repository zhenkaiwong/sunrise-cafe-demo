import Suggestions from "@/ui/Suggestion";
import Image from "next/image";
import { notFound } from "next/navigation";

type Props = {
  params: { productName: string };
};

type Product = {
  imageUrl: string;
  mobileImageUrl: string;
  name: string;
  price: number;
  description: string;
};

const products: Product[] = [
  {
    imageUrl: "/products/latte-product.jpg",
    mobileImageUrl: "/products/latte-thumbnail.jpg",
    name: "Caffè Latte",
    price: 12.5,
    description:
      "Smooth and creamy espresso with steamed milk, offering a comforting and balanced flavor.",
  },
  {
    imageUrl: "/products/americano-product.jpg",
    mobileImageUrl: "/products/americano-thumbnail.jpg",
    name: "Americano",
    price: 10.0,
    description:
      "A rich, bold espresso diluted with hot water, creating a smooth yet strong coffee experience.",
  },
  {
    imageUrl: "/products/hot-chocolate-product.jpg",
    mobileImageUrl: "/products/chocolate-thumbnail.jpg",
    name: "Hot Chocolate",
    price: 11.0,
    description:
      "Luxuriously rich chocolate blended with steamed milk, topped with a light foam.",
  },
  {
    imageUrl: "/products/croissant-product.jpg",
    mobileImageUrl: "/products/croissant-thumbnail.jpg",
    name: "Butter Croissant",
    price: 8.0,
    description:
      "Flaky, golden layers of buttery pastry, baked fresh every morning for the perfect bite.",
  },
];

export default async function ProductDetailPage(props: Props) {
  const urlParams = await props.params;
  const productName = decodeURIComponent(urlParams.productName);
  const product = products.find((product) => product.name === productName);
  const productAlt = `A picture of ${product?.name}`;
  if (product === undefined) {
    notFound();
  }
  return (
    <div>
      <div className="flex flex-col gap-20 md:items-center lg:flex-row">
        <Image
          src={product.imageUrl}
          width={450}
          height={800}
          alt={productAlt}
          className="m-20 hidden border-6 border-[#FFF8F0] shadow md:block"
        />
        <Image
          width={450}
          height={800}
          className="w-full md:hidden"
          src={product.mobileImageUrl}
          alt={productAlt}
        />
        <div className="flex flex-col px-10 pb-20">
          <h1 className="mb-10 text-5xl lg:text-6xl">{product.name}</h1>
          <p className="mb-5">{product.description}</p>
          <p className="text-3xl font-bold">RM {product.price.toFixed(2)}</p>
        </div>
      </div>
      <div>
        <Suggestions />
      </div>
    </div>
  );
}
