import { Document } from "mongoose";

interface Product {
    title: string,
    price: number,
    status: boolean,
    description?: string,
};

interface ProductDoc extends Document, Product {};

export default ProductDoc;