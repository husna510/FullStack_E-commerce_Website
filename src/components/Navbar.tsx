"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "@/components/search/SearchBar";

interface NavbarProps {
  onSearch?: (term: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const searchContainerRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const toggleSearch = () => {
    setShowSearch(true);
    setTimeout(
      () => searchContainerRef.current?.querySelector("input")?.focus(),
      100
    );
  };

  const handleSearchSubmit = () => {
    if (searchTerm.trim() !== "") {
      onSearch?.(searchTerm);
      router.push(`/shop?search=${encodeURIComponent(searchTerm)}`);
      setShowSearch(false);
      setSearchTerm("");
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowSearch(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full h-[80px] bg-white flex items-center justify-between px-4 md:px-8 lg:px-16 shadow-md z-50">
      <div className="flex items-center">
        <Link href="/">
          <Image
            src={"/images/logo.svg"}
            alt="logo"
            width={160}
            height={40}
            className="w-auto h-auto ml-4 cursor-pointer"
          />
        </Link>
      </div>

      <div className="hidden md:flex space-x-6 text-gray-800 text-sm">
        <Link href={"/"} className="hover:text-gray-500 transition">
          Home
        </Link>
        <Link href={"/shop"} className="hover:text-gray-500 transition">
          Shop
        </Link>
        <Link href={"/blog"} className="hover:text-gray-500 transition">
          Blog
        </Link>
        <Link href={"/contact"} className="hover:text-gray-500 transition">
          Contact
        </Link>
      </div>

      <div className="hidden sm:flex items-center space-x-4">
        <Image
          src="/images/contact-icon.svg"
          alt="contact"
          width={24}
          height={24}
          className="w-6 h-6 cursor-pointer hover:opacity-80"
        />
        <div className="relative" ref={searchContainerRef}>
          <Image
            src="/images/search-icon.svg"
            alt="search"
            width={24}
            height={24}
            onClick={toggleSearch}
            className="cursor-pointer"
          />
          {showSearch && (
            <div>
              <SearchBar
                setSearchTerm={setSearchTerm}
                onSearch={handleSearchSubmit}
              />
            </div>
          )}
        </div>
        <Link href="/asgaard-sofa">
          <Image
            src="/images/heart-icon.svg"
            alt="favorites"
            width={24}
            height={24}
            className="w-6 h-6 cursor-pointer hover:opacity-80"
          />
        </Link>
        <Link href="/cart">
          <Image
            src="/images/cart-icon.svg"
            alt="cart"
            width={24}
            height={24}
            className="w-6 h-6 cursor-pointer hover:opacity-80"
          />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;