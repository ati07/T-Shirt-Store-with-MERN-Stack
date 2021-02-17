const { Order, ProductCart } = require("../models/order")


exports.getOrderById = (req, res, next, id) =>{
    Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, order) =>{
        if(err){
            return res.status(400).json({
                error: "No order found in DB"
            })
        }
        req.order = order
        next();
    })
}


// create order
exports.createOrder = (req, res) =>{
    req.body.order.user = req.profile;
    const order = new Order(req.body.order)
    order.save((err, order) =>{
        if(err){
            return res.status(400).json({
                error:"Failed to save your order in DB"
            })
        }
        res.json(order)
    })
}

// get all Order
exports.getAllOrder = (req, res) =>{
    Order.find()
    .populate("user", "_id name")
    .exec((err, order) =>{
        if(err){
            return res.status(400).json({
                error:"No Order found in DB"
            })
        }

        res.json(order)
    })
}

// updateStatus,getOrderStatus

// getOrder status
exports.getOrderStatus = (req, res) =>{
    res.json(Order.schema.path("Status").enumCValues)
}

// update Status

exports.updateStatus = (req, res) =>{
    Order.update(
        {_id: req.body.ordeerId},
        { $set: { status: req.body.status}},
        (err, order) =>{
            if(err){
                return res.status(400).json({
                    error:"Can't update order status"
                })
            }
            res.json(order)
        }

    )
}