import latteThumbnail from "@/../public/products/latte-thumbnail.jpg";
import americanoThumbnail from "@/../public/products/americano-thumbnail.jpg";
import hotChocolateThumbnail from "@/../public/products/hot-chocolate-thumbnail.jpg";
import croissantThumbnail from "@/../public/products/croissant-thumbnail.jpg";

import { MenuProductProps } from "@/ui/MenuProduct";

export function getCoffeeProducts(): MenuProductProps[] {
  return [
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
}

export function getNonCoffeeProducts(): MenuProductProps[] {
  return [
    {
      thumbnailImage: hotChocolateThumbnail,
      name: "Hot Chocolate",
      price: 11.0,
    },
  ];
}

export function getPastryProducts(): MenuProductProps[] {
  return [
    {
      thumbnailImage: croissantThumbnail,
      name: "Butter Croissant",
      price: 8.0,
    },
  ];
}
