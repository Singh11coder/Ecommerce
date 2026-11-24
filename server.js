import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import ProductRoutes from "./routes/product.routes.js";
const app = express();
dotenv.config();




app.use("/product",ProductRoutes);


const port = process.env.PORT;

app.listen(port, () => {
    console.log("server started at Port: ",port);
})