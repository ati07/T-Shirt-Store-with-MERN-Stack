const { response } = require("express");
const category = require("../models/category");
const Category = require("../models/category")

// find the category BY ID
exports.getCategoryById = (req,res,next,id) =>{
    
    Category.findById(id).exec((err, cate) =>{
        if(err){
            return res.status(400).json({
                error: "Category not found in DB"
            })
        }
        req.category = cate;
    })  
  
    next();
};
// create Category
exports.createCategory = (req, res) =>{
    const category = new Category(req.body)
    // console.log("req:",req.body)
    category.save((err, category) =>{
        if(err){
            // console.log("error", err)
            return res.status(400).json({
                error:"Not saved to Database"
                
            })
        }
        res.json({ category });
    })
}

// get One category
exports.getCategory = (req, res) =>{

    console.log("req body",req.params, req.body)
    console.log("req cateId",req.params.categoryId, req.body)
    // console.log("res body",res.body)
    // console.log("res cate",json(req.category))
    category.findById(req.params.categoryId).then(response=>{
        console.log('response:',response.name)
        console.log('res',res.json(response))
        return res.json(response)
    }).catch(err=>console.log("err:",err))
    // return res.json(req.category)
}

// get All category
exports.getAllCategory = (req, res) =>{
    Category.find().exec((err, categories) =>{
        if(err){
            return res.status(400).json({
                error:" No Categories Found"
            })
        }
        res.json(categories)
    })
}

//Update Category

/*exports.updateCategory = (req, res) => {
    Category.findByIdAndUpdate(
      { _id: req.category._id },
      { $set: req. body },
      { new: true, useFindAndModify: false },
      (err, updatedcategory) => {
        if (err) {
          return res.status(400).json({
            error: "Not able top update category",
          });
        }
  
        return res.json(updatedcategory);
      }
    );
  };
  */
// update category
exports.updateCategory = (req,res) =>{
    const category = req.category;
    category.name = req.body.name;
    console.log("reqCate:",req);
    // console.log(category)
    // console.log("body:",req.body.name)
    category.save((err, updatedCategory) =>{
        if(err){
            return res.status(400).json({
                error:" Failed to update category"
            })
        }
        res.json(updatedCategory)
    })
    
}

// Delete Category

exports.removeCategory = (req, res) =>{
    const category = req.category;
    category.remove((err,category)=>{
        if(err){
            return res.status(400).json({
                error:"Failed to delete the category"
            })
        }
        res.json({
            message:"Successfully Deleted"
        })
    })
}