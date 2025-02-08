"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import ProductList from "@/components/productlist";
import Navbar from "@/components/Navbar";
import FilterComponent from "@/components/filters/FilterPanel";
import { useSearchParams } from "next/navigation";

const ShopPage = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams?.get("search") ?? "";

  const [filters, setFilters] = useState({
    tag: "",
    priceRange: 0,
    discountOnly: false,
    newProductOnly: false,
  });

  const [searchTerm, setSearchTerm] = useState(searchQuery);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    if (searchQuery) {
      setSearchTerm(searchQuery);
    }
  }, [searchQuery]);

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
      <FilterComponent
        applyFilters={applyFilters}
        totalResults={totalResults}
      />
      <ProductList
        filters={filters}
        searchTerm={searchTerm}
        setTotalResults={setTotalResults}
      />
    </>
  );
};

export default ShopPage;
