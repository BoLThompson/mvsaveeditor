import './App.css';
import React from 'react';
import MvSaveEditor from 'scenes/MvSaveEditor';
import { Outlet, useRoutes, Navigate } from 'react-router-dom';

const addrmap ={
  preview:{
    playerName:0x4c
  }
}

function App() {
  return useRoutes([
    {
      path:"/",
      element: <div className='App'>
          <Outlet/>
        </div>,
      children: [
        {
          path: "mvsaveeditor/*",
          element: <MvSaveEditor/>
        },
        {
          path: "/",
          element: <Navigate to="/mvsaveeditor" replace/>
        }
      ]
    }])
}

export default App;
