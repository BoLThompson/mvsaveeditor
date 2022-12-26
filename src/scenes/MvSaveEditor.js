import React from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import { SaveProvider, useSave } from 'services/saveFile';
import './MvSaveEditor.css'
import PreviewPane from './PreviewPane';
import RawPane from './RawPane';
import NavBar from 'components/NavBar'
import AmigoPane from './AmigoPane';
import StatsPane from './StatsPane';

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
    text:"Stats and Inventory",
    render:<StatsPane/>
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
      <button
        onClick={save.parse}
      >
        {
          save.data ? "Reread" : "Parse"
        }
      </button>
    </div>
    <button
      onClick={save.download}
    >
      Download
    </button>
  </div>
}


{/* <div>
  {
    [
      "startAddr",
      "skipAddr",
      "startVal",
      "skipVal",
      "runLength",
      "iterCount"
    ]
    .map(item =>
      <div
        key={item}
        style={{
          display:'flex',
          justifyContent:"space-between"
        }}
      >
        <label
          htmlFor={item}
        >
          {item}
        </label>
        <input
          type="text"
          id={item}
          value={bf.hprint(args[item],1)}
          onChange={(e) => {
            e.preventDefault()

            const str = e.target.value ? e.target.value : "0"
            const nV = parseInt(str,16)
            if (nV !== NaN)
              setArgs(prevArgs=>({
                ...prevArgs,
                [e.target.id]:nV
              }))
          }}
        />
        {args[item]}
      </div>
    )
  }
  <button
    onClick={()=>{
      updateData((src,dst) => {
        for (let i = 0; i < args.iterCount; i++) {
          for (let ii = 0; ii < args.runLength; ii++) {
            bf.write16(
              dst,
              args.startAddr+(args.skipAddr*i)+(ii*2),
              args.startVal+(ii*args.skipVal)+(i*args.runLength*args.skipVal)
            )
          }
        }
      })
    }}
  >
    Write
  </button>
</div> */}

// function ChecksumPanel() {

// }