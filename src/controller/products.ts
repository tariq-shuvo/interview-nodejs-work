import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';
import ProductModel from '../models/schema/Product';
import ProductDoc from '../models/types/product';
import { ProductsType } from './types/productsType';

export const createProduct:RequestHandler = async (req, res, next) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
        return res.status(400).json({
            errors: error.array()
        })
    }

    const title = (req.body as {title:string}).title;
    const price = (req.body as {price:number}).price;
    const status = (req.body as {status:boolean}).status;
    const description = (req.body as {description:string}).description;
    let newProduct: ProductDoc;

    try {
        newProduct = await ProductModel.create(new ProductsType(title, price, status, description));
    } catch (error:any) {
        throw new Error(error);
    }

    return res.status(201).json({
        success: true,
        message: 'product is created.',
        data: newProduct
    })
}

export const getProducts:RequestHandler = async (req, res, next) => {
    let products:object[];

    try {
        products = await ProductModel.find({});
    } catch (error:any) {
        throw new Error(error);
    }
    return res.status(200).json({
        data: products
    })
}

export const getProductInfo:RequestHandler<{id: string}> = async (req, res, next) => {
    const id = req.params.id;
    let product:object|null;

    try {
        product = await ProductModel.findById(id);
    } catch (error:any) {
        throw new Error(error);
    }
    return res.status(200).json({
        data: product
    })
}

export const updateProduct:RequestHandler<{id: string}> = async (req, res, next) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
        return res.status(400).json({
            errors: error.array()
        })
    }

    const id = req.params.id;
    const title = (req.body as {title:string}).title.toLowerCase();
    const price = (req.body as {price:number}).price;
    const status = (req.body as {status:boolean}).status;
    const description = (req.body as {description:string}).description.toLowerCase();

    let productInfo: ProductDoc | null;

    try {
        productInfo = await ProductModel.findById(id);

        if(!productInfo){
            return res.status(400).json({
                errors: {
                    value: id,
                    msg: "could not find product",
                    param: "id",
                    location: "params"
                }
            })
        }

        productInfo.title = title;
        productInfo.price = price;
        productInfo.status = status;
        productInfo.description = description;
        // @ts-ignore
        productInfo.update = Date.now();

        await productInfo.save();
    } catch (error:any) {
        // throw new Error(error)
        return res.status(400).json({
            errors: {
                value: id,
                msg: "could not find product",
                param: "id",
                location: "params"
            }
        })
    }

    return res.status(201).json({
        success: true,
        message: 'product is updated successfully.',
        data: productInfo
    })
}

export const deleteProduct:RequestHandler<{id: string}> = async (req, res, next) => {
    const id = req.params.id;

    let productInfo: ProductDoc | null;

    try {
        productInfo = await ProductModel.findById(id);

        if(!productInfo){
            return res.status(400).json({
                errors: {
                    value: id,
                    msg: "could not find product",
                    param: "id",
                    location: "params"
                }
            })
        }

        await productInfo.delete()
    } catch (error:any) {
        // throw new Error(error)
        return res.status(400).json({
            errors: {
                value: id,
                msg: "could not find product",
                param: "id",
                location: "params"
            }
        })
    }

    return res.status(200).json({
        success: true,
        message: 'product is deleted successfully',
        data: productInfo
    })
}

export const deleteProductBatch:RequestHandler = async (req, res, next) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
        return res.status(400).json({
            errors: error.array()
        })
    }

    const { productBatchIds } = req.body;

    let products:object[];

    try {
        await ProductModel.deleteMany({
            $or:productBatchIds
        });
        products = await ProductModel.find({});
    } catch (error:any) {
        throw new Error(error)
    }

    return res.status(200).json({
        success: true,
        message: 'product batch is deleted successfully',
        data: products 
    })
}