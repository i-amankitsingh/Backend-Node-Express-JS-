// require('dotenv').config({path: './env'})
import dotenv from "dotenv"
import connectDB from "./db/index.js";
import app from "./app.js";

dotenv.config({
    path: "./.env"
})

connectDB()
.then(() => {
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server is running at port ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("Database connection error ", err)
})


/*
import express from "express";
const app = express()
(async () => {
    try{
        await mongoose.connect(`${process.evn.MONGODB.URI}/${DB_NAME}`);
        app.on("Error", (error) => {
            console.log("Error: ", error);
            throw error;
        })
        app.listen(process.env.PORT, () => {
            console.log("App is listing on PORT ", process.env.PORT);
        })
    }
    catch(error){
        console.error(error)
        throw error;
    }
})()
*/