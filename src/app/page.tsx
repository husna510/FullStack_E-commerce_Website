"use client";

import Link from "next/link";
import Image from "next/image";
import ProductList from "@/components/productlist";
import SearchBar from "@/components/search/SearchBar";
import { useState } from "react";

const Page = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filters] = useState({
    tag: "",
    priceRange: 0,
    discountOnly: false,
    newProductOnly: false,
  });
  const [totalResults, setTotalResults] = useState(0);

  return (
    <>
      <div>
        <Image
          src={"/images/hero-sec.svg"}
          alt="hero-section"
          width={1440}
          height={316}
          className="w-full h-auto mt-20"
        />
      </div>
      <h1 className="text-[32px] font-bold text-center mt-10">
        Browse The Range
      </h1>
      <p className="text-center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>

      <SearchBar setSearchTerm={setSearchTerm} />

      <div className="flex flex-wrap items-center justify-center mt-16 gap-8">
        {["Dining", "Living", "Bedroom"].map((category, index) => (
          <div
            key={index}
            className="flex flex-col items-center max-w-[300px] sm:max-w-[100%]"
          >
            <Image
              src={`/images/img${index + 1}.svg`}
              alt={`img-${index + 1}`}
              width={381}
              height={480}
              className="max-w-[100%] h-auto"
            />
            <h3 className="text-center text-2xl mt-6">{category}</h3>
          </div>
        ))}
      </div>

      <h1 className="text-[40px] text-center font-bold mt-14 mb-6">
        Our Products
      </h1>

      <ProductList
        filters={filters}
        searchTerm={searchTerm}
        setTotalResults={setTotalResults}
      />

      <p className="text-center mt-4">Total Results: {totalResults}</p>

      <div className="h-auto bg-[#FCF8F3] mt-10 flex flex-col lg:flex-row items-center justify-around">
        <div className="text-center lg:text-left px-6 lg:px-0">
          <h1 className="text-[32px] sm:text-[36px] md:text-[40px] font-bold w-[90%] md:w-[422px]">
            50+ Beautiful rooms inspiration
          </h1>
          <p className="text-[14px] sm:text-[16px] mt-4 md:mt-6 w-[90%] md:w-[368px]">
            Our designer already made a lot of beautiful prototypes of rooms
            that inspire you.
          </p>
          <Link href="/shop">
            <button className="w-[70%] md:w-[176px] h-[48px] bg-[#B88E2F] text-[#FFFFFF] mt-8 hover:bg-[#FFFFFF] hover:text-[#B88E2F] border border-[#B88E2F] transition-colors duration-300">
              Explore More
            </button>
          </Link>
        </div>

        {["img6", "img5"].map((img, index) => (
          <div key={index} className="mt-8 lg:mt-0">
            <Image
              src={`/images/${img}.svg`}
              alt={`last-${index + 1}`}
              width={index === 0 ? 404 : 372}
              height={index === 0 ? 582 : 486}
              className="w-full"
            />
          </div>
        ))}
      </div>

      <div className="h-auto mt-32 px-6 md:px-16 lg:px-32">
        <h3 className="text-center text-[18px] sm:text-[20px]">
          Share your setup with
        </h3>
        <h1 className="text-center text-[30px] sm:text-[40px] font-bold">
          #FuniroFurniture
        </h1>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 mt-8">
          <div className="flex flex-col items-center lg:items-start gap-5">
            <Image
              src="/images/last1.svg"
              alt="last-1"
              width={451}
              height={312}
              className="mb-5"
            />
            <Image
              src="/images/last2.svg"
              alt="last-2"
              width={451}
              height={312}
            />
          </div>

          <div className="flex justify-center">
            <Image
              src="/images/last3.svg"
              alt="last-3"
              width={295}
              height={392}
            />
          </div>

          <div className="flex flex-col items-center lg:items-start gap-5">
            <Image
              src="/images/last4.svg"
              alt="last-4"
              width={420}
              height={348}
              className="mb-5 pt-8 lg:pt-32"
            />
            <div className="flex justify-between gap-5">
              <Image
                src="/images/last5.svg"
                alt="last-5"
                width={178}
                height={242}
              />
              <Image
                src="/images/last6.svg"
                alt="last-6"
                width={258}
                height={196}
              />
            </div>
          </div>

          <div className="flex justify-center">
            <Image
              src="/images/last7.svg"
              alt="last-7"
              width={425}
              height={433}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;