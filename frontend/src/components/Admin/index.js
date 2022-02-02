import React, { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { checkUser } from "../../redux/actionCreators/authActionCreator";
import { Route, Routes } from 'react-router-dom';
import Adder from './Data/Adder';
import Report    from './Data/Report';
import Manager from './Data/Manager';
import AddItem from "./Data/Items/AddItem";
import Dashboard from '../Dashboard/Dashboard';
import { fetchClass } from '../../redux/actionCreators/sectionActionCreators';

function Admin() {
    const dispatch = useDispatch();    
  
    const { error, user, mounted } = useSelector(
      (state) =>({
        error:state.auth.error, 
        user:state.auth.user, 
        mounted:state.section.mounted
    }), shallowEqual);

    useEffect(() => {
        if(!mounted){
            dispatch(fetchClass());
        }
    }, [mounted,dispatch]);

    return (
        <Routes>
            {
                user.is_superuser
                ?
                <>
                <Route path="addItem" element={<AddItem/>}/>
                
                <Route path="add" element={<Adder/>} />
                <Route path="manage" element={<Manager/>} />
                <Route path="report" element={<Report/>} />

                <Route path="/*" element={<Dashboard/>} /> 
                </>
                :
                <>
                <Route path="/*" element={<Dashboard/>} /> 
                </>

            }
        </Routes>
    );
}

export default Admin;