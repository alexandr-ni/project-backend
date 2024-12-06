import { Schema, model } from "mongoose";
import Joi from "joi";

import { handleSaveError, preUpdate } from "./hooks.js";

const productSchema = new Schema(
  {
    price: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: [true, "name must be exist"],
    },
    description: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    whatsapp: {
      type: String,
      required: true,
    },
    viber: {
      type: String,
      required: true,
    },
    telegram: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

productSchema.post("save", handleSaveError);
productSchema.pre("findOneAndUpdate", preUpdate);
productSchema.post("findOneAndUpdate", handleSaveError);

export const productAddSchema = Joi.object({
  price: Joi.string().required(),
  name: Joi.string().required(),
  description: Joi.string().required(),
  phone: Joi.string().required(),
  whatsapp: Joi.string().required(),
  viber: Joi.string().required(),
  telegram: Joi.string().required(),
  image: Joi.object().required(),
});

export const productUpdateSchema = Joi.object({
  price: Joi.string(),
  name: Joi.string(),
  description: Joi.string(),
  phone: Joi.string(),
  whatsapp: Joi.string(),
  viber: Joi.string(),
  telegram: Joi.string(),
});

const Product = model("product", productSchema);

export default Product;
