import Image, { StaticImageData } from "next/image";
import Link from "next/link";

export type MenuProductProps = {
  thumbnailImage: StaticImageData;
  name: string;
  price: number;
  hoverScaleLarger?: boolean;
};

export default function MenuProduct(props: MenuProductProps) {
  const scaleLargerOnHover = props.hoverScaleLarger
    ? "hover:scale-115"
    : "hover:scale-105";
  return (
    <Link href={`/products/${props.name}`} className="mx-[50px] w-[250px]">
      <div
        className={`h-[380px] w-[250px] rounded-2xl bg-white shadow-2xl transition duration-250 ${scaleLargerOnHover} m-auto`}
      >
        <Image
          className="rounded-t-2xl"
          src={props.thumbnailImage}
          alt={props.name}
          width={250}
          height={250}
        />
        <div className="flex flex-col gap-10 p-5">
          <strong>{props.name}</strong>
          <p>RM {props.price.toFixed(2)}</p>
        </div>
      </div>
    </Link>
  );
}
