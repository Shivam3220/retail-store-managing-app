import React, { useContext, useState, useEffect, useRef } from 'react'
import Mycontext from '../context/MyContext'



const Form = () => {
    const { item, setItem, products, getProduct, setBuyer, buyer } = useContext(Mycontext)

    const [articles, setArticles] = useState([])
    



    let [formPop] = useState({
        "product_name": "",
        "selling_price": 0,
        "m_r_p": 0,
        "availableStock": 0
    })

    let product_name = useRef();
    let selling_price = useRef();
    let m_r_p = useRef();
    let availableStock = useRef();
    let Quantity = useRef();
    let to = useRef();




    window.onload = () => {
        // console.log("i am in onload");
        // console.log(JSON.parse(localStorage.items));
        // setItem(JSON.parse(localStorage.items))
        to.current.focus()
    }

    const [product, setProduct] = useState({
        "product_name": "",
        "selling_price": 0,
        "m_r_p": 0,
        "quantity": null
    })



    const handleUp = async (e) => {
        // console.log("i am in handle up" + e);
        const singleItemData = await getProduct(e.target.id);
        formPop = await singleItemData[0];
        product_name.current.value = formPop.product_name
        selling_price.current.value = formPop.selling_price
        m_r_p.current.value = formPop.m_r_p
        availableStock.current.value = formPop.availableStock
        setProduct({ "product_name": formPop.product_name, "selling_price": formPop.selling_price, "m_r_p": formPop.m_r_p, "quantity": null});


    }

    // const handleFetch = async () => {
    //     console.log("some one click");
    //          const allProducts= await products() ;


    // }


    useEffect(() => {
        // console.log(item);
        localStorage.setItem("buyer", JSON.stringify(buyer))
    }, [buyer]);

    const onchangeTo = async () => {
            // console.log(to.current.value )
        if (to.current.value !== "") {
            setBuyer(to.current.value)
        }
        else{
            setBuyer("cash")
        }

    }

 


   




    const HandleAdd = async (e) => {
        e.preventDefault()
        to.current.value = "";
        product_name.current.focus()

        if (Quantity.current.value === "" || selling_price.current.value === "") {
            alert("Please enter a valid quantity and selling price")
            return false;
        }
        else {
            setItem(item.concat(product))
            window.scrollTo(0,8000);
            // console.log(item);
            Quantity.current.value = null;
            product_name.current.value = null;
            m_r_p.current.value = null;
            selling_price.current.value = null;

        }


    }


    const updateModalState = async (a) => {

        setArticles(a)


    }

    const onChangeFetch = async (e) => {
        setProduct(() => ({ ...product, [e.target.name]: e.target.value }))
        const modalProduct = await products(product_name.current.value);
        updateModalState(modalProduct)

    }
    const onChange = async (e) => {
        // data-bs-toggle="dropdown"
        // toggle.toggle()
        const target = e.target
        setProduct(() => ({ ...product, [target.name]: target.value }))



    }

    const toggleOn=()=>{
        // console.log("on focus on input")
        const checkDropState=product_name.current.className
        // console.log( checkDropState.search("show") )
        if(checkDropState.search("show")<0){
            
            product_name.current.click()
        }
       
    }

 

    return (
        <>
        

            <div className="input-group input-group-lg container  align-items-start my-3" style={{ width: "50%" }}>
                <span className="input-group-text bg-dark text-light"  >TO:</span>
                <input type="text" className="form-control text-uppercase" aria-label="Sizing example input" onChange={onchangeTo} aria-describedby="inputGroup-sizing-lg" ref={to} />
            </div>

            <div className="container my-3 bg-dark py-3 text-light rounded-3">
                <form>
                    <div className="row">
                        <div className="col dropdown">
                            <label htmlFor="product_name">Product Name</label>

                            <input type="text" onChange={onChangeFetch} onInput={toggleOn}  className="form-control dropdown-toggle text-lowercase" data-bs-toggle="dropdown" ref={product_name} placeholder="Product Name" name='product_name' aria-haspopup="true" autoComplete="off" />

                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">


                                {articles.length === 0 ? <p>No product found</p> : articles.map((e) => {
                                    return <button className="dropdown-item " key={e._id} id={e._id} onClick={handleUp} type="button">{e.product_name}</button>
                                })}

                            </div>

                        </div>
                        <div className="col">
                            <label htmlFor="quantity">Quantity</label>
                            <input type="number" onChange={onChange} className="form-control" placeholder="Quantity" name='quantity' ref={Quantity} aria-label="First name" autoComplete="off" />
                        </div>
                        <div className="col">
                            <label htmlFor="selling_price">Selling Price</label>
                            <input type="number" onChange={onChange} className="form-control" placeholder="Selling Price" ref={selling_price} name='selling_price' aria-label="First name" />
                        </div>
                        <div className="col">
                            <label htmlFor="m_r_p">M.R.P</label>
                            <input type="number" onChange={onChange} className="form-control" placeholder="M.R.P" ref={m_r_p} name='m_r_p' aria-label="First name" />
                        </div>
                        <div className="col">
                            <label htmlFor="availableStock">AVAILABLE Stock</label>
                            <input type="number" onChange={onChange} className="form-control " placeholder="Available Quantity" name='availableStock' ref={availableStock} aria-label="First name" disabled />
                        </div>
                    </div>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button type="submit" onClick={HandleAdd} className="btn btn-light my-3 mx-3">ADD</button>
                    </div>
                </form>

            </div>

        </>

    )
}

export default Form
