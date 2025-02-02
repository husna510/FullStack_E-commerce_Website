"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import { Product } from "types/products";
import { getCartItems, removeFromCart, updateQuantity } from "../actions";
import { urlFor } from "@/sanity/lib/image";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const router = useRouter();

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
        Swal.fire(
          "Removed!",
          "The item has been removed from your cart.",
          "success"
        );
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
    if (product && product.inventoryCount > 1)
      handleQuantityChange(id, product.inventoryCount - 1);
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.inventoryCount,
      0
    );
  };

  const handleProceedToOrder = () => {
    Swal.fire({
      title: "Confirm Order",
      text: "Are you sure you want to proceed with your order?",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Proceed!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Order Confirmed!",
          "Your order has been placed successfully.",
          "success"
        );
        router.push("/checkout");
      }
    });
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
      <div className="flex flex-col lg:flex-row items-start lg:items-center lg:justify-around w-full px-4 lg:px-20">
        <div className="flex flex-col w-full lg:w-3/5 overflow-x-auto">
          <nav className="h-[55px] w-full bg-[#F9F1E7] flex items-center justify-between px-6 text-sm lg:text-base font-semibold">
            <span className="w-1/5">Product</span>
            <span className="w-1/5">Price</span>
            <span className="w-1/5">Quantity</span>
            <span className="w-1/5">Subtotal</span>
          </nav>
          {cartItems.length > 0 ? (
            <div className="mt-6 lg:mt-10 flex flex-col gap-6">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between px-6 border-b pb-4 hover:bg-gray-100 transition-all duration-200"
                >
                  {item.productImage && (
                    <Image
                      src={urlFor(item.productImage).url()}
                      className="w-16 h-16 object-cover rounded-lg"
                      alt={item.title}
                      width={64}
                      height={64}
                    />
                  )}
                  <span className="w-1/5 text-sm lg:text-base">
                    {item.title}
                  </span>
                  <span className="w-1/5 text-sm lg:text-base">
                    Rs. {item.price.toLocaleString()}
                  </span>
                  <div className="w-1/5 flex items-center gap-2">
                    <button
                      className="h-8 w-8 rounded-md border border-black flex items-center justify-center hover:bg-gray-300"
                      onClick={() => handleDecrement(item._id)}
                    >
                      -
                    </button>
                    <span>{item.inventoryCount}</span>
                    <button
                      className="h-8 w-8 rounded-md border border-black flex items-center justify-center hover:bg-gray-300"
                      onClick={() => handleIncrement(item._id)}
                    >
                      +
                    </button>
                  </div>
                  <span className="w-1/5 text-sm lg:text-base">
                    Rs. {(item.price * item.inventoryCount).toLocaleString()}
                  </span>
                  <Image
                    src={"/images/delete.svg"}
                    alt="delete"
                    width={24}
                    height={24}
                    className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform duration-200"
                    onClick={() => handleRemove(item._id)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-6 text-center">Your cart is empty.</div>
          )}
        </div>
        <div className="bg-[#F9F1E7] w-full lg:w-[393px] h-auto p-6 rounded-lg flex flex-col items-center justify-center mt-8 lg:mt-0">
          <h1 className="text-center text-[24px] lg:text-[32px] font-semibold mb-6">
            Cart Totals
          </h1>
          <div className="flex items-center justify-between mb-4 w-full px-4">
            <h3 className="text-sm lg:text-base">Subtotal</h3>
            <span className="text-sm lg:text-base">
              Rs. {calculateTotal().toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between mb-6 w-full px-4">
            <h3 className="text-sm lg:text-base">Total</h3>
            <span className="text-sm lg:text-base text-[#B88E2F]">
              Rs. {calculateTotal().toLocaleString()}
            </span>
          </div>
          {cartItems.length > 0 && (
            <button
              className="border border-black w-full h-12 rounded-2xl text-lg hover:bg-[#B88E2F] hover:text-white hover:scale-105 transition-transform duration-200"
              onClick={handleProceedToOrder}
            >
              Proceed to Order
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default CartPage;
