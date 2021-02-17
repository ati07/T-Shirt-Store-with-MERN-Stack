import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import { cartEmpty, loadCart } from './helper/cartHelper';
import { getProducts } from './helper/coreapicalls';
import StripeCheckoutButton from "react-stripe-checkout"
import { API } from '../backend';
import {createOrder} from './helper/orderHelper'

const StripeCheckout = ({ products, setReload = f => f, reload = undefined }) => {

    const [data, setData] = useState({
        loading: false,
        sucess: false,
        error: "",
        address: ""
    })

    const token = isAuthenticated() && isAuthenticated().token
    const userId = isAuthenticated() && isAuthenticated().user._id

    const getFinalPrice = () => {
        let amount = 0;
        products.map(p => {
            amount = amount + p.price
        })
        return amount
    }

    const makePayment = (token) => {
        const body = {
            token,
            products
        }
        const headers = {
            "Content-Type": "application/json"
        }
        return fetch(`${API}/stripepayment`,{
            method: "POST",
            headers,
            body: JSON.stringify(body)
        }).then(response =>{
                console.log(response)
                // call further methods
                const {status} = response
                console.log("status:", status)
                // const orderData = {
                //     products: products,
                //     transaction_id: response.transaction.id,
                //     amount: response.transaction.amount
                // }
                // createOrder(userId, token, orderData)
                cartEmpty(()=>{
                    console.log("DId we got a crash?")
                })
                setReload(!reload)
        }).catch(err=> console.log(err))
    }

        const showStripeButton = () => {
            return isAuthenticated() ?
                (
                <StripeCheckoutButton
                    stripeKey="pk_test_51I7ZySCRuEIFioynCZ4aTexmFgCwlQMvdhuVgV9sZpgxcHyR0X2ITVPcD14GlW68wRW4Ucc9hBf5JBeCf4kp7mlz008dL0kHD3"
                    token={makePayment}
                    amount={getFinalPrice() * 100}
                    name="Buy Tshirts"
                    shippingAddress
                    billingAddress>
                    <button className="btn btn-success">Pay With Stripe</button>
                </StripeCheckoutButton>
                ) : (
                    <Link to="/sign">
                        <button className="btn btn-warning"> Sign In</button>
                    </Link>
                )
        }
        //  const errorMessage
        return (
            <div>
                <h3 className="text-white">StripeCheckout Loaded {getFinalPrice()}</h3>
                {showStripeButton()}
            </div>
        )
    }

    export default StripeCheckout;