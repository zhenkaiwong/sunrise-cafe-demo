import latteThumbnail from "@/../public/products/latte-thumbnail.jpg";
import americanoThumbnail from "@/../public/products/americano-thumbnail.jpg";
import hotChocolateThumbnail from "@/../public/products/hot-chocolate-thumbnail.jpg";
import croissantThumbnail from "@/../public/products/croissant-thumbnail.jpg";

import { MenuProductProps } from "@/ui/MenuProduct";

type ApiProductItem = {
  mobileImageUrl: string;
  name: string;
  price: number;
};

const apiUrl = process.env.API_URL;
const useFakeData = apiUrl === undefined

async function getProductsFromApi(category: string): Promise<MenuProductProps[]> {
  console.log(`Get ${category} menu from API`);
  try {
    const requestUrl = apiUrl + "/api/products/category/" + category;
    const response = await fetch(requestUrl);
    if (response.ok) {
      const data = await response.json();

      return data.map((item: ApiProductItem) => ({
        thumbnailImage: item.mobileImageUrl,
        name: item.name,
        price: item.price,
      }));
    }
  } catch (error) {
    console.error("Failed to fetch products from category:", error);
  }
  return [];
}

export async function getCoffeeProducts(): Promise<MenuProductProps[]> {
  if (useFakeData) {
    console.log("Get coffee menu from fake data");
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

  const productsFromApi = await getProductsFromApi("coffee");

  return productsFromApi;
}

export async function getNonCoffeeProducts(): Promise<MenuProductProps[]> {
  if (useFakeData) {
    console.log("Get non-coffee menu from fake data");
    return [
      {
        thumbnailImage: hotChocolateThumbnail,
        name: "Hot Chocolate",
        price: 11.0,
      },
    ];
  }

  const productsFromApi = await getProductsFromApi("coffee");

  return productsFromApi;
}

export async function getPastryProducts(): Promise<MenuProductProps[]> {
  if (useFakeData) {
    console.log("Get pastry menu from fake data");
    return [
      {
        thumbnailImage: croissantThumbnail,
        name: "Butter Croissant",
        price: 8.0,
      },
    ];
  }

  const productsFromApi = await getProductsFromApi("coffee");

  return productsFromApi;
}
