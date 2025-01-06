import HomeScreen from "@/screens/home";
import Image from "next/image";
import Script from "next/script";

export default async function Home({ searchParams }) {
  return (
    <>
      <Script
        src="https://code.jquery.com/jquery-3.6.0.min.js"
        strategy="beforeInteractive"
      />
      <HomeScreen searchParams={searchParams} />
    </>
  );
}
