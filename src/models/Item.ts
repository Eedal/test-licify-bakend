import { Schema } from "mongoose";

export interface ItemI {
  name: string;
  value: number;
  iva: number;
}

const itemSchema = new Schema<ItemI>({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  iva: {
    type: Number,
    required: true,
  },
});

export default itemSchema;
