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


       res.status(201).json({
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

      return res.status(201).json({
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

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountedPrice,
      category,
      stock,
      sku,
      isActive
    } = req.body;

    // 1. Handle images
    const images = req.files?.map((file) => {
      return `/uploads/${file.filename}`;
    }) || [];

    // 2. Required field validation
    if (
      !name?.trim() ||
      !description?.trim() ||
      price === undefined ||
      !sku?.trim() ||
      !category?.trim() ||
      stock === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Mandatory fields are missing"
      });
    }

    // 3. Numeric validation
    const productPrice = Number(price);
    const productStock = Number(stock);

    if (
      !Number.isFinite(productPrice) ||
      productPrice <= 0 ||
      !Number.isInteger(productStock) ||
      productStock < 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid price or stock"
      });
    }

    // 4. Image validation
    if (images.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one image is required"
      });
    }

    // 5. Discount validation
    const finalDiscountedPrice =
      discountedPrice === undefined || discountedPrice === ""
        ? undefined
        : Number(discountedPrice);

    if (
      finalDiscountedPrice !== undefined &&
      (
        !Number.isFinite(finalDiscountedPrice) ||
        finalDiscountedPrice <= 0 ||
        finalDiscountedPrice > productPrice
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid discounted price"
      });
    }

    // 6. Check duplicate SKU
    const existSKU = await Product.findOne({
      sku: sku.trim()
    });

    if (existSKU) {
      return res.status(409).json({
        success: false,
        message: "SKU already exists. Provide a unique SKU."
      });
    }

    // 7. Create product
    const productCreated = await Product.create({
      name: name.trim(),
      description: description.trim(),
      price: productPrice,
      discountedPrice: finalDiscountedPrice,
      category: category.trim(),
      images,
      stock: productStock,
      sku: sku.trim(),
      isActive: isActive === undefined
        ? true
        : isActive === "true" || isActive === true
    });

    // 8. Response
    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: productCreated
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "SKU already exists"
      });
    }

    return res.status(500).json({
      success: false,
      message: "Error in creating product",
      error: error.message
    });
  }
}

export const updateProduct = async(req,res) => {
    try{
       const {id} = req.params;
       const { 
        name,
        description,
        price,
        discountedPrice,
        category,
        stock,
        sku,
        isActive } = req.body;

        const images = req.files?.map((file) => {
            return `/uploads/${file.filename}`;
        })

       const productExist = await Product.findById(id);
       if(!productExist){
          return res.status(400).json({
             success:false,
             message:"Product Does not Exist"
          })
       }
       
       const updatedProduct = await Product.findOneAndUpdate({_id:id},{
          name:name?name:productExist.name,
          description: description ? description : productExist.description,
          price: price ? price : productExist.price,
          discountedPrice : discountedPrice ? discountedPrice : productExist.discountedPrice,
          category: category ? category : productExist.category,
          images : images ? images : productExist.images,
          stock : stock ? stock : productExist.stock,
          sku : sku ? sku  : productExist.sku,
          isActive : isActive ? isActive : productExist.isActive
       })
       
    }
    catch(error){
       return res.status(500).json({
           success:false,
           message:"Error in updating the Product",
           error:error.message
       })
    }
}
