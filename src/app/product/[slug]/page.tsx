import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { groq } from "next-sanity";
import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";
import { Product } from "types/products";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

async function getProduct(slug: string): Promise<Product | null> {
  return client.fetch(
    groq`*[_type == "product" && slug.current == $slug][0]{
        _id,
        title,
        _type,
        productImage,
        price,
        discountPercentage,
        description,
        tags,
        inventoryCount
    }`,
    { slug }
  );
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  return (
    <div className="max-w-7xl mx-auto pt-[101px] px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="aspect-square">
          {product?.productImage ? (
            <Image
              src={urlFor(product.productImage).url()}
              alt={product?.title || "Product Image"}
              height={500}
              width={500}
              className="rounded-lg shadow-md"
            />
          ) : (
            <div className="w-full h-full bg-gray-300 flex items-center justify-center rounded-lg">
              <span className="text-gray-500 text-lg">Image not available</span>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-6">
          {/* Product Title */}
          <div className="flex items-center gap-4">
            <h1 className="text-4xl font-bold">
              {product?.title || "Untitled Product"}
            </h1>
            {product?.isNew && (
              <span className="px-3 py-1 bg-green-600 text-white text-sm font-medium rounded-full">
                New
              </span>
            )}
          </div>

          {/* Product Price and Discount */}
          <div className="text-2xl font-semibold text-gray-800">
            {product?.discountPercentage && product?.discountPercentage > 0 ? (
              <div className="flex items-center gap-4">
                <span className="text-[#B88E2F]">
                  $
                  {product?.price
                    ? (
                        product.price *
                        (1 - product.discountPercentage / 100)
                      ).toFixed(2)
                    : "0.00"}
                </span>
                <span className="text-gray-500 line-through">
                  ${product?.price?.toFixed(2) || "0.00"}
                </span>
                <span className="text-green-600 text-sm font-medium">
                  {product?.discountPercentage}% OFF
                </span>
              </div>
            ) : (
              <span>${product?.price?.toFixed(2) || "0.00"}</span>
            )}
          </div>

          {/* Product Description */}
          {product?.description && (
            <div>
              <h2 className="text-lg text-justify font-semibold text-gray-700">
                Description
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>
          )}

          {/* Tags */}
          {product?.tags && product.tags.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Add to Cart Button */}
          <button className="flex items-center justify-center bg-[#B88E2F] text-white py-3 px-6 rounded-md text-lg font-semibold hover:bg-[#9e7d24] transition-colors duration-300 transform hover:scale-105">
            <FaShoppingCart className="mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
