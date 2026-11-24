import express from "express";
const router = express.Router();

router.post("/create",createProduct)
router.patch("/update/:id",updateProduct)
router.delete("/delete/:id",deleteProduct)
router.get("/all",getAllProduct)
router.get("/detail/:id",productDetail)
router.get("/search",searchProduct)

export default router;