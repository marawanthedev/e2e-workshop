export type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  image_url: string;
};

export type NewProduct = Omit<Product, "id">;
