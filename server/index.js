//Add our Libreries

const http = require("http");
const express = require("express");
const app = express();
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) 

const env = require(`dotenv`);
env.config();

const mongoose = require(`mongoose`);

//Database Connection
mongoose
  .connect(process.env.MONGO_URL2)
  .then(() => {
    console.log("DB Connection Succesfully");
  })
  .catch((err) => {
    console.log(err);
  });
  

// const host = "198.168.137.1";
const host = "127.0.0.1";
const port = process.env.PORT_NUMBER;
//to Active listen Port
app.listen(process.env.PORT_NUMBER || 3000, () => {
  console.log("connection Successful");
  console.log(`Server running at http://${host}:${port}/`);
});

//delete
app.get("/", (req, res) => {
  console.log("Backend is Running");
  res.send("Connection Successful to the backend");
});

app.use(express.json());

//Auth Route
const authRoute = require(`./routes/auth`);
app.use(`/api/auth`, authRoute);

//USER
const userRoute = require(`./routes/user`);
app.use("/api/users", userRoute);

//PRODUCT
const productRoute = require("./routes/product");
app.use("/api/products", productRoute);

//CART
const cartRoute = require("./routes/cart");
app.use("/api/carts", cartRoute);

//ORDER 
const orderRoute = require("./routes/order");
app.use("/api/orders", orderRoute);
