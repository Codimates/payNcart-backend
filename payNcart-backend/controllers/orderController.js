import orderModel from "../models/orderModel.js";
import Stripe from "stripe";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


//place order
const placeOrder = async (req,res) => {

    const frontend_url = "http://localhost:3000";
    const { userId, items, amount, address } = req.body;

    try {
        const newOrder = new orderModel({
            userId:userId,
            items:items,
            amount:amount,
            address:address
        })
        await newOrder.save();

        console.log(items);
        
        const line_items = items.map((item)=>{
            if(!item.itemName || !item.price || !item.quantity){
                throw new Error("Some details are missing");
            }
            
            return {
                price_data:{
                    currency:"usd",
                    product_data:{
                        name:item.itemName
                    },
                    unit_amount:item.price*100
                },
                quantity:item.quantity
        }})

        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:'payment',
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        })

        res.json({success:true,session_url:session.url})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error"})
        
    }
}
// for admin, 
const verifyOrder = async (req,res) => {
    const {orderId,success} = req.body;
    try {
        if (success=="true") {
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true,message:"Paid"});
        }
        else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false,message:"Unpaid"});
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error"});
        
        
    }
}
// orders for users
const userOrders = async (req,res) => {
    const { userId } = req.body;
    try {
        const orders = await orderModel.find({userId:userId});
        res.json({success:true,data:orders});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error"});
        
    }
}

// orders for admins
const listOrders = async (req,res) => {
    try {
        const orders = await orderModel.find({});
        res.json({success:true,data:orders});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error"})
        
        
    }
}
//updating the status
const updateStatus = async (req,res) => {
    const { orderId,status } = req.body;
    try {
        await orderModel.findByIdAndUpdate(orderId,{status:status});
    res.json({succeess:true,message:"Status updated successfully"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error"});
    }
}

export {placeOrder, verifyOrder,userOrders,listOrders,updateStatus}