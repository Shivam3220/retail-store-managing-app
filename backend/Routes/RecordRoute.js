const express = require("express");
const router = express.Router()

const bill_record = require("../Schema/bill_record_schema");


router.post("/recordBill", async (req,res)=>{
    const bill= new bill_record(req.body);
    bill.save().then(() => {
        // console.log("bill added successfully");
        res.send(req.body);
    })
     
})


router.get("/billNumber", async (req,res)=>{
   const billNumber=await bill_record.count();
   res.status(200).send({billNumber})

})


module.exports = router