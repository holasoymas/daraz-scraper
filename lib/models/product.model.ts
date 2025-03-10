import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  url: { type: String, required: true, unique: true },
  image: { type: String, required: true, unique: true },
  productTitle: { type: String, required: true },
  currentPrice: { type: Number, required: true },
  originalPrice: { type: Number, required: true },
  priceHistory: [
    {
      price: { type: Number, required: true },
      date: { type: Date, default: Date.now },
    }
  ],
  lowestPrice: { type: Number, required: true },
  highestPrice: { type: Number, required: true },
  discountRate: { type: String },
  currency: { type: String, required: true },
  users: [
    { email: { type: String, required: true } }
  ], default: [],
}, { timestamps: true })

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
