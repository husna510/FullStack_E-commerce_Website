"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Product } from "types/products";
import { getCartItems } from "../actions";
import { urlFor } from "@/sanity/lib/image";
import { client } from "@/sanity/lib/client";

const CheckOutPage = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [discount, setDiscount] = useState<number>(0);

  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    region: "",
    address: "",
    city: "",
    province: "",
    zipCode: "",
    contact: "",
    email: "",
    additionalInfo: "",
    paymentMethod: "", 
  });

  const [formErrors, setFormErrors] = useState({
    firstName: false,
    address: false,
    city: false,
    province: false,
    zipCode: false,
    contact: false,
    email: false,
    paymentMethod: false,
  });

  useEffect(() => {
    setCartItems(getCartItems());
    const appliedDiscount = localStorage.getItem("appliedDiscount");
    if (appliedDiscount) {
      setDiscount(Number(appliedDiscount));
    }
  }, []);

  const subTotal = cartItems.reduce(
    (total, item) => total + item.price * item.inventoryCount,
    0
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const errors = {
      firstName: !formValues.firstName,
      address: !formValues.address,
      city: !formValues.city,
      province: !formValues.province,
      zipCode: !formValues.zipCode,
      contact: !formValues.contact,
      email: !formValues.email,
      paymentMethod: !formValues.paymentMethod,
    };

    setFormErrors(errors);
    return Object.values(errors).every((error) => !error);
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) {
      alert("Please fill in all required fields.");
      return;
    }

    const orderData = {
      _type: "order",
      firstName: formValues.firstName,
      lastName: formValues.lastName || null,
      companyName: formValues.companyName || null,
      region: formValues.region || null,
      address: formValues.address,
      city: formValues.city,
      province: formValues.province,
      zipCode: formValues.zipCode,
      contact: formValues.contact,
      email: formValues.email,
      additionalInfo: formValues.additionalInfo || null,
      cartItems: cartItems.map((item) => ({
        _type: "reference",
        _ref: item._id,
      })),
      subTotal: subTotal,
      discount: discount,
      total: subTotal - discount,
      paymentMethod: formValues.paymentMethod,
      orderStatus: "pending",
      createdAt: new Date().toISOString(),
    };

    console.log("Order Data:", orderData); 

    try {
      
      const result = await client.create(orderData);
      console.log("Order creation result:", result);

      localStorage.removeItem("appliedDiscount");
      setCartItems([]); 
      setFormValues({
        firstName: "",
        lastName: "",
        companyName: "",
        region: "",
        address: "",
        city: "",
        province: "",
        zipCode: "",
        contact: "",
        email: "",
        additionalInfo: "",
        paymentMethod: "Online Payment",
      });
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Error creating order:", error); 
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <>
      <div>
        <Image
          src="/images/checkout.svg"
          alt="checkout"
          width={1440}
          height={316}
          className="w-full h-auto mt-20"
        />
      </div>
      <div className="container mx-auto px-4 lg:px-12 mt-16">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-10">
          <div className="w-full lg:w-[60%]">
            <h1 className="text-[36px] font-semibold mb-5">Billing details</h1>
            <form>
              {Object.keys(formValues).map((key) => {
                if (key === "paymentMethod") return null; 

                return (
                  <div key={key} className="mb-4">
                    <label className="block">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                      <input
                        type={key === "email" ? "email" : "text"}
                        name={key}
                        value={formValues[key as keyof typeof formValues]}
                        onChange={handleInputChange}
                        className="w-full border border-black rounded-md p-2 mt-1"
                      />
                    </label>
                    {formErrors[key as keyof typeof formErrors] && (
                      <p className="text-red-500">This field is required</p>
                    )}
                  </div>
                );
              })}

              
              <div className="mb-4">
                <label className="block font-semibold">Payment Method</label>
                <div className="flex gap-4 mt-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Online Payment"
                      checked={formValues.paymentMethod === "Online Payment"}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    Online Payment
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Cash on Delivery"
                      checked={formValues.paymentMethod === "Cash on Delivery"}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    Cash on Delivery
                  </label>
                </div>
                {formErrors.paymentMethod && (
                  <p className="text-red-500">Please select a payment method</p>
                )}
              </div>
            </form>
          </div>

          <div className="w-full lg:w-[35%]">
            <h2 className="text-[24px] font-semibold">Order Summary</h2>
            {cartItems.map((item) => (
              <div key={item._id} className="flex items-center gap-4 mt-4">
                {item.productImage && (
                  <Image
                    src={urlFor(item.productImage).url()}
                    alt={item.title}
                    width={50}
                    height={50}
                  />
                )}
                <p>
                  {item.title} x {item.inventoryCount}
                </p>
              </div>
            ))}
            <p className="font-semibold mt-4">
              Subtotal: Rs. {subTotal.toFixed(2)}
            </p>
            <p className="font-semibold">
              Total: Rs. {(subTotal - discount).toFixed(2)}
            </p>
            <button
              onClick={handlePlaceOrder}
              className="w-full mt-6 bg-black text-white py-2 rounded-md hover:bg-gray-800 hover:scale-105 transition-all duration-300"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOutPage;
