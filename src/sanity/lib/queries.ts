import { groq } from "next-sanity";

export const allProducts = groq`*[_type == "product"]`;
export const eight = groq`*[_type == "product"][0..7]`;
export const productQuery = groq`*[_type == "product" && slug.current == $slug][0]`;
