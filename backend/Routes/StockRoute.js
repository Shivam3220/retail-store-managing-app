const express = require("express");
const router = express.Router()

const stock = require("../Schema/stock_schema");



// route for creating stock in database
router.post("/addStock", async (req, res) => {
    try {
        const stocks = new stock(req.body);
        // console.log(req.body.product_name);
        const data = await stock.findOne({product_name:req.body.product_name});
        // console.log(data);
        if(data==null){

            stocks.save().then(() => {
                // console.log("stock added successfully");
                res.status(200).send("ITEM ADDED SUCCESSFULY");
            })
           
        }
        else{
            res.status(201).send("ITEM WITH THIS NAME ALREADY PRESENT")
        }
    } catch (error) {
        res.status(400).send("SERVER ERROR")

    }
})


// route for finding the stock in the database
router.get("/findStock", async (req, res) => {
    try {
        // console.log(req.headers.article);
        const article =req.headers.article;
        const data = await stock.find({product_name:{$regex : article}}).limit(5);
     
        // const data = await stock.find({});
      
        res.status(200).send(data)

    } catch (error) {

    }
})
router.get("/product", async (req, res) => {
    try {
        const data = await stock.find({_id:req.headers._id});
        // const data = await stock.find({});
        res.status(200).send(data)

    } catch (error) {

    }
})


// route for deleting the product
router.delete("/deleteStock", async (req, res) => {
    try {


        const product = await stock.findOne({ _id: req.body });
        if (product) {

            // console.log(product);
            const del = await stock.deleteOne({ _id: req.body })
            if (del) {

                res.send("deleted sucessfully")
            }
            else {
                res.send("error")
            }
        }
        else {
            res.send("no product found")
        }
    } catch (error) {

    }
})

// router for adding the amont of stock in the database
router.put("/updateStock/add", async (req, res) => {
    try {


        const product = await stock.findOne({ _id: req.body });
        // console.log(product.m_r_p)
        if (product) {
            const update = await stock.replaceOne({ _id: req.body._id }, {
                _id: req.body._id,
                product_name: req.body.product_name,
                selling_price: req.body.selling_price,
                m_r_p: req.body.m_r_p,
                availableStock: product.availableStock + req.body.quantity
            })
            if (update) {
                res.send("updated sucessfully")
            }
            else {
                res.send("error")
            }


        }
        else {
            res.send("no product found")
        }
    } catch (error) {

    }


})
// router for removing the amont of stock in the database
router.put("/updateStock/remove", async (req, res) => {
    try {


        const product = await stock.findOne({ _id: req.body });

        if (product) {
            const update = await stock.replaceOne({ _id: req.body._id }, {
                _id: req.body._id,
                product_name: req.body.product_name,
                selling_price: req.body.selling_price,
                m_r_p: req.body.m_r_p,
                availableStock: product.availableStock - req.body.quantity
            })
            if (update) {
                res.send("updated sucessfully")
            }
            else {
                res.send("error")
            }


        }
        else {
            res.send("no product found")
        }
    } catch (error) {

    }


})


module.exports = router

