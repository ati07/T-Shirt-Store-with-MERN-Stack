const User =require('../models/user')
const Order = require('../models/order');
// const order = require('../models/order');

exports.getUserById = (req, res, next, id) =>{
    User.findById(id).exec((err, user) =>{
        if(err || !user){
            return res.status(400).json({
                error: "No user was found in DB"
            })
        }
        req.profile = user
        next();
    })
};

exports.getUser = (req, res) =>{
    //TODO: get back for password
    req.profile.salt = undefined
    req.profile.encry_password = undefined
    return res.json(req.profile)
}

// Find all Users from Database
exports.showUsers = (req, res) =>{
    User.find().exec((err, users)=>{
        if(err || !users){
            return res.status(400).json({
                error: "No Users found"
            });
        }
        res.json(users);
    })
}

//Update data of user

exports.updateUser = (req, res)=>{
    User.findByIdAndUpdate(
        {_id: req.profile._id},
        {$set: req.body},
        {new: true, useFindAndModify:false},
        (err, user) =>{
            if(err){
                return res.status(400).json({
                    error: "You are not authorised to update the use"
                })
            }
            user.encry_password = undefined;
            user.salt = undefined;
            res.json(user)
        }
    )
} 

// purchase order

exports.userPurchaseList = (req, res) =>{
    Order.find({user: req.profile._id})
    .populate("user", "_id name")
    .exec((err, order) =>{
        if(err){
            return res.status(400).json({
                err: "NO order is this account"
            })
        }
        res.json(order)
    })
}

// put order in purchaseLIst as middleware

exports.pushOrderInPurchageList = (req, res, next) =>{

    let purchases = []
    req.body.order.products.forEach(product => {
        purchases.push({
            _id: product._id,
            name: product.name,
            description: product.description,
            category: product.category,
            quantity: product.quantity,
            amount: req.body.order.amount,
            trasaction_id: req.body.order.trasaction_id
        })
    });
    // store in DB
    User.findOneAndUpdate(
        {_id: req.profile._id},
        {$push: {purchases: purchases}},
        {new: true},
        (err, purchases) =>{
            if(err){
                return res.status(400).json({
                    error:"Unable to save purchase list"
                })
            }
            next();
        }
    )
    
}