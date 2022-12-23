import './App.css';
import React from 'react';
import MvSaveEditor from 'scenes/MvSaveEditor';
import { Outlet, useRoutes, Navigate } from 'react-router-dom';

//78 - 7f party member count, location
//70 - 77 contains bura, playtime
//16x78 - location?
//6a - amigo count? not very responsive though
//6c - amigo 1 fire seirei level?
//78 - amigo 1's assigned party member?

//16x7a is party size (includes protag)
//16x0e is protagonist's portrait
//16x1a is party member 1's portrait
  //spacing of c
//16x26 is party member 2's portrait
//16x32 is party member 3's portrait
//16x3e is party member 4's portrait
//16x4a is party member 5's portrait

//area name is indexed
//suspect that 8x1a is the number of registered amigos
//suspect that 8x92 is amigo1's fire spirit level, each spirit following suit

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
