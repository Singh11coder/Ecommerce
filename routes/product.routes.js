import express from "express";
import upload from "../config/multer.js";
import {createProduct} from "../controllers/product.controller.js";
const router = express.Router();

router.post("/create",upload.array("images",5),createProduct)
router.patch("/update/:id",updateProduct)
router.delete("/delete/:id",deleteProduct)
router.get("/all",getAllProduct)
router.get("/detail/:id",productDetail)
router.get("/search",searchProduct)

export default router;