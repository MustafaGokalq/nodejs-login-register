const express = require("express");
const dotenv = require("dotenv");
const conn = require("./db");
const userRouter = require("./routes/user");
const app = express()

dotenv.config()

app.use(express.json());

app.use("/api/users",userRouter)

app.use((req,res,next)=>{
    console.log(req.path, req.method);
    next()
})


conn();
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Uygulama ${port} portunda çalışıyor`);
  });