import fs from "fs/promises";
import path from "path";

import Product from "../models/Product.js";

import { ctrlWrapper } from "../decorators/index.js";
import { HttpError } from "../helpers/index.js";

const imagesPath = path.resolve("public", "images");

const getAll = async (req, res) => {
  const result = await Product.find();
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const result = await Product.findById(id);
  if (!result) {
    throw HttpError(404, `Product with id=${id} not found`);
  }

  res.json(result);
};

const add = async (req, res) => {
  function addImage(obj) {
    const imagesArr = obj.map(async ({ path: oldPath, filename }) => {
      const newPath = path.join(imagesPath, filename);
      await fs.rename(oldPath, newPath);

      const images = path.join("images", filename);

      return images;
    });

    return imagesArr;
  }

  Promise.all(addImage(req.files)).then(async function (results) {
    const result = await Product.create({ ...req.body, image: `${results}` });
    res.status(201).json(result);
  });
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await Product.findByIdAndUpdate(id, req.body);
  if (!result) {
    throw HttpError(404, `Product with id=${id} not found`);
  }

  res.json(result);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await Product.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, `Product with id=${id} not found`);
  }

  res.json({
    message: "Delete success",
  });
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
