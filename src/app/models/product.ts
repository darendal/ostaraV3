export class Product {
  id: string;
  name: string;
  price: number;
  url: string;
  image: string;
  description?: string;
  dimensions?: ProductDimensions;

  public constructor(init?: Partial<Product>) {
    Object.assign(this, init);
  }
}

export interface ProductDimensions {
  weight: number;
  height?: number;
  length?: number;
  width?: number;
}
