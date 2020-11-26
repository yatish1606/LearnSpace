import'bootstrap/dist/css/bootstrap.min.css';
import AppRouter from './components/AppRouter';
import React from 'react';
import { toast } from 'react-toastify';
import { ToastContainerCustom } from './components/Toasts'

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App text-center">
      <AppRouter/>
      <ToastContainerCustom />
    </div>
  );
}

export default App;
