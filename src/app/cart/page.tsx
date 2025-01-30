"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Swal from "sweetalert2";
import { Product } from "types/products";
import { getCartItems, removeFromCart, updateQuantity } from "../actions";
import { urlFor } from "@/sanity/lib/image";

const CartPage = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    setCartItems(getCartItems());
  }, []);

  const handleRemove = (id: string) => {
    Swal.fire({
      title: "Are you sure you want to remove this item from the cart?",
      text: "You will not be able to recover this item",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromCart(id);
        setCartItems(getCartItems());
        Swal.fire("Removed!", "The item has been removed from your cart.", "success");
      }
    });
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    updateQuantity(id, quantity);
    setCartItems(getCartItems());
  };

  const handleIncrement = (id: string) => {
    const product = cartItems.find((item) => item._id === id);
    if (product) handleQuantityChange(id, product.inventoryCount + 1);
  };

  const handleDecrement = (id: string) => {
    const product = cartItems.find((item) => item._id === id);
    if (product && product.inventoryCount > 1) handleQuantityChange(id, product.inventoryCount - 1);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.inventoryCount, 0);
  };

  return (
    <>
      <div>
        <Image
          src={"/images/cart-img.svg"}
          alt="cart-section"
          width={1440}
          height={316}
          className="w-full h-auto mt-20"
        />
      </div>
      <div className="flex flex-col lg:flex-row lg:h-[525px] items-center lg:justify-around">
        <div className="flex flex-col w-full lg:w-auto">
          <nav className="h-[55px] w-full lg:w-[817px] bg-[#F9F1E7] flex items-center justify-around list-none text-sm lg:text-base">
            <li>Product</li>
            <li>Price</li>
            <li>Quantity</li>
            <li>Subtotal</li>
          </nav>
          {cartItems.length > 0 ? (
            <div className="mt-6 lg:mt-14 flex flex-col gap-6">
              {cartItems.map((item) => (
                <div key={item._id} className="flex items-center justify-around flex-wrap gap-4">
                  {item.productImage && (
                    <Image
                      src={urlFor(item.productImage).url()}
                      className="w-16 h-16 object-cover rounded-lg"
                      alt={item.title}
                      width={500}
                      height={500}
                    />
                  )}
                  <span className="text-sm lg:text-base">{item.title}</span>
                  <span className="text-sm lg:text-base">Rs. {item.price.toLocaleString()}</span>
                  <div className="flex items-center gap-2">
                    <button
                      className="h-[32px] w-[32px] rounded-md border border-black flex items-center justify-center"
                      onClick={() => handleDecrement(item._id)}
                    >
                      -
                    </button>
                    <span>{item.inventoryCount}</span>
                    <button
                      className="h-[32px] w-[32px] rounded-md border border-black flex items-center justify-center"
                      onClick={() => handleIncrement(item._id)}
                    >
                      +
                    </button>
                  </div>
                  <span className="text-sm lg:text-base">
                    Rs. {(item.price * item.inventoryCount).toLocaleString()}
                  </span>
                  <Image
                    src={"/images/delete.svg"}
                    alt="delete"
                    width={28}
                    height={28}
                    className="w-[20px] lg:w-[28px] h-auto cursor-pointer"
                    onClick={() => handleRemove(item._id)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-6 text-center">Your cart is empty.</div>
          )}
        </div>
        <div className="bg-[#F9F1E7] w-full lg:w-[393px] h-auto lg:h-[390px] mt-8 lg:mt-0 p-6 rounded-lg flex flex-col items-center justify-center">
          <h1 className="text-center text-[24px] lg:text-[32px] font-semibold mb-6">Cart Totals</h1>
          <div className="flex items-center justify-between mb-4 w-full px-4 lg:px-0">
            <h3 className="text-sm lg:text-base">Subtotal</h3>
            <span className="text-sm lg:text-base">Rs. {calculateTotal().toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between mb-6 w-full px-4 lg:px-0">
            <h3 className="text-sm lg:text-base">Total</h3>
            <span className="text-sm lg:text-base text-[#B88E2F]">
              Rs. {calculateTotal().toLocaleString()}
            </span>
          </div>
          {cartItems.length > 0 ? (
            <Link href={"/checkout"}>
              <button className="border border-black w-full lg:w-[222px] h-[48px] lg:h-[58.95px] rounded-2xl text-[18px] lg:text-[20px] hover:bg-[#B88E2F] hover:text-[#fff] hover:border-[#fff]">
                Check Out
              </button>
            </Link>
          ) : (
            <button
              className="border border-black w-full lg:w-[222px] h-[48px] lg:h-[58.95px] rounded-2xl text-[18px] lg:text-[20px]"
              disabled
            >
              Check Out
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default CartPage;
