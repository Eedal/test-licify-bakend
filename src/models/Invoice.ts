import { Schema, model } from "mongoose";
import itemSchema from "./Item";

const invoiceSchema = new Schema(
  {
    nit: {
      type: String,
      required: true,
      unique: true,
    },
    total: Number,
    totalIva: Number,
    items: {
      type: [itemSchema],
      required: true,
    },
    paid: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Invoice", invoiceSchema);
