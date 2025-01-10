"use server";

import { objectToQueryString } from "@/lib/utils";
import { revalidatePath } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getProducts(searchParams) {
  const filteredParams = { ...searchParams };
  //const resolvedParams = await searchParams;
  delete filteredParams.openAccordion;

  const res = await fetch(
    `${BASE_URL}/api/products?${objectToQueryString(filteredParams)}`
  );

  const data = await res.json();

  console.log("DATA LOGO" + data);
  return data;
}
//revalidatePath("/", "page");

export async function getProductTypes() {
  const res = await fetch(`${BASE_URL}/api/products/product-type`);
  const data = await res.json();

  return data;
}

export async function getProductById(productId) {
  const res = await fetch(`${BASE_URL}/api/products/${productId}`);
  const data = await res.json();

  return data;
}
