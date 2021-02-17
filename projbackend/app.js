require('dotenv').config()

const express = require("express")
const app  = express();
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose');

//Routes
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user");
// const { showUsers } = require('./controllers/auth');
const categoryRoutes = require("./routes/category")
const productRoutes = require("./routes/product")
const orderRoutes = require("./routes/order")
const stripeRoutes = require("./routes/stripepayments")


// DB Connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true
}).then(() =>{
    console.log("Database is Connected")
})
.catch(()=>{
    console.log("Database is not connected")
});


//Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


//My Routes
app.use('/api', authRoutes)
app.use('/api', userRoutes)
app.use('/api', categoryRoutes)
app.use('/api', productRoutes)
app.use('/api', orderRoutes)
app.use('/api', stripeRoutes)
// app.use('/api', showUsers)

//Port
const port  = process.env.PORT || 8000;

app.listen(port,()=>{
    console.log(`Server is running at port ${port}`)
})