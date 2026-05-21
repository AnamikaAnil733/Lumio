import express from "express";

const router = express.Router();

router.get("/serch",(req,res)=>{
    res.json({
        message:"movie serch route is working"
    })
})


export default router;