require('dotenv').config()

const express = require("express");
const app = express();

const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const paymentBRoutes = require("./routes/paymentBRoutes");

//DB Config
let url = process.env.DATABASE || "mongodb://localhost:27017/tshirt"
mongoose
    .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(() => console.log("DB CONNECTED!")).catch((err) => console.log("ERROR on DB", err));

//Midlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


//Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes)
app.use("/api", paymentBRoutes)

app.get("/", (req, res) => {res.send(`Fashion Store API is running!`)})

//PORT & Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server in running on ${PORT}`)
})