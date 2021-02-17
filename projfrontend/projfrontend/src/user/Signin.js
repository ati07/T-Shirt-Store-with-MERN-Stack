import React, {useState} from "react"
import Base from "../core/Base"
import {Link, Redirect} from "react-router-dom"

import {signin,authenticate,isAuthenticated} from "../auth/helper"

const Signin = ()=>{

    const [values,setValues] = useState({
        email:"a@gmail.com",
        password:"123456",
        error:"",
        loding: false,
        didRedirect: false,
    })

    const { email, password, error, loading, didRedirect} = values
    const { user} = isAuthenticated();

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }

    const onsubmit = event =>{
        event.preventDefault();
        setValues({...values,error:false, loding:true})
        signin({email,password})
        .then(data =>{
            if(data.error){
                setValues({...values,error:data.error,loading: false})
                
            }else{
                authenticate(data, () =>{
                    setValues({
                        ...values,
                        didRedirect:true
                    })
                })
            }
        })
        .catch(console.log("SignIn request Failed"))
    }

    const performRedirect  =() =>{
        if(didRedirect){
            if(user && user.role === 1){
                return <Redirect to="/admin/dashboard"/>
            } else{
                return <Redirect to = "/user/dashboard"/>
            }
        }
        if (isAuthenticated()){
            return <Redirect to="/"/>
        }
    }

    const lodingMessage = () => {
        return (
            loading && (
                <div className="alert alert-info">
                    Loading...
                </div>
            )
        )
    }

    const errorMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-danger"
                        style={{ display: error ? "" : "none" }}
                    >
                        {error}
                    </div>
                </div>
            </div>
        )
    }


    const SignInForm = () =>{
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label htmlFor="" className="text-light">Email</label>
                            <input onChange={handleChange("email")} className="form-control" type="email" value={email}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="" className="text-light">Password</label>
                            <input  onChange={handleChange("password")} className="form-control" type="password" value={password}/>
                        </div>
                        <button onClick={onsubmit} className="btn btn-success btn-block">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
    return (
        <Base title="Signin Page" description="You succesfully Signin">
            {/* <h1>Sign In Works</h1> */}
            {lodingMessage()}
            {errorMessage()}
            {SignInForm()}
            {performRedirect()}
            <p className="text-white text-center"> {JSON.stringify(values)}</p>
        </Base>
    )
}

export default Signin