const connectToMongo= require("./db");
const express= require("express");
const StockRoute = require("./Routes/StockRoute")
const RecordRoute = require("./Routes/RecordRoute")


var cors = require('cors')

const app=express();  

app.use(cors())


const port=5000;

app.use(express.json());


connectToMongo();

app.use("/stocks",StockRoute )
app.use("/record",RecordRoute )




    

app.listen(port,()=>{
    console.log(`the app is listening at ${port}`);
   });