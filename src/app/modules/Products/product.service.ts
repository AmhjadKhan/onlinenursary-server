import mongoose from "mongoose";
import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const createProductIntoDB = async(product: TProduct) =>{
     const result = await Product.create(product)
     return result
}

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
  
  
  export const ProductServices = {
    createProductIntoDB,
    getAllProductsFromDB,
    getSingleProductFromDB,
    deleteProductFromDB
  };