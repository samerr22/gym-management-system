import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  CurrentuserId: {
    type: String,
    required: true,
  },

  ItemsN: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
  
  },
  quantity: {
    type: Number,
    required: true,
  },
  image: {
    type: [String],
    required: true,
  },
});

const Cart = mongoose.model("Cart", CartSchema);

export default Cart;
