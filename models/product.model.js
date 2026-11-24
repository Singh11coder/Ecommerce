
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 1, // Amount in paise
    },

    discountedPrice: {
      type: Number,
      min: 1,
      default: null,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    images: {
      type: [String],
      default: [],
    },

    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    sku: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

productSchema.pre("validate", function () {
  if (
    this.discountedPrice != null &&
    this.discountedPrice > this.price
  ) {
    this.invalidate(
      "discountedPrice",
      "Discounted price cannot exceed original price"
    );
  }
});

const Product = mongoose.model("product", productSchema);

export default Product;
