import'bootstrap/dist/css/bootstrap.min.css';
import AppRouter from './components/AppRouter';
import React from 'react';
import { toast } from 'react-toastify';
import { ToastContainerCustom } from './components/Toasts'
import { Scrollbars } from 'react-custom-scrollbars';

import 'react-toastify/dist/ReactToastify.css';

let width = window.innerWidth - 10
let height = window.innerHeight 

function App() {
  return (
    <div className="App text-center">
        <Scrollbars 
          style={{width, height}}
          autoHide
          autoHideDuration={1000}
          autoHideTimeout={800}
          renderThumbVertical={({ style, ...props }) =>
          <div {...props} style={{ ...style, backgroundColor: '#ddd',borderRadius: 10 , width: 8, paddingRight: 0}}/>
          }
          
        >

          <AppRouter/>
          <ToastContainerCustom />

        </Scrollbars>
        
      
    </div>
  );
}

export default App;
