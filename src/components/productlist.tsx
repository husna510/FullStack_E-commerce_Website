import React, { useEffect, useState } from "react";
import { Product } from "../../types/products";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";
import { eight } from "@/sanity/lib/queries";
import Link from "next/link";
import { addToCart } from "@/app/actions";
import swal from "sweetalert2";
import Swal from "sweetalert2";

const ProductList = () => {
  const [product, setProduct] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const fetchedProduct: Product[] = await client.fetch(eight);
        setProduct(fetchedProduct);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    }
    fetchProduct();
  }, []);

  if (product.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">No products available at the moment.</p>
      </div>
    );
  }

  // Add to Cart
  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    Swal.fire({
      position: "top",
      icon: "success",
      title: `${product.title} added to cart`,
      showConfirmButton: false,
      timer: 1000,
    });

    addToCart(product);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mx-auto max-w-screen-xl">
      {product.map((product) => (
        <div
          key={product._id}
          className="w-full bg-[#F4F5F7] mx-auto rounded-lg overflow-hidden transform transition-shadow duration-300 hover:shadow-xl"
        >
          <Link href={`/product/${product.slug.current || "#"}`}>
            <div className="cursor-pointer shadow-lg rounded-lg overflow-hidden group transition-transform transform hover:scale-105">
              {/* Product Image */}
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
                  <span className="text-gray-500">Image not available</span>
                </div>
              )}

              {/* Product Details */}
              <div className="p-4">
                {/* Product Title */}
                <h3 className="text-[22px] font-semibold text-gray-800 text-center group-hover:text-[#B88E2F] transition-colors duration-300">
                  {product.title}
                </h3>

                {/* Price */}
                <div className="text-center mt-2">
                  {product.discountPercentage &&
                  product.discountPercentage > 0 ? (
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-[20px] text-gray-800 font-semibold">
                        ${" "}
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
              {/* Add to Cart Button */}
              <div className="flex justify-center mb-4">
                <button
                  className="flex items-center justify-center bg-[#B88E2F] text-white py-3 px-6 rounded-md text-sm font-semibold hover:bg-[#9e7d24]  transition-colors duration-300 ease-in-out transform hover:scale-110"
                  onClick={(e) => handleAddToCart(e, product)}
                >
                  <FaShoppingCart className="mr-2" />
                  Add to Cart
                </button>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};
const shoopPage = () => {
  const [product, setProduct] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const fetchedProduct: Product[] = await client.fetch(eight);
        setProduct(fetchedProduct);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    }
    fetchProduct();
  }, []);

  if (product.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">No products available at the moment.</p>
      </div>
    );
  }

  // Add to Cart
  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    Swal.fire({
      position: "top",
      icon: "success",
      title: `${product.title} added to cart`,
      showConfirmButton: false,
      timer: 1000,
    });

    addToCart(product);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mx-auto max-w-screen-xl">
      {product.map((product) => (
        <div
          key={product._id}
          className="w-full bg-[#F4F5F7] mx-auto rounded-lg overflow-hidden transform transition-shadow duration-300 hover:shadow-xl"
        >
          <Link href={`/product/${product.slug.current || "#"}`}>
            <div className="cursor-pointer shadow-lg rounded-lg overflow-hidden group transition-transform transform hover:scale-105">
              {/* Product Image */}
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
                  <span className="text-gray-500">Image not available</span>
                </div>
              )}

              {/* Product Details */}
              <div className="p-4">
                {/* Product Title */}
                <h3 className="text-[22px] font-semibold text-gray-800 text-center group-hover:text-[#B88E2F] transition-colors duration-300">
                  {product.title}
                </h3>

                {/* Price */}
                <div className="text-center mt-2">
                  {product.discountPercentage &&
                  product.discountPercentage > 0 ? (
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-[20px] text-gray-800 font-semibold">
                        ${" "}
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
              {/* Add to Cart Button */}
              <div className="flex justify-center mb-4">
                <button
                  className="flex items-center justify-center bg-[#B88E2F] text-white py-3 px-6 rounded-md text-sm font-semibold hover:bg-[#9e7d24]  transition-colors duration-300 ease-in-out transform hover:scale-110"
                  onClick={(e) => handleAddToCart(e, product)}
                >
                  <FaShoppingCart className="mr-2" />
                  Add to Cart
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
