"use client";
import React, { useState } from "react";
import Image from "next/image";

interface FilterProps {
  applyFilters: (filters: {
    tag: string;
    priceRange: number;
    discountOnly: boolean;
    newProductOnly: boolean;
  }) => void;
  totalResults: number;
}

const FilterComponent: React.FC<FilterProps> = ({
  applyFilters,
  totalResults,
}) => {
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [priceRange, setPriceRange] = useState<number>(0);
  const [discountOnly, setDiscountOnly] = useState<boolean>(false);
  const [newProductOnly, setNewProductOnly] = useState<boolean>(false);

  const handleApplyFilters = () => {
    applyFilters({
      tag: selectedTag,
      priceRange,
      discountOnly,
      newProductOnly,
    });
  };

  return (
    <div className="h-auto bg-[#F9F1E7] flex flex-col sm:flex-row items-center justify-between p-2 sm:p-4">
      <div className="flex flex-wrap items-center justify-center sm:justify-evenly space-x-4 sm:space-x-8 w-full">
        <Image
          src="/images/dotted-line.svg"
          alt="dotted-line"
          width={25}
          height={25}
        />
        <h3 className="text-[14px] sm:text-[18px] md:text-[20px] font-semibold">
          Filter
        </h3>
        <Image
          src="/images/four-dot.svg"
          alt="four-dot"
          width={25}
          height={25}
        />
        <Image
          src="/images/square-line.svg"
          alt="square-line"
          width={25}
          height={25}
        />
      </div>
      <div className="flex flex-wrap items-center justify-between sm:space-x-4 mt-2 sm:mt-0 w-full">
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm md:text-base">
            {totalResults > 0
              ? `Showing 1–${Math.min(totalResults, 16)} of ${totalResults} results`
              : "No products found"}
          </span>
        </div>

        <div className="w-full sm:w-auto">
          <div className="flex flex-col gap-2">
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="border p-2 rounded-md text-xs sm:text-sm md:text-base"
            >
              <option value="">Select Category</option>
              <option value="Furniture">Furniture</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
            </select>

            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full"
            />
            <span className="text-xs sm:text-sm md:text-base">
              Price: ${priceRange}
            </span>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={discountOnly}
                onChange={() => setDiscountOnly(!discountOnly)}
                id="discountOnly"
              />
              <label
                htmlFor="discountOnly"
                className="text-xs sm:text-sm md:text-base"
              >
                Discount Only
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={newProductOnly}
                onChange={() => setNewProductOnly(!newProductOnly)}
                id="newProductOnly"
              />
              <label
                htmlFor="newProductOnly"
                className="text-xs sm:text-sm md:text-base"
              >
                New Products Only
              </label>
            </div>
          </div>
        </div>

        <div className="w-full sm:w-auto mt-4 sm:mt-0">
          <button
            onClick={handleApplyFilters}
            className="w-full sm:w-[120px] h-[36px] bg-[#B88E2F] text-[#FFFFFF] border border-[#B88E2F] text-xs sm:text-sm md:text-base rounded-md"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;
