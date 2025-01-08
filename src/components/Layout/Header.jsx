"use client";

import { SearchIcon, UserIcon, CartIcon } from "@/app/icons";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import Input from "../ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { objectToQueryString } from "@/lib/utils";
import Script from "next/script";

const Header = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";

  const existingSearchParams = {
    productTypeId: searchParams.get("productTypeId"),
    sortBy: searchParams.get("sortBy"),
    minPrice: searchParams.get("minPrice"),
    maxPrice: searchParams.get("maxPrice"),
    rating: searchParams.get("rating"),
    inStock: searchParams.get("inStock"),
    openAccordion: searchParams.get("openAccordion"),
  };

  const router = useRouter();

  const updateSearchParams = (newParamsArray) => {
    const updatedSearchParams = { ...existingSearchParams, search: search };

    newParamsArray?.forEach((param) => {
      Object.entries(param).forEach(([key, value]) => {
        if (value === null || value === "" || value === "all") {
          delete updatedSearchParams[key];
        } else {
          updatedSearchParams[key] = value;
        }
      });
    });

    router.push(`/?${objectToQueryString(updatedSearchParams)}`);
  };

  const handleFilterChange = (filterType, value) => {
    updateSearchParams([
      {
        [filterType]: value,
      },
    ]);
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <>
      <Script
        src="https://code.jquery.com/jquery-3.6.0.min.js"
        strategy="beforeInteractive"
      />
      <div className="navbar">
        <div className="container">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-semibold">MyStore</h1>

            <div className="relative w-full max-w-lg">
              <SearchIcon className="absolute left-2 top-2 w-7 h-7" />
              <Input
                placeholder="Search Product..."
                className="pl-10"
                value={search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
              />
            </div>

            <div className="relative" ref={dropdownRef}>
              <div className="flex gap-3">
                <CartIcon className="w-7 h-7" />
                <button className="icon-button" onClick={toggleDropdown}>
                  <UserIcon className="w-7 h-7" />
                </button>
              </div>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <Link
                    href="/"
                    className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100"
                  >
                    My Wishlist
                  </Link>
                  <button className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100 w-full text-left">
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
