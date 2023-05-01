import { ItemI } from "models/item/Item";

export class Invoice {
  _id?: string;
  nit!: string;
  total!: number;
  totalIva!: number;
  items!: ItemI[];
  paid!: boolean;
  createdAt!: string;
  updatedAt!: string;
}
