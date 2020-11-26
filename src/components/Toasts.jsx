import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import {X} from 'react-feather'
import 'react-toastify/dist/ReactToastify.minimal.css';

import '../App.css'

export const ToastContainerCustom = () => {
    return (
        <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        closeButton={<X size={18} color="#fff" style={{marginTop: 8}}/>}
        limit={1}
        />
    )
}