import Mongoose, { Schema } from "mongoose"
import ProductDoc from "../types/product"

const productSchema: Schema = new Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    price:{
        type: Number,
        required: true,
    },
    satus:{
        type: Boolean,
        default: true,
    },
    description:{
        type: String
    },
})

const ProductModel = Mongoose.model<ProductDoc>('product', productSchema)

export default ProductModel