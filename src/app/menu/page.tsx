import MenuFilters from "@/ui/MenuFilters";
import MenuProduct, { MenuProductProps } from "@/ui/MenuProduct";

import latteThumbnail from "@/../public/products/latte-thumbnail.jpg";
import americanoThumbnail from "@/../public/products/americano-thumbnail.jpg";
import hotChocolateThumbnail from "@/../public/products/hot-chocolate-thumbnail.jpg";
import croissantThumbnail from "@/../public/products/croissant-thumbnail.jpg";
import { getFilterStatuses } from "@/lib/helpers";

const coffeeProducts: MenuProductProps[] = [
  {
    thumbnailImage: latteThumbnail,
    name: "Caffè Latte",
    price: 12.5,
  },
  {
    thumbnailImage: americanoThumbnail,
    name: "Americano",
    price: 10.0,
  },
];

const testCoffeeProducts: MenuProductProps[] = [
  {
    thumbnailImage: latteThumbnail,
    name: "Caffè Latte",
    price: 12.5,
  },
  {
    thumbnailImage: americanoThumbnail,
    name: "Americano",
    price: 10.0,
  },
  {
    thumbnailImage: latteThumbnail,
    name: "Caffè Latte",
    price: 12.5,
  },
  {
    thumbnailImage: americanoThumbnail,
    name: "Americano",
    price: 10.0,
  },
  {
    thumbnailImage: latteThumbnail,
    name: "Caffè Latte",
    price: 12.5,
  },
  {
    thumbnailImage: americanoThumbnail,
    name: "Americano",
    price: 10.0,
  },
  {
    thumbnailImage: latteThumbnail,
    name: "Caffè Latte",
    price: 12.5,
  },
  {
    thumbnailImage: americanoThumbnail,
    name: "Americano",
    price: 10.0,
  },
  {
    thumbnailImage: latteThumbnail,
    name: "Caffè Latte",
    price: 12.5,
  },
  {
    thumbnailImage: americanoThumbnail,
    name: "Americano",
    price: 10.0,
  },
  {
    thumbnailImage: latteThumbnail,
    name: "Caffè Latte",
    price: 12.5,
  },
  {
    thumbnailImage: americanoThumbnail,
    name: "Americano",
    price: 10.0,
  },
];

const nonCoffeeProducts: MenuProductProps[] = [
  {
    thumbnailImage: hotChocolateThumbnail,
    name: "Hot Chocolate",
    price: 11.0,
  },
];

const pastryProducts: MenuProductProps[] = [
  {
    thumbnailImage: croissantThumbnail,
    name: "Butter Croissant",
    price: 8.0,
  },
];

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function MenuPage(props: Props) {
  const searchParams = await props.searchParams;
  const filter =
    searchParams.filter === undefined
      ? []
      : typeof searchParams.filter === "string"
        ? [searchParams.filter]
        : searchParams.filter;
  const initialStatus = getFilterStatuses(filter);
  const filterStatus =
    initialStatus.coffee === false &&
    initialStatus.nonCoffee === false &&
    initialStatus.pastries === false
      ? { coffee: true, nonCoffee: true, pastries: true }
      : initialStatus;

  return (
    <div className="m-5 flex flex-col gap-20 lg:flex-row">
      <MenuFilters />
      <div className="flex-1">
        <div className="flex flex-col gap-10">
          {filterStatus.coffee && (
            <MenuSection heading="Coffees" products={testCoffeeProducts} />
          )}
          {filterStatus.nonCoffee && (
            <MenuSection heading="Non-Coffees" products={nonCoffeeProducts} />
          )}
          {filterStatus.pastries && (
            <MenuSection heading="Pastries" products={pastryProducts} />
          )}
        </div>
      </div>
    </div>
  );
}

type MenuSectionProps = {
  heading: string;
  products: MenuProductProps[];
};
function MenuSection(props: MenuSectionProps) {
  return (
    <div>
      <h2 className="pb-5 text-3xl">{props.heading}</h2>
      {props.products.length === 0 ? (
        <p>Coming soon</p>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,250px)] gap-y-16 sm:gap-x-10">
          {props.products.map((product, index) => (
            <MenuProduct
              name={product.name}
              thumbnailImage={product.thumbnailImage}
              price={product.price}
              key={`${product.name}-${index}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
