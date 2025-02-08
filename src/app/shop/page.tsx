"use client";
import React, { useState, useEffect, useCallback, Suspense } from "react";
import Image from "next/image";
import ProductList from "@/components/productlist";
import Navbar from "@/components/Navbar";
import FilterComponent from "@/components/filters/FilterPanel";
import { useSearchParams } from "next/navigation";

const SearchParamsHandler = ({ setSearchTerm }: { setSearchTerm: (term: string) => void }) => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams?.get("search") ?? "";

  useEffect(() => {
    if (searchQuery) {
      setSearchTerm(searchQuery);
    }
  }, [searchQuery]);

  return null; // This component does not render anything
};

const ShopPage = () => {
  const [filters, setFilters] = useState({
    tag: "",
    priceRange: 0,
    discountOnly: false,
    newProductOnly: false,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [totalResults, setTotalResults] = useState(0);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const applyFilters = useCallback((newFilters: typeof filters) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  }, []);

  return (
    <>
      <Navbar onSearch={handleSearch} />
      <Image
        src="/images/shop.svg"
        alt="shop"
        width={1440}
        height={316}
        className="w-full mt-20"
      />

      <Suspense fallback={<div>Loading filters...</div>}>
        <SearchParamsHandler setSearchTerm={setSearchTerm} />
      </Suspense>

      <FilterComponent applyFilters={applyFilters} totalResults={totalResults} />
      <ProductList filters={filters} searchTerm={searchTerm} setTotalResults={setTotalResults} />
    </>
  );
};

export default ShopPage;
