import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
    itemName: { type: String, required: true },
    itemId: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    quantity: { type: Number, required: true },
});

const cartSchema = new mongoose.Schema({
    userId:{type:String,required:true},
    userEmail:{type:String,required:true},
    cartData:{type:[cartItemSchema],default:[]}
}, {minimize:false})

const cartModel = mongoose.model.carts || mongoose.model("carts",cartSchema);
export default cartModel;