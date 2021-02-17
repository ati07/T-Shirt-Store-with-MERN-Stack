import React ,{useState, useEffect}from "react"
import Base from "../core/Base"
import { isAuthenticated} from "../auth/helper"
import { Link} from "react-router-dom"
import {createCategory, getCategory, updateCategory} from "./helper/adminapicall"


const UpdateCategory =({match}) =>{

    const [name, setName] = useState("")
    // const [values, setValues] = useState({
    //     name:""
    // });

    const [error, setError] = useState("false")
    const [success, setSuccess] = useState("false")
    const { user, token } = isAuthenticated()


    // const {name} = values
    const goBack = ()=>{
        return(
            <div className="mt-5">
                <Link className=" btn btn-sm btn-info mb-3"
                to="/admin/dashboard">
                    Admin Home
                </Link>

            </div>
        )
    }
    
    const handleChange = event =>{
        setError("");
        setName(event.target.value)
    }


// const preload = (categoryId) => {
//     console.log("cateID:", categoryId)
//     getCategory(categoryId).then(data => {
//     console.log("", data.name)
//     if (data.error) {
//         setError({ error: data.error })
//     } else {
//         setName({
             
//             name: data.name,
            
//         })
//     }
//     })
// }

    // useEffect(() => {
    //     console.log("category ID",match.params.categoryId)
    //     preload(match.params.categoryId)
    //   }, [])

    const successMessage = () =>{
        console.log("Befor success:",success)

        if(success===true){
            
            return(
                <h4 className="text-success">
                    Category created successfully
                </h4>
            )
        }
    }

    const errorMessage = () =>{
        
        if(error===true){
            
            return(
                <h4 className="text-danger">
                    Category failed to create
                </h4>
            )
        }
    }

    const onSubmit = (event) =>{
        event.preventDefault();
        setError("");
        setSuccess(false)

        /// backend  request fired
        console.log("onSubmit",name)
        updateCategory(match.params.categoryId,user._id, token, {name})
        .then (data =>{
            console.log(data)
             if(data.error){
                setError(true);

             }else{
                 setError("");
                 setSuccess(true);
                 setName("")
                 
             }
        })
        .catch(err=> console.log(err))
    }


    const myCategoryForm = ()=>{
        return(
            <form>
                <div className="form-group">
                    <p className="lead">Update the category</p>
                    <input type="text"
                    className="form-control my-3"
                    onChange={handleChange}
                    value={name}
                    
                    required
                    placeholder="For Ex. Summer"
                    />
                    <button onClick = {onSubmit} className="btn btn-outline-info">
                        Update The Category
                    </button>
                </div>
            </form>
        )
    }
    
    return(
        <Base title="Update a Category"
        description="Update category for new tshirt"
        className="Container bg-info p-4">
            <div className="row bg-white rounded">
                <div className="col-md-8 offset-md-2">
                    {successMessage()}
                    {errorMessage()}
                {myCategoryForm()}
                {goBack()}
                {JSON.stringify(name)}
                {JSON.stringify(error)}
                {JSON.stringify(success)}

                </div>
            </div>
        </Base>
    )
}


export default UpdateCategory