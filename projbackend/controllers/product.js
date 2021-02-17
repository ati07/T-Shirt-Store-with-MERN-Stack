const Product = require("../models/product")
const formidable = require("formidable")
const _ = require("lodash")
const fs = require("fs")
const { parse } = require("path")
const { sortBy } = require("lodash")
const category = require("../models/category")


exports.getProductById = (req, res, next, id) =>{
    Product.findById(id)
    .populate("category")
    .exec((err, product) =>{
        if(err){
            return res.status(400).json({
                error:"Product not found"
            })
        }
        req.product = product
        next();

    })
}


exports.createProduct = (req,res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    console.log("request body:", req.body)
    form.parse(req, (err, fields, file) =>{
        if(err){
            return res.status(400).json({
                error: "Problem with image"
            })
        }
        // destructure the fields
        const {name,description,price, category, stock} = fields
        //TODO restriction on field
        if(
            !name ||
            !description ||
            !category ||
            !stock
        ){
            return res.status(400).json({
                error:"Please include all fields"
            })       
         }
        
        let product = new Product(fields)

        //handle file here
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error: "File is too big"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }

        console.log(product)
        //save to the DB
        product.save((err, product) =>{
            console.log(err)
            if(err){
                return res.status(400).json({
                    error:"Saving tshirt is failed"
                })
            }
            res.json(product)
        })

    })
}

//get single product

exports.getProduct = (req, res) =>{
    req.product.photo = undefined
    // console.log("rspose", res);
    console.log('gyugft6ftygvhujf8ytguiguygy58995415915894589159189', req.product);

    return res.json(req.product)
}

exports.photo = (req, res,next) =>{
    if(req.product.photo.data){
        res.set("Content-Type", req.product.contentType)
        return res.send(req.product.photo.data)
    }
    next()
}


// remove product
exports.deleteProduct = (req, res)=>{
    let product = req.product;
    product.remove((err, deletedProduct)=>{
        if(err){
            return res.status(400).json({
             error:"Failed to delete the product"
            })
        }
        res.json({
            message:"Deletion was a successfull",
            deletedProduct
        })
    })
}


// update product
exports.updateProduct = (req, res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) =>{
        if(err){
            return res.status(400).json({
                error: "Problem with image"
            })
        }
        // destructure the fields
        const {name,description,price, category, stock} = fields
        //TODO restriction on field
        // if(
        //     !name ||
        //     !description ||
        //     !category ||
        //     !stock
        // ){
        //     return res.status(400).json({
        //         error:"Please include all fields"
        //     })       
        //  }

        // updation code
        let product = req.product
        product = _.extend(product, fields)

        //handle file here
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error: "File is too big"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }

        // console.log(product)
        //save to the DB
        product.save((err, product) =>{
            console.log(err)
            if(err){
                return res.status(400).json({
                    error:"Updation of product failed"
                })
            }
            res.json(product)
        })

    })
    
}

// product listing
exports.getAllProducts = (req, res)=>{
    let limit = req.query.limit ? parseInt(req.query.limit) : 8;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products)=>{
        if(err){
            return res.status(400).json({
                error:"No Product Found"
            })
        }
        res.json(products)
    })
}

// get unique Catgory
exports.getAllUniqueCategory = (erq, res) =>{
    Product.distinct("category", {},(err, category) =>{
        if(err){
            return res.status(400).json({
                error: "No category found"
            })
        }
        res.json(category)
    })
}

// updateStock

exports.updateStock = (req, res, next) =>{
    letmyOperations = req.body.order.products.map(prod =>{
        return {
            updateOne:{
                filter: {_id: prod.id},
                update: {$inc: {stock: -prod.count, sold: +prod.count}}
            }
        }
    })

    Product.bulkWrite(myOperations,{},(err, products) =>{
        if(err){
            return res.statusd(400).json({
                error:"Bulk Operatoon Failed"
            })
        }
        next();
    })
}