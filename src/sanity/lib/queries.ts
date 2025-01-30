import { groq } from "next-sanity";

export const allProducts = groq`*[_type == "product"]`;
export const eight = groq`*[_type == "product"][0..7]`;
const query = `*[_type == "product" && slug.current == $slug][0]`;
