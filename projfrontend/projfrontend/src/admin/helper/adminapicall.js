import { API } from "../../backend"

// category call
export const createCategory = (userId, token, category) =>{
    // console.log("category:",category)
    // console.log(JSON.stringify(category))
    return fetch(`${API}/category/create/${userId}`, {
        method: "POST",
        headers:{
            Accept: "application/json",
        "Content-Type":"application/json",
        Authorization: `Bearer ${token}`
        
    },
    body: JSON.stringify(category)
})
.then(response =>{
    // console.log(response)
    return response.json()
})
.catch(err => console.log(err))
}

// get all categories

export const getCategories= ()=>{
    return fetch(`${API}/categories`,{
        method:"GET",

    }).then(response =>{
        return response.json()
    }).catch(err => console.log(err))
}

// Delete Category

export const removeCategory =(categoryId,userId, token)=>{
    return fetch(`${API}/category/${categoryId}/${userId}`,{
        method:"DELETE",
        headers:{
            Accept: "application/json",
        "Content-Type":"application/json",
        Authorization: `Bearer ${token}`
        }
    }).then(response=>{
        return response.json()
    }).catch(err=>console.log(err))
}

// update Category

export const updateCategory =(categoryId,userId, token, category)=>{
    // let data = JSON.stringify(category)
    // console.log("fcate:",data)
    return fetch(`${API}/category/${categoryId}/${userId}`,{
        method: "PUT",
        headers:{
            Accept: "application/json",
        "Content-Type":"application/json",
        Authorization: `Bearer ${token}`
        
    },
    body: JSON.stringify(category)
    }).then(response =>{
        return response.json()
    })
    .catch(err =>{
        console.log(err)
    })
    
}

// update a product

export const updateProduct =(productId,userId,token,product)=> {
    console.log("upProd:",product)
    return fetch(`${API}/product/${productId}/${userId}`,{
        method:"PUT",
        headers:{
            Accept: "application/json",
        
        Authorization: `Bearer ${token}`
        
    },
    body: product
    }).then(response =>{
        return response.json()
    })
    .catch(err =>{
        console.log(err)
    })
}
// products call
export const createProduct =(userId,token,product)=> {
    console.log("UserId",userId)
    console.log("token",userId)
    console.log("product",product)
    return fetch(`${API}/product/create/${userId}`,{
        method:"POST",
        headers:{
            Accept: "application/json",
        
        Authorization: `Bearer ${token}`
        
    },
    body: product
    }).then(response =>{
        return response.json()
    })
    .catch(err =>{
        console.log(err)
    })
}

// get all Products

export const getProducts= ()=>{
    return fetch(`${API}/products`,{
        method:"GET",

    }).then(response =>{
        return response.json()
    }).catch(err => console.log(err))
}

// get a category

export const getCategory =(categoryId)=>{
    console.log("apicategoryID",categoryId)
    return fetch(`${API}/category/${categoryId}`,{
        method:"GET",
    }).then(response=>{
        return response.json()
    }).catch(err => console.log(err))
}
// Delete a product
export const deleteProduct =(productId,userId,token)=> {
    return fetch(`${API}/product/${productId}/${userId}`,{
        method:"DELETE",
        headers:{
            Accept: "application/json",
        "Content-Type":"application/json",
        Authorization: `Bearer ${token}`
        
    }
    }).then(response =>{
        return response.json()
    })
    .catch(err =>{
        console.log(err)
    })
}
// get a product
export const getProduct = productId =>{
    return fetch(`${API}/product/${productId}`,{
        method:"GET",

    }).then(response =>{
        return response.json()
    }).catch(err => console.log(err))

}
