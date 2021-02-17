var express = require('express')
var router = express.Router()
const {signout,signup, signin, isSignedIn,showUsers} = require("../controllers/auth")
const { body, validationResult } = require('express-validator');

router.post("/signup",[
    body("name", "Lenght of name should be minimum 5 char").isLength({ min: 5 }),
    body("email", "Email is required").isEmail(),
    body("password", "Lenght of passwrod should be minimum 3 char").isLength({ min: 3 })
], signup);

router.post("/signin",[
    body("email", "Lenght of email should be minimum 5 char").isLength({ min: 5 }),
    body("password", "Passwrod should at least 3 char").isLength({ min: 3 })
], signin);


router.get('/signout', signout);

router.get("/testroute",isSignedIn, (req, res)=>{
    res.json(req.auth)
})

module.exports = router




