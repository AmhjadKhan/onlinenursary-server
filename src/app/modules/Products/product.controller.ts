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

// For get all products
const getAllProducts = async (req: Request, res: Response) => {
    try {
      const result = await ProductServices.getAllProductsFromDB();
      res.status(200).json({
        success: true,
        message: 'Products fetched successfully!',
        data: result,
      });
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: err.message || 'something went wrong',
        error: err,
      });
    }
  };
  
  // For Single Product
  const getSingleProduct = async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;
      const result = await ProductServices.getSingleProductFromDB(productId);
      res.status(200).json({
        success: true,
        message: 'Product fetched successfully!',
        data: result,
      });
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: err.message || 'something went wrong',
        error: err,
      });
    }
  };


  // Delete Single Product
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.deleteProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updateData = req.body;

    const result = await ProductServices.updateProductInDB(
      productId,
      updateData,
    );
    if (!result) {
      res.status(404).json({
        success: false,
        message: 'Product not found or invalid productId',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

const getCategoriesProducts = catchAsync(async (req, res) => {
  const result = await ProductServices.categoriesProductsInDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Products categories retrieved successfully',
    data: result,
  });
});

const updateStockForProducts = catchAsync(async (req, res) => {
  const result = await ProductServices.updateStockForProductsIntoDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Products categories retrieved successfully',
    data: result,
  });
});

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  getCategoriesProducts,
  updateStockForProducts,
  };