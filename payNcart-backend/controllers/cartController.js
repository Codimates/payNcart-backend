import cartModel from "../models/cartModel.js";

// add to cart
const addToCart = async (req, res) => {
  const { userId, itemId, userEmail, itemName, price, image } = req.body;
  try {    
    let cart = await cartModel.findOne({ userId });
    if (!cart) {
      cart = new cartModel({
        userId: userId,
        userEmail: userEmail,
        cartData: [{ itemName, itemId, price, image, quantity: 1 }],
      });
    } else {
      const itemIndex = cart.cartData.findIndex(
        (item) => item.itemId === itemId
      );

      if (itemIndex === -1) {
        cart.cartData.push({ itemName, itemId, price, image, quantity: 1 });
      } else {
        cart.cartData[itemIndex].quantity += 1;
      }
    }
    await cart.save();
    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error while adding to cart" });
  }
};
// remove to cart
const removeFromCart = async (req, res) => {
  const { userId, itemId } = req.body;
  try {
    let cart = await cartModel.findOne({ userId });
    const cartItem = cart.cartData.find((item) => item.itemId === itemId);

    if (cartItem.quantity === 1) {
      cart.cartData = cart.cartData.filter((item) => item.itemId != itemId);
    } else {
      cartItem.quantity -= 1;
    }
    await cart.save();
    res.json({ success: true, message: "Removed from the cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error while removinf from cart" });
  }
};
// fetch from cart
const fetchCart = async (req, res) => {
  const { userId } = req.body;
  try {
    let cart = await cartModel.findOne({ userId });
    let cartData = await cart.cartData;
    res.json({ success: true, cartData,cart });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};

export { addToCart, removeFromCart, fetchCart };
