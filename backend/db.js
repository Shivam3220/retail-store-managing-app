const mongoose= require("mongoose");

const dataBase="mongodb://localhost:27017/grmpStore";
connectToMongo=()=>{
    mongoose.connect(dataBase,()=>{
        console.log("we are connected to data base successfully");
    });

}

module.exports=connectToMongo;

