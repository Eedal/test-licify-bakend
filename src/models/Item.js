import { Schema } from "mongoose";

const itemSchema = new Schema({
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
