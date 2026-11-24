import {Product} from "../models/index.js";

export const getAllProducts = async(req,res) => {
     try{
       const {page, limit, sort,} = req.query;

       const sortOptions = {
         latest:{createdAt:-1},
         oldest:{ createdAt:1},
         priceLow:{price:1},
         priceHigh:{price:-1}
       }

       const currentPage = Math.max(1,Number(page) || 1);
       const currentLimit = Math.max(20,Number(limit));
       const currentSort = sortOptions[sort] || sortOptions.latest;
       const currentSkip = (currentPage > 1) ? (currentPage-1)*(currentLimit) :0; 
       
       const resultProducts = await Product.find()
                              .limit(currentLimit)
                              .skip(currentSkip)
                              .sort(currentSort);


       res.status(200).json({
          success:true,
          messsage:"Products Fetched Successfully",
          currentPage,
          currentLimit,
          resultProducts
       })
       
     }
     catch(error){
        console.log("Error in Fetching the Products");
        res.status(500).json({
           success:false,
           message:"Error in Fetching the Products",
           error:error.message
        })
     }
}

export const getProductDetail = async(req,res) => {
    try{
      const {id} = req.params;
      const product = await Product.findById(id);
      if(!product){
         return res.status(404).json({
            success:false,
            message:"Product not Found"
         })
      }

      return res.status(200).json({
         success:true,
         message:"Product Detail",
         product
      })

    }
    catch(error){
      return res.status(500).json({
         success:false,
         message:"Error in Fetch Detail of Product",
         error:error.message
      })
    }
}

export const createProduct = async(req,res) => {
    try{
      const {
         name, 
         description,
         price, 
         discountedPrice, 
         category,
         images, 
         stock,
         sku,
         isActive
      } = req.body;

      if(!name || !price || !sku)
    }
    catch(error){
       return res.status(500).json({
          success:false,
          message:"Error in Creating Order",
          error:error.message
       })
    }
}