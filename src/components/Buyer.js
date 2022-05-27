import React, { useContext, useEffect, useRef } from 'react'
import Mycontext from '../context/MyContext'

const Buyer = () => {
    const { setBuyer, buyer } = useContext(Mycontext)


    window.onload = () => {
        // console.log("i am in onload");
        // console.log(JSON.parse(localStorage.items));
        // setItem(JSON.parse(localStorage.items))
        to.current.focus()
    }


    let to = useRef();

    useEffect(() => {
        // console.log(item);
        localStorage.setItem("buyer", JSON.stringify(buyer))
    }, [buyer]);

    const onchangeTo = async () => {

        if (to.current.value !== "") {
            setBuyer(to.current.value)

        }

    }
  return (
   <>
    <div className="input-group input-group-lg container  align-items-start my-3" style={{ width: "50%" }}>
                <span className="input-group-text bg-dark text-light"  >TO:</span>
                <input type="text" className="form-control" aria-label="Sizing example input" onChange={onchangeTo} aria-describedby="inputGroup-sizing-lg" ref={to} />
            </div>
   </>
  )
}

export default Buyer
