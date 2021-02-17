import React, { useState, useEffect } from 'react'
import { Link,Redirect } from 'react-router-dom'
import Base from "../core/Base"
import { getProduct,updateProduct, getCategories } from "./helper/adminapicall"
import { isAuthenticated } from "../auth/helper/index"

const UpdateProduct = ({match}) => {
  const { user, token } = isAuthenticated()
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getaRedirect: false,
    formData: ""
  })

  const {
    name,
    description,
    price,
    stock,
    photo,
    categories,
    category,
    loading,
    error,
    createdProduct,
    getaRedirect,
    formData
  } = values

  const preload = (productId) => {
      console.log("prodID:", productId)
    getProduct(productId).then(data => {
      console.log("data:-", data)
      if (data.error) {
        setValues({ ...values, error: data.error })
      } else {
        setValues({
             ...values, 
             name: data.name,
             description:data.description,
             price:data.price,
             stock:data.stock,
            formData: new FormData()
         });
            preloadCategories()
      }
    })
  }


  const preloadCategories = ()=>{
      getCategories().then(data =>{
          if(data.error){
            setValues({ ...values, error: data.error })
          }else{
              setValues({
                  categories: data, formData:new FormData()
              })
          }
      })
  }
  useEffect(() => {
    preload(match.params.productId)
  }, [])


  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true })
    console.log("formData:", formData)
    updateProduct(match.params.productId,user._id, token, formData).then(data => {
      console.log("data:", data)
      if (data.error) {
        setValues({ ...values, error: data.error })
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          price: "",
          photo: "",
          stock: "",
          loading: true,
          getaRedirect: true,
          
          createdProduct: data.name
        })
      }
    })

  }

  const handleChange = name => event => {
    const value = name === "photo" ? event.target.files[0] : event.target.value
    formData.set(name, value);
    setValues({ ...values, [name]: value })
  }


  const performRedirect = () => {
    console.log("Perform")
    if (getaRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />
      } else {
        return <Redirect to="/user/dashboard" />
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />
    }
  }
  const loadingMessage = () => {
   
    return (
      loading && (
        <div className="alert alert-info">
          Loading....
        {/* {setTimeout(performRedirect, 2000)} */}
        </div>
      )
    )
  }

  const successMessage = () => {
    return (
      <div className="alert alert-success my-3"
        style={{ display: createdProduct ? "" : "none" }}>
        <h4>{createdProduct} updated product Successfully</h4>
      </div>
    )
  }
  const errorMessage = () => {
    return (
      <div className="alert alert-danger my-3"
        style={{ display: error ? "" : "none" }}>
        <h4>failed to created</h4>
      </div>
    )
  }

  const createProductForm = () => (
    <form >
      <span>Post photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
          {categories &&
            categories.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            ))
          }
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={stock}
        />
      </div>

      <button type="submit" onClick={onSubmit} className="btn btn-outline-success mb-2">
        Update Product
          </button>
    </form>
  );


  return (
    <Base title="Add Product Here"
      description="Welcome to product Creation section"
      className="container bg-info p-4">
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Admin Home
           </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {loadingMessage()}
          
          {successMessage()}
          {errorMessage()}
          {createProductForm()}
          {/* {performRedirect()} */}
          {/* <p>{JSON.stringify(values)}</p> */}
        </div>
      </div>
    </Base>
  )
}

export default UpdateProduct
