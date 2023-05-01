import { Model, Schema, model } from "mongoose";
import itemSchema, { ItemI } from "../../models/item/Item";

export interface InvoiceI {
  nit: string;
  total: number;
  totalIva: number;
  items: ItemI[];
  paid: boolean;
}

const invoiceSchema = new Schema<InvoiceI>(
  {
    nit: String,
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

export const InvoiceModel: Model<InvoiceI> = model("Invoice", invoiceSchema);
