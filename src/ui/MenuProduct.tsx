import Image, { StaticImageData } from "next/image";
import Link from "next/link";

export type MenuProductProps = {
  thumbnailImage: StaticImageData;
  name: string;
  price: number;
};

export default function MenuProduct(props: MenuProductProps) {
  return (
    <Link href={`/products/${props.name}`} className="">
      <div className="rounded-2xl shadow-2xl hover:scale-105 transition duration-250">
        <Image
          className="rounded-t-2xl"
          src={props.thumbnailImage}
          alt={props.name}
          width={250}
          height={250}
        />
        <div className="p-5 flex flex-col gap-10">
          <strong>{props.name}</strong>
          <p>RM {props.price.toFixed(2)}</p>
        </div>
      </div>
    </Link>
  );
}
