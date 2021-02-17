import React, { useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import "../styles.css"
import { API } from "../backend"
import Base from "./Base"
import Card from './Card'
import { getProducts } from './helper/coreapicalls'
import { loadCart } from './helper/cartHelper'
import StripeCheckout from './StripeCheckout'


const Cart = () => {

  const [products, setProducts] = useState([])
  const [reload, setReload] = useState(false)
  
  useEffect(() => {
    setProducts(loadCart())
  }, [reload])
  const loadAllProducts = (products) => {
    return (
      <div>
        <h2>This section is to load products</h2>
        {products.map((product, index) => {
          return (<Card
            key={index}
            product={product}
            removeFromCart={true}
            addtoCart={false}
            setReload={setReload}
            reload={reload}
          />)
        })}
      </div>
    )
  }

  //   const loadCheckout = ()=>{
  //       return (
  //           <div>
  //               <h2>
  //                   This section is checkout
  //               </h2>
  //           </div>
  //       )
  //   }
  return (
    <Base title="Cart" description="Ready to checkout!">

      <div className="row text-center" >
        <div className="col-6">{products.length > 0 ? (loadAllProducts(products)) : (<h3> No products in Cart</h3>)}</div>
        <div className="col-6">
          <StripeCheckout
            products={products}
            setReload={setReload}
          />
        </div>
      </div>

    </Base>
  )
}

export default Cart