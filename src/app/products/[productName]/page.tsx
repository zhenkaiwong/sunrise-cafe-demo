import Suggestions from "@/ui/Suggestion";
import Image from "next/image";
import { notFound } from "next/navigation";

type Props = {
  params: { productName: string };
};

type Product = {
  imageUrl: string;
  name: string;
  price: number;
  description: string;
};

const products: Product[] = [
  {
    imageUrl: "/products/latte-product.jpg",
    name: "Caffè Latte",
    price: 12.5,
    description:
      "Smooth and creamy espresso with steamed milk, offering a comforting and balanced flavor.",
  },
  {
    imageUrl: "/products/americano-product.jpg",
    name: "Americano",
    price: 10.0,
    description:
      "A rich, bold espresso diluted with hot water, creating a smooth yet strong coffee experience.",
  },
  {
    imageUrl: "/products/hot-chocolate-product.jpg",
    name: "Hot Chocolate",
    price: 11.0,
    description:
      "Luxuriously rich chocolate blended with steamed milk, topped with a light foam.",
  },
  {
    imageUrl: "/products/croissant-product.jpg",
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
  if (product === undefined) {
    notFound();
  }
  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-20 p-20">
        <Image
          src={product.imageUrl}
          width={450}
          height={800}
          alt={`A picture of ${product.name}`}
          className="border-6 border-[#FFF8F0] shadow"
        />
        <div className="flex flex-col">
          <h1 className="text-5xl lg:text-6xl mb-10">{product.name}</h1>
          <p className="mb-5">{product.description}</p>
          <p className="font-bold text-3xl">RM {product.price.toFixed(2)}</p>
        </div>
      </div>
      <div>
        <Suggestions />
      </div>
    </div>
  );
}
