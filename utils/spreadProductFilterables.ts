import { FilteredProducts, Product } from "@/types/product";

export const spreadProductFilterables = (products: Product[]): FilteredProducts => {
  return products.map((product) => {
    const { filterable, ...rest } = product;
    return {
      ...rest,
      ...filterable,
    };
  });
}