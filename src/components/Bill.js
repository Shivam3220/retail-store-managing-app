import React, { useContext, useRef, useState } from 'react'
import Mycontext from '../context/MyContext'
import { useReactToPrint } from "react-to-print";
import Officebill from './Officebill';

import {
  Routes,
  Route,
} from "react-router-dom";


const Bill = () => {
  const { item, buyer, bill, addBill, billNumber, setItem, setBuyer } = useContext(Mycontext)

  const printableArea = useRef();
  const openModal = useRef();
  const closeModal = useRef();



  const [editItem, setEditItem] = useState({ "product_name": "", "selling_price": "", "m_r_p": "", "quantity": "" })
  const [id, setId] = useState("")

  const handlePrint = useReactToPrint({

    content: () => printableArea.current
  });

  const clearForm = () => {
    if(window.confirm("ARE YOU SURE YOU WANT TO CLEAR BILL")){

      setItem([])
      setBuyer("cash")
     
    }

  }

  const checkOut = () => {

    if (item.length !== 0) {

      const record = {
        "buyerName": buyer.toUpperCase(),
        "billNo": bill,
        "billDetail": item,
        "totalAmount": totalAmount
      }
      addBill(record)
      setItem([])
      billNumber()
      setBuyer("cash")
      localStorage.clear("items")
    }
  }

  let sNo = 0;
  let totalAmount = 0;
  const currentDate = new Date()
  const date = currentDate.toDateString()

  const removeProduct = async (e) => {
    // console.log(e);
    let copy = await item;
    // console.log(copy);
    //  copy=await copy.filter(copy=>copy.product_name!==e.target.id)
    copy = await copy.filter((element) => {
      if (copy.indexOf(element) !== e) {
        return element
      }
      else {
        return null
      }
    })

    setItem(copy)
    // console.log(copy);
  }


  const editProduct = (e, index) => {
    openModal.current.click()
    setEditItem(e)
    setId(index)
    // console.log(e, index);
  }



  const editChange = (e) => {
    setEditItem(() => ({ ...editItem, [e.target.name]: e.target.value }))

  }


  const onEditClick = async (e) => {
    // console.log("some one click on save");
    const temp = item.map(e => Object.assign({}, e));
    temp[e] = editItem
    // console.log(temp);
    setItem(temp)
    closeModal.current.click()
  }

  return (
    <>
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" hidden ref={openModal}>
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Item</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div className="modal-body">

              <div className="col">
                <label htmlFor="product_name">Product Name</label>
                <input type="text" value={editItem.product_name} onChange={editChange} className="form-control" placeholder="Product Name" name='product_name' aria-label="First name" autoComplete="off" />
              </div>
              <div className="col">
                <label htmlFor="quantity">Quantity</label>
                <input type="number" className="form-control" value={editItem.quantity} onChange={editChange} placeholder="Quantity" name='quantity' aria-label="First name" autoComplete="off" />
              </div>
              <div className="col">
                <label htmlFor="selling_price">Selling Price</label>
                <input type="number" className="form-control" value={editItem.selling_price} onChange={editChange} placeholder="Selling Price" name='selling_price' aria-label="First name" />
              </div>
              <div className="col">
                <label htmlFor="m_r_p">M.R.P</label>
                <input type="number" className="form-control" value={editItem.m_r_p} onChange={editChange} placeholder="M.R.P" name='m_r_p' aria-label="First name" />
              </div>





            </div>


            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={closeModal}>Close</button>
              <button type="button" className="btn btn-primary" onClick={() => onEditClick(id)} >Save changes</button>
            </div>

          </div>
        </div>
      </div>

      <div className='container border border-dark rounded my-4 py-3' id='printable' ref={printableArea}>
        <Routes>
          <Route exact path="/" element={<h5 className='mb-2 text-center'>ESTIMATE</h5>} />
          <Route exact path="/office" element={<Officebill />} />

        </Routes>

        <div className="container">
          <div className="d-flex justify-content-between">
            <h6>TO : <b>{buyer.toUpperCase()}</b></h6>
            <h6>Date : {date}</h6>
          </div>
          <h6>BILL NO.  <u><b>{bill === " " ? "______" : bill}</b></u></h6>
          <table className=" table   table-sm ">



            <thead className='border-dark table-bordered '>
              <tr>
                <th scope="col">S.NO.</th>
                <th scope="col" className='text-center'>PRODUCT</th>
                <th scope="col" className='text-center'>QANTITY</th>
                <th scope="col" className='text-center'>SELLING PRICE</th>
                {/* <th scope="col">M.R.P</th> */}
                <th scope="col" className='text-end'>AMOUNT</th>
              </tr>

            </thead>
            <tbody className='table-borderless' >


              {/* <tr >
                  <th scope="row">1</th>
                  <td>djgj</td>
                  <td>2</td>
                  <td>3</td>
                  <td>6</td>
                </tr> */}



              {item.map((e, index) => {

                try {

                  sNo++
                  totalAmount = totalAmount + (e.selling_price * e.quantity);
                  return <tr key={index} >

                    <th scope="row" >
                      <button className="btn btn-secondary dropdown-toggle text-dark " type="button" id="dropdownMenuButton1" style={{ background: "none", border: "none" }} data-bs-toggle="dropdown" aria-expanded="false">
                        {sNo}
                      </button>
                      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><button className="dropdown-item" onClick={() => editProduct(e, index)} id={e._id}>Edit</button></li>
                        <li><button className="dropdown-item" onClick={() => removeProduct(index)} id={e.product_name}>Remove</button></li>
                      </ul>
                    </th>

                    <td className='text-center' >{e.product_name}</td>
                    <td className='text-center'>{e.quantity}</td>
                    <td className='text-center'>{e.selling_price}</td>
                    {/* <td>{e.m_r_p}</td> */}
                    <td className='text-end'>{e.selling_price * e.quantity}</td>
                  </tr>
                }
                catch {
                  return "some error occured"
                }
              })}

              <tr>
                <th colSpan="4" className='text-center'>TOTAL AMOUNT</th>
                <td className='text-end'><b>{totalAmount}</b></td>
              </tr>


            </tbody>


          </table>
        </div>
      </div>

      <div className="d-flex mb-3 container">
        <div className="me-auto p-2"><button type="button" onClick={clearForm} className="btn bg-dark text-light mb-3 mx-3 justify-content-start">CLEAR</button></div>
        <div className="p-2"> <button type="button" onClick={handlePrint} className="btn bg-dark text-light mb-3">PRINT</button>
          <button type="button" onClick={checkOut} className="btn bg-dark text-light mb-3 mx-3">CHECK OUT</button></div>

      </div>
    </>
  )
}

export default Bill
