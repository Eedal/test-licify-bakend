import { Schema } from "mongoose";

export interface ItemI {
  name: string;
  quantity: number;
  price: number;
  iva: number;
  total: number;
}

const itemSchema = new Schema<ItemI>({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  iva: {
    type: Number,
    required: true,
  },
  total: Number,
});

export default itemSchema;
