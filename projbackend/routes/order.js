const express = require("express")
const router = express.Router()

const {getUserById, getUser,showUsers,updateUser,userPurchaseList,pushOrderInPurchageList} = require('../controllers/user')
const {isSignedIn,isAuthenticated,isAdmin} = require('../controllers/auth')
const {updateStock} = require("../controllers/product")
const {getOrderById,createOrder,getAllOrder,updateStatus,getOrderStatus} = require("../controllers/order")


// param 
router.param("userId", getUserById)
router.param("orderId", getOrderById)

//create order
router.post("/order/create/:userId",isSignedIn,isAuthenticated,pushOrderInPurchageList,updateStock,createOrder)
// read
router.get("/order/all/:userId",isSignedIn, isAuthenticated, isAdmin, getAllOrder)


// status of order
router.get("/order/status/:userId",isSignedIn,isAuthenticated,isAdmin,getOrderStatus)
router.put("/order/:orderId/status/:userId",isSignedIn,isAuthenticated,isAdmin,updateStatus )


module.exports = router