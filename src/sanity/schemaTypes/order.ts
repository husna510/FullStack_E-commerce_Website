const orderSchema = {
    name: "order",
    type: "document",
    title: "Order",
    fields: [
      {
        name: "firstName",
        title: "First Name",
        type: "string",
      },
      {
        name: "lastName",
        title: "Last Name",
        type: "string",
      },
      {
        name: "companyName",
        title: "Company Name",
        type: "string",
      },
      {
        name: "region",
        title: "Country / Region",
        type: "string",
      },
      {
        name: "address",
        title: "Street Address",
        type: "string",
      },
      {
        name: "city",
        title: "Town / City",
        type: "string",
      },
      {
        name: "province",
        title: "Province",
        type: "string",
      },
      {
        name: "zipCode",
        title: "ZIP Code",
        type: "string",
      },
      {
        name: "contact",
        title: "Phone",
        type: "string",
      },
      {
        name: "email",
        title: "Email Address",
        type: "string",
      },
      {
        name: "additionalInfo",
        title: "Additional Information",
        type: "text",
      },
      {
        name: "cartItems",
        title: "Cart Items",
        type: "array",
        of: [
          {
            type: "reference",
            to: [{ type: "product" }], 
          },
        ],
      },
      {
        name: "subTotal",
        title: "Subtotal",
        type: "number",
      },
      {
        name: "discount",
        title: "Discount",
        type: "number",
      },
      {
        name: "total",
        title: "Total Amount",
        type: "number",
      },
      {
        name: "paymentMethod",
        title: "Payment Method",
        type: "string",
        options: {
          list: [
            { title: "Direct Bank Transfer", value: "bank_transfer" },
            { title: "Cash On Delivery", value: "cash_on_delivery" },
          ],
        },
      },
      {
        name: "orderStatus",
        title: "Order Status",
        type: "string",
        options: {
          list: [
            { title: "Pending", value: "pending" },
            { title: "Processing", value: "processing" },
            { title: "Completed", value: "completed" },
            { title: "Cancelled", value: "cancelled" },
          ],
          layout: "radio",
        },
        initialValue: "pending",
      },
      {
        name: "createdAt",
        title: "Order Date",
        type: "datetime",
      },
    ],
  };
  
  export default orderSchema;
  