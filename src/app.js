import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser)



//Routes import

import userRouter from "./routes/user.routes.js";

//Routes declaration
app.use("/api/v1/users", userRouter)

app.get("/instagram", (req, res) => {
    res.json({
        "message" : "Hello User"
    })
})

// app.listen(process.env.PORT, () => {
//     console.log('Server is running on port :: ', process.env.PORT)
// })

export default app;