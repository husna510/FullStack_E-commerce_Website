import { createClient } from '@sanity/client';
import axios from 'axios';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

// Load environment variables from .env.local
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

// Create Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2021-08-31',
});

async function uploadImageToSanity(imageUrl) {
  try {
    console.log(`Uploading image: ${imageUrl}`);
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data);
    const asset = await client.assets.upload('image', buffer, {
      filename: imageUrl.split('/').pop(),
    });
    console.log(`Image uploaded successfully: ${asset._id}`);
    return asset._id;
  } catch (error) {
    console.error('Failed to upload image:', imageUrl, error);
    return null;
  }
}

async function uploadProduct(product) {
  try {
    console.log(`Uploading product: ${product.title}`);

    const imageId = product.imageUrl ? await uploadImageToSanity(product.imageUrl) : null;

    const document = {
      _type: 'product',
      title: product.title,
      price: product.price,
      productImage: imageId
        ? {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: imageId,
            },
          }
        : undefined,
      tags: product.tags || [],
      discountPercentage: product.discountPercentage, // Fixed typo
      description: product.description,
      isNew: product.isNew,
    };

    const createdProduct = await client.create(document);
    console.log(`Product "${product.title}" uploaded successfully:`, createdProduct);
  } catch (error) {
    console.error(`Error uploading product "${product.title}":`, error);
  }
}

async function importProducts() {
  try {
    console.log('Fetching products...');
    const response = await axios.get('https://template6-six.vercel.app/api/products');
    if (response.status !== 200) {
      throw new Error(`Failed to fetch products: HTTP ${response.status}`);
    }
    const products = response.data;

    for (const product of products) {
      await uploadProduct(product);
    }

    console.log('All products uploaded successfully!');
  } catch (error) {
    console.error('Error during product import:', error);
  }
}

importProducts();
