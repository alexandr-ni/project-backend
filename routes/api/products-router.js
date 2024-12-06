import express from "express";

import productsController from "../../controllers/products-controller.js";

import { isEmptyBody, isValidId, upload } from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";

import { productAddSchema, productUpdateSchema } from "../../models/Product.js";

const router = express.Router();

router.get("/", productsController.getAll);

router.get("/:id", isValidId, productsController.getById);

router.post(
  "/",
  upload.array("image", 5),
  isEmptyBody,
  validateBody(productAddSchema),
  productsController.add
);

router.put(
  "/:id",
  isValidId,
  isEmptyBody,
  validateBody(productUpdateSchema),
  productsController.updateById
);

router.delete("/:id", isValidId, productsController.deleteById);

export default router;
