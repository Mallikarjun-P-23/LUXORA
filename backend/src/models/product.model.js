import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    productDescription:{
        type:String,
        required:true
    },
    productPrice:{
        type:Number,
        required:true
    },
    productImage:{
        type:String,
        required:true
    }

},
{
    timestamps:true
})

export const Product = mongoose.model('Product', ProductSchema);