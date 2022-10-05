import { ListProductImage } from "./list_product_image";


export class List_Product {
    id: string;
  name: string;
  stock: number;
  price: number;
  createdDate: Date;
  updatedDate: Date;
  productImageFiles?: ListProductImage[];
  imagePath: string;
}
