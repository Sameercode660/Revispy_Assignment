import { faker } from "@faker-js/faker";

// Define the Product interface
interface Product {
  id: string;
  name: string;
}

// Function to generate an array of fake products
export const generateFakeProducts = (count: number): Product[] => {
  const products: Product[] = [];
  for (let i = 0; i < count; i++) {
    products.push({
      id: faker.string.uuid(), // Generate a UUID
      name: faker.commerce.productName(), // Generate a product name
    });
  }
  return products;
};


