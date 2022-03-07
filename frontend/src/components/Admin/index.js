import React, { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { checkUser } from "../../redux/actionCreators/authActionCreator";
import { Route, Routes } from 'react-router-dom';
import Adder from './Data/Manage';
import Report    from './Data/Report';
import Checkout from "./Data/Checkout";
import Dashboard from '../Dashboard/Dashboard';
import { fetchClass } from '../../redux/actionCreators/sectionActionCreators';
import Items from './Data/Items';

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
                <Route path="items" element={<Items/>}/>
                
                <Route path="datamanage" element={<Adder/>} />
                <Route path="report" element={<Report/>} />

                <Route path="checkout" element={<Checkout/>} />

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