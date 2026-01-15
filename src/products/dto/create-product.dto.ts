export class CreateProductDto {
  name: string;
  images?: string[];
  quantity: number;
  price: number;
  category?: string;
}
