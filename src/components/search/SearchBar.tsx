"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface SearchBarProps {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  onSearch?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ setSearchTerm, onSearch }) => {
  const [query, setQuery] = useState<string>("");
  const router = useRouter();

  const handleSearch = () => {
    if (query.trim() !== "") {
      setSearchTerm(query);
      if (onSearch) onSearch();
      router.push(`/shop?search=${encodeURIComponent(query)}`);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && query.trim() !== "") {
      setSearchTerm(query);
      if (onSearch) onSearch();
      router.push(`/shop?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="search-bar p-4 rounded-lg bg-white shadow-md max-w-lg mx-auto">
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search for products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="border border-gray-300 focus:border-[#B88E2F] focus:ring-2 focus:ring-[#B88E2F] focus:outline-none rounded-lg p-3 flex-1 text-gray-700"
        />
        <button
          onClick={handleSearch}
          className="bg-[#B88E2F] text-white p-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 hover:bg-[#9c7628]"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
