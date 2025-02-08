"use client";

import { useEffect, useState, useCallback } from "react";
import { FaShoppingCart } from "react-icons/fa";
import Image from "next/image";
import Swal from "sweetalert2";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import {
  filteredProductsQuery,
  searchProductsQuery,
  eight,
} from "@/sanity/lib/queries";
import { Product } from "types/products";
import ClipLoader from "react-spinners/ClipLoader";
import { addToCart } from "@/app/actions";
import Link from "next/link";

interface ProductListProps {
  filters: {
    tag: string;
    priceRange: number;
    discountOnly: boolean;
    newProductOnly: boolean;
  };
  searchTerm: string;
  setTotalResults: (count: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  filters,
  searchTerm,
  setTotalResults,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const updateTotalResults = useCallback(
    (count: number) => {
      setTotalResults(count);
    },
    [setTotalResults]
  );

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        let fetchedProducts: Product[] = [];
        if (searchTerm) {
          const query = searchProductsQuery(searchTerm);
          fetchedProducts = await client.fetch(query);
        } else {
          if (
            filters.tag ||
            filters.priceRange > 0 ||
            filters.discountOnly ||
            filters.newProductOnly
          ) {
            const query = filteredProductsQuery(filters);
            fetchedProducts = await client.fetch(query);
          } else {
            fetchedProducts = await client.fetch(eight);
          }
        }

        setProducts(fetchedProducts || []);
        updateTotalResults(fetchedProducts.length);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setProducts([]);
        updateTotalResults(0);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [filters, searchTerm, updateTotalResults]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <ClipLoader color="#B88E2F" loading={loading} size={50} />
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">No products available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mx-auto max-w-screen-xl">
      {products.map((product) => (
        <div
          key={product._id}
          className="w-full bg-[#F4F5F7] mx-auto rounded-lg overflow-hidden transform transition-shadow duration-300 hover:shadow-xl"
        >
          <Link href={`/product/${product.slug.current || "#"}`}>
            <div className="cursor-pointer shadow-lg rounded-lg overflow-hidden group transition-transform transform hover:scale-105">
              {product.productImage ? (
                <div className="relative w-full h-64">
                  <Image
                    src={urlFor(product.productImage).url()}
                    alt={product.title || "Product image"}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                  {product.isNew && (
                    <span className="absolute top-2 left-2 bg-[#B88E2F] text-white text-sm font-semibold px-3 py-2 rounded-full">
                      New
                    </span>
                  )}
                  {product.discountPercentage &&
                    product.discountPercentage > 0 && (
                      <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-semibold px-3 py-2 rounded-full shadow-md">
                        {product.discountPercentage}% OFF
                      </span>
                    )}
                </div>
              ) : (
                <div className="relative w-full h-64 bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-500">No Image Available</span>
                </div>
              )}
              <div className="p-4">
                <h3 className="text-[22px] font-semibold text-gray-800 text-center group-hover:text-[#B88E2F] transition-colors duration-300">
                  {product.title}
                </h3>
                <div className="text-center mt-2">
                  {product.discountPercentage &&
                  product.discountPercentage > 0 ? (
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-[20px] text-gray-800 font-semibold">
                        $
                        {(
                          product.price *
                          (1 - product.discountPercentage / 100)
                        ).toFixed(2)}
                      </span>
                      <span className="text-[16px] text-gray-500 line-through">
                        $ {product.price.toFixed(2)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-[20px] text-gray-800 font-normal">
                      $ {product.price.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex justify-center mb-4">
                <button
                  className="flex items-center justify-center bg-[#B88E2F] text-white py-3 px-6 rounded-md text-sm font-semibold hover:bg-[#9e7d24] transition-colors duration-300 ease-in-out transform hover:scale-110"
                  onClick={(e) => {
                    e.preventDefault();
                    Swal.fire({
                      position: "top",
                      icon: "success",
                      title: `${product.title} added to cart`,
                      showConfirmButton: false,
                      timer: 1000,
                    });
                    addToCart(product);
                  }}
                >
                  <FaShoppingCart className="mr-2" /> Add to Cart
                </button>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
