import { API } from "../../backend"
//API means : http://localhost:8000/api/

// connection signup with backend
export const signup = user =>{
    return fetch(`${API}/signup`, {
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err))
}

// connection signup with backend
export const signin = user =>{
    return fetch(`${API}/signin`, {
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err))
}

// Authenticate User is signin or not
export const authenticate = (data, next) =>{
    if(typeof window !== "undefined"){
        localStorage.setItem("jwt",JSON.stringify(data))
        next()
    }

}

// connection signout with backend
export const signout = next =>{
    if(typeof window !== "undefined"){
        localStorage.removeItem("jwt")
        next();

        return fetch(`${API}/signout`,{
            method:"GET"
        })
        .then(response => console.log("Signout Successfully"))
        .catch(err => console.log(err))
    }
}

// Authentication of user
export const isAuthenticated = () =>{
    if(typeof window == "undefined"){
       return false
    }
    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"))
    } else{
        return false
    }
}