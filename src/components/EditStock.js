import React, { useState, useRef, useEffect } from 'react'

const EditStock = () => {

    const [addStock, setAddStock] = useState();
    const [alertState, setAlertState] = useState();

    const product_name = useRef();
    const selling_price = useRef();
    const m_r_p = useRef();
    const availableStock = useRef();
    const alert = useRef();


    const fetchAdd = async (product) => {
        try {
            const response = await fetch("http://localhost:5000/stocks/addStock", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            })
            //   
            const json = await response.text()
            return json



        } catch (error) {
            return "Stock NOT Added : Server Error"
        }
    }
    useEffect(() => {
        setTimeout(() => {

            alert.current.hidden = true
        }, 3000);
    }, [alertState])


    const handleAdd = async () => {
        // console.log('some one click on add');
        if (product_name.current.value !== "" || selling_price.current.value !== "") {
            // console.log(JSON.stringify(addStock));
            // console.log('inside if');
            const addProduct = await fetchAdd(addStock);
            alert.current.hidden = false
            setAlertState(addProduct)

        }
        else {
            window.alert("Please fill the product detail carefully")
            // console.log('inside else');
        }

    }

    const onchange = (e) => {
        setAddStock(() => ({ ...addStock, [e.target.name]: e.target.value }))

    }

    return (
        <>

            <div className="alert alert-warning alert-dismissible fade show" role="alert" hidden ref={alert}>
                {alertState}
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>

            <div className="container">
                <h1 className="text-center my-3">ADD STOCK</h1>
                <div className="container text-center my-3 align-middle" style={{ "width": "80%" }}>


                    <div className="mb-3 row">
                        <label htmlFor="product_name" className="col-2 col-form-label "><b>PRODUCT NAME:</b></label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control fw-bolder text-lowercase" name='product_name' placeholder='ENTER PRODUCT NAME' autoComplete="off" onChange={onchange} ref={product_name} />
                        </div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="selling_price" className="col-2 col-form-label "><b>SELLING PRICE:</b></label>
                        <div className="col-sm-10">
                            <input type="number" className="form-control fw-bolder text-lowercase" name='selling_price' placeholder='ENTER PRODUCT SELLING PRICE' onChange={onchange} ref={selling_price} />
                        </div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="m_r_p" className="col-2 col-form-label "><b>MRP:</b></label>
                        <div className="col-sm-10">
                            <input type="number" className="form-control fw-bolder text-lowercase" name='m_r_p' placeholder='ENTER PRODUCT MRP' onChange={onchange} ref={m_r_p} />
                        </div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="availableStock" className="col-2 col-form-label "><b>AVAILABLE QUANTITY:</b></label>
                        <div className="col-sm-10">
                            <input type="number" className="form-control fw-bolder text-lowercase" name='availableStock' placeholder='ENTER AVAILABLE QUANTITY' onChange={onchange} ref={availableStock} />
                        </div>
                    </div>






                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button type="button" className="btn btn-dark" onClick={handleAdd}>ADD STOCK</button>
                    </div>



                </div>

            </div>
        </>
    )
}

export default EditStock
