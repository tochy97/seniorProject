import * as types from "../types/authTypes";
import axios from 'axios';

const setUser = (data)=>({
    type:types.SET_USER,
    payload:data
})
export const setError = (data)=>({
    type:types.SET_ERROR,
    payload:data
})
const resetUser = ()=>({
    type:types.RESET_USER,
})

export const loginUser = (data) => dispatch=>{
    const formData = JSON.stringify(data)
    axios.post("http://127.0.0.1:8000/auth/", formData, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(res => {
        console.log(res)
        const user = {
            username:res.data.user.username,
            id:res.data.user.id,
            status:res.status
        }
        dispatch(setUser(user))
        localStorage.setItem('token', res.data.token);
    })
    .catch(err => {
        localStorage.removeItem('token');
        console.log(err.response.status)
        const info= {
            error:"Invalid Username or Password",
            status:err.response.status
        }
        dispatch(setError(info))
        dispatch(resetUser);
    });
}

export const createUser = (data) => dispatch=>{
    const formData = JSON.stringify(data)
    axios.post("http://127.0.0.1:8000/createuser/", formData, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(res => {
        console.log(res)
        const user = {
            username:res.data.user.username,
            id:res.data.user.id,
            status:res.status
        }
        dispatch(setUser(user))
        localStorage.setItem('token', res.data.token);
    })
    .catch(err => {
        localStorage.removeItem('token');
        console.log(err.response.status)
        const info= {
            error:"Invalid Username or Password",
            status:err.response.status
        }
        dispatch(setError(info))
        dispatch(resetUser);
    });
}

export const checkUser = () => dispatch=>{
    axios.get('http://127.0.0.1:8000/currentuser/', {
        headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
        }
    })
    .then((res) => {
        const user = {
            username:res.data.username,
            id:res.data.id,
            status:res.status
        }
        dispatch(setUser(user))
    })
    .catch(err => {   
        localStorage.removeItem('token');
        const info= {
            error:"You are not logged in",
            status:err.response.status
        }
        dispatch(setError(info))
        dispatch(resetUser);
    }); 
}


export const logoutUser = () => dispatch=>{
    localStorage.removeItem('token');
    console.log("confirm")
    dispatch(resetUser());
}