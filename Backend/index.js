const express = require("express");

const app = express();
app.use(express.json());
app.post("/hi",async (req,res)=>{
    const {meow}=req.body;
    return res.json({hu:meow,hi:"meow"});
});
console.log("Revolution has begun!");
app.listen(1000);