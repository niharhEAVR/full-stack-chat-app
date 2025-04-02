const express  = require("express");
const cors  = require("cors");
const mongoose  = require("mongoose");
const userRoutes = require("./routes/userRoute")


const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Database Connected Succesfully");
    
}).catch(err=>{
    console.log(err);
});


app.use("/api/auth",userRoutes);








app.listen(3000);