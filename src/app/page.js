import { getProducts, getProductTypes } from "@/actions/productActions";
import HomeScreen from "@/screens/home";
import Image from "next/image";
import Script from "next/script";

export default async function Home({ searchParams }) {
  const resolvedParams = await searchParams;
  const products = await getProducts(resolvedParams);
  const productTypesRes = await getProductTypes();
  const productTypes = [
    { label: "All", value: "all" },
    ...productTypesRes?.data?.map((item) => ({
      label: item.name,
      value: item.id,
    })),
  ];
  return (
    <>
      <Script
        src="https://code.jquery.com/jquery-3.6.0.min.js"
        strategy="beforeInteractive"
      />
      <HomeScreen
        searchParams={resolvedParams}
        products={products}
        productTypes={productTypes}
      />
    </>
  );
}
