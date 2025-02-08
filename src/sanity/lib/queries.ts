import { groq } from "next-sanity";

export const allProducts = groq`*[_type == "product"]`;

export const eight = groq`*[_type == "product"][0..7]`;

export const filteredProductsQuery = (filters: {
  tag: string;
  priceRange: number;
  discountOnly: boolean;
  newProductOnly: boolean;
}) => {
  return groq`
    *[_type == "product"
      ${filters.tag ? `&& "${filters.tag}" in tags` : ""}
      ${filters.priceRange > 0 ? `&& price <= ${filters.priceRange}` : ""}
      ${filters.discountOnly ? `&& discountPercentage > 0` : ""}
      ${filters.newProductOnly ? `&& isNew == true` : ""}
    ]{_id, title, description, tags, price, productImage, slug, isNew, discountPercentage}
  `;
};

export const productQuery = groq`*[_type == "product" && slug.current == $slug][0]`;

export const searchWithinFilteredQuery = (
  filteredProductIds: string[],
  searchTerm: string
) => {
  return groq`
    *[_type == "product" && _id in [${filteredProductIds.map((id) => `"${id}"`).join(",")}] 
      && (title match "*${searchTerm}*" || description match "*${searchTerm}*" || "${searchTerm}" in tags)
    ]
  `;
};

export const searchProductsQuery = (searchTerm: string) => {
  if (!searchTerm) return "";

  return groq`
    *[_type == "product" && (
      title match "*${searchTerm}*" || 
      description match "*${searchTerm}*" || 
      "${searchTerm}" in tags
    )] {
      _id, title, description, tags, price, productImage, slug, isNew, discountPercentage
    }
  `;
};
