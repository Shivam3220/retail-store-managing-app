import Mycontext from "./MyContext";
import { useState,useEffect } from "react";


const Mystate=(props)=>{

  


    const preBill=()=>{

    
      if(localStorage.items!==undefined){
        
        return JSON.parse(localStorage.items)
             
      }
      else{
       return []
      }
    }

    const to=()=>{

    
      if(localStorage.buyer!==undefined){
        
        return JSON.parse(localStorage.buyer)
             
      }
      else{
       return "cash"
      }
    }


    
     


  // all the item sold are prensent in this itemm
  const [item,setItem]=useState(preBill);
 const [buyer, setBuyer]=useState(to)
 const [bill, setBill]=useState(" ")

 useEffect(() => {
  // console.log(item);
  localStorage.setItem("items", JSON.stringify(item))
}, [item]);


  // const [fetchItem,setFetchItem]=useState([]);        

  
  const billNumber= async()=>{
    try {
      const response= fetch("http://localhost:5000/record/billNumber",{method:"GET"})
      const a=await (await response).json()
      // console.log(a.billNumber)
     setBill(a.billNumber)
     
      
    } 
    catch (error) {
      // console.log("SORRY WE ARE NOT ABLE TO CONNECT WITH DATABASE");
    }
     
  }
  useEffect(() => {
    
    billNumber()
    },[]);




  const products= async(product_name)=>{
      try {
          const response= await fetch("http://localhost:5000/stocks/findStock",{
            method:"GET",
            headers:{
                article:product_name
            }
          })
        //   
          const json= await response.json() 
          
         return  json
         
          
          
      } catch (error) {
          return []
      }
  }
  
  const getProduct= async(_id)=>{
    try {
      const response= await fetch("http://localhost:5000/stocks/product",{
        method:"GET",
        headers:{
          _id:_id
        }
      })
      //   
      const json= await response.json() 
      
      return  json
      
      
      
    } catch (error) {
      
    }
  }
  
  const addBill= async(record)=>{
      try {
        // eslint-disable-next-line
          const response= await fetch('http://localhost:5000/record/recordBill', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(record),
          })
          // console.log("record added sucessfully");
      } catch (error) {
       
      }
  }
  return(
        <Mycontext.Provider value={{item, setItem, products,getProduct, buyer ,setBuyer,bill,addBill,billNumber }}>
            {props.children}
        </Mycontext.Provider>
    )
}

export default Mystate;