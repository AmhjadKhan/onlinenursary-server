import mongoose from "mongoose";
import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const createProductIntoDB = async (product: TProduct) => {
  const result = await Product.create(product);
  return result;
};

// get all product
const getAllProductsFromDB = async () => {
  const result = await Product.find();
  return result;
};

const getSingleProductFromDB = async (productId: string) => {
  const result = await Product.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(productId) },
    },
  ]);
  return result;
};

//   delete product
const deleteProductFromDB = async (id: string) => {
  const result = await Product.deleteOne({
    _id: new mongoose.Types.ObjectId(id),
  });
  return result;
};

// For updating single one product
const updateProductInDB = async (
  productId: string,
  updateData: Partial<TProduct>
) => {
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new Error("Invalid productId");
  }

  const objectId = new mongoose.Types.ObjectId(productId);

  // Check if the document exists before updating
  const existingProduct = await Product.findById(objectId);
  if (!existingProduct) {
    return null;
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    new mongoose.Types.ObjectId(productId),
    { $set: updateData },
    { new: true, runValidators: true }
  );
  return updatedProduct;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  deleteProductFromDB,
  updateProductInDB
};
