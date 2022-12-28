import React from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import { SaveProvider, useSave } from 'services/saveFile';
import './MvSaveEditor.css'
import PreviewPane from './PreviewPane';
import RawPane from './RawPane';
import NavBar from 'components/NavBar'
import AmigoPane from './AmigoPane';
import StatsPane from './StatsPane';
import InventoryPane from './InventoryPane';
import ReportCard from './ReportCard';

const navitems = [
  {
    link:"preview",
    text:"Save Preview",
    render:<PreviewPane/>
  },
  {
    link:"amigos",
    text:"Amigos",
    render:<AmigoPane/>
  },
  {
    link:"party",
    text:"Party"
  },
  {
    link:"stats",
    text:"Stats",
    render:<StatsPane/>
  },
  {
    link:"inv",
    text:"Inventory",
    render:<InventoryPane/>
  },
  {
    link:"report",
    text:"Report Card",
    render:<ReportCard/>
  },
  {
    link:"progress",
    text:"Game Progress"
  },
  {
    link:"raw",
    text:"Raw Data",
    render:<RawPane/>
  },
]

export default function MvSaveEditor() {
  return useRoutes([
    {
      path:"/*",
      element: <SaveProvider>
        <div className="Window">
          <FilePanel/>
          <Outlet/>
        </div>
      </SaveProvider>,
      children: navitems.map(item =>
        ({
          path:`${item.link}/*`,
          element: <React.Fragment>
            <NavBar tab={item.link} items={navitems}/>
            <div className="WindowInner">
              {item.render}
            </div>
          </React.Fragment>
        })
      )
    },
    {
      path:"/",
      element: <Navigate to="preview" replace/>
    }
  ])
}

function FilePanel() {
  const save = useSave();

  return <div
    style={{
      display:"flex",
      justifyContent:"space-between"
    }}
  >
    <div>
      <input
        onChange={save.handleFileChange}
        id="saveupload"
        name="save"
        type="File"
      />
    </div>
    <button
      onClick={save.download}
    >
      Download
    </button>
  </div>
}