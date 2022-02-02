import * as types from "../types/sectionTypes";
import { setError, logoutUser } from "./authActionCreator";
import axios from 'axios';

const addClass = ( data ) => ({
    type:types.ADD_CLASS,
    payload:data
})
const addSection = ( data ) => ({
    type:types.ADD_SECTION,
    payload:data
})
const resetClass = () => ({
    type:types.RESET_CLASS,
})
const setClass = ( data ) => ({
    type:types.SET_CLASS,
    payload:data
})
const deleteClass = ( data ) => ({
    type:types.DELETE_CLASS,
    payload:data,
})

export const fetchClass = () => async dispatch => {
    await axios.get("http://127.0.0.1:8000/classes/", {
        headers:{
            'Content-Type': 'application/json',
            Authorization: `JWT ${localStorage.getItem('token')}`,
        }
    })
    .then((res) => {
        dispatch(setClass(res.data));
    })
    .catch(err => {
        const info= {
            error:"Failed to retrieve classes",
            status:404
        }
        dispatch(setError(info));
    })
}

export const createClass = ( classNum, id ) => async dispatch => {
    let form_data = new FormData();
    form_data.append('instructor', id);
    form_data.append('number', classNum);
    await axios.post("http://127.0.0.1:8000/classes/", form_data, {
        headers:{
            'Content-Type': 'application/json',
            Authorization: `JWT ${localStorage.getItem('token')}`,
        }
    })
    .then((res) => {
        dispatch(addClass(res.data));
    })
    .catch(err => {
        const info= {
            error:"Failed to create class",
            status:400
        }
        dispatch(setError(info));
    })
}

export const createSection = ( classID, secNum, id, classNum ) => async dispatch => {

    function isNumeric(str) {
        if (typeof str != "string") return false // we only process strings!  
        for (let i = 0; i < str.length; i++) {
            if(isNaN(str[i]) && isNaN(parseFloat(str[i]))){
                return false;
            }
        }
        return true;
    }

    await axios.get(`http://127.0.0.1:8000/classes/${classID}/`, {
        headers:{
            'Content-Type': 'application/json',
            Authorization: `JWT ${localStorage.getItem('token')}`,
        }
    })
    .then((res) => {
        let current = res.data.sections
        let output = ""
        if(current)
        {
            for (let i = 0; i < current.length; i++) {
                if(isNumeric(current[i]) && current[i] !== ' '){
                    output += current[i];
                    output += ", "
                }
            }
        }
        output += secNum


        let form_data = new FormData();
        form_data.append('instructor', id);
        form_data.append('sections', output);
        form_data.append('number', secNum);
        (async () => {
            await axios.put(`http://127.0.0.1:8000/classes/${classID}/`, form_data, {
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: `JWT ${localStorage.getItem('token')}`,
                }
            })
            .then((res) => {
                const data = {
                    classID: res.id,
                    data: res.data,
                }
                dispatch(addSection(data));
            })
            .catch(err => {
                const info= {
                    status:400,
                    error:"Failed to create section",
                }
                dispatch(setError(info));
            })
        })()
    })

}