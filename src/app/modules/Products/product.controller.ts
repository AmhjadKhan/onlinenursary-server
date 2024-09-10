import { Request, Response } from "express";
import productValidationSchema from "./product.validation";
import { ProductServices } from "./product.service";
import { TProduct } from "./product.interface";

const createProduct = async (req: Request, res: Response) => {
  try {
    const product: TProduct = req.body;
    const zodParsedData = productValidationSchema.parse(product);
    const result = await ProductServices.createProductIntoDB(zodParsedData);
    res.status(200).json({
      success: true,
      massage: "product data product create create successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "something went wrong",
      error: err,
    });
  }
};

export const ProductControllers = {
    createProduct,
  };