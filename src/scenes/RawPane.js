import React from 'react';
import { useSave } from 'services/saveFile';
import bf from 'services/byteFuncs';
import { sectionmap } from 'services/mvTables';
import ByteWindow from 'components/ByteWindow';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import './RawPane.css'
import NavBar from 'components/NavBar';

export default function RawPane() {
  const save = useSave();

  const navitems = Array.from(Array(4).keys()).map(i => ({
    link:`section${i+1}`,
    text:`Section ${i+1}`,
  }))

  return useRoutes([
    {
      path:"/*",
      element: <React.Fragment>
        <div
          className='RawPane'
        >
          <div>
            <Integrity/>
          </div>
          <div className='Window'>
            <Outlet/>
          </div>
        </div>
      </React.Fragment>,
      children: Object.entries(navitems).map(i => ({
        path: i[1].link,
        element: <div>
          <NavBar tab={i[1].link} items={navitems}/>
          <div className='WindowInner'>
            <ByteWindow
              data={save.data}
              start={sectionmap[i[0]].start}
              length={sectionmap[i[0]].length}
              lines={16}
            />
          </div>
        </div>
      }))
    },
    {
      path:"/",
      element:<Navigate to="section1" replace/>
    }
  ])
  
  // return <div
  //   style={{
  //     display:'flex',
  //     gap:'2em'
  //   }}
  // >
  //   <div>
      
  //     {
  //       sectionmap.map(section => 
  //         <div key={section.start}>
  //           <ByteWindow
  //             data={save.data}
  //             start={section.start}
  //             length={section.length}
  //             lines={16}
  //           />
  //         </div>
  //       )
  //     }
  //   </div>
  // </div>
}

function Integrity(){
  const save = useSave();

  return <tt>
    <table>
      <thead>
        <tr>
          <th>Section</th>
          <th>Header</th>
          <th>Checksum</th>
          <th>Valid</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {
          save.data ?
            sectionmap
            .map(section => ({
              ...section,
              checksum:bf.checksum(save.data,section.start,section.length),
              header:bf.header(save.data,section.start)
            }))
            .map(section => 
              <tr
                key={section.start}
              >
                <td>
                  {bf.hprint(section.start,4)}
                </td>
                <td>
                  {
                    bf.hprint(section.header,8)
                  }
                </td>
                <td>
                  {bf.hprint(section.checksum,8)}
                </td>
                <td>
                  {
                    (bf.hvalid(section.header)) && (section.checksum & 0xFFFF)===0xFFFF ?
                    "." : "!"
                  }
                </td>
                <td>
                  <button
                    onClick={()=>{
                      const diff = 0xffff - (section.checksum & 0xffff)
                      const syndrome = bf.read16(save.data,section.synLoc)
                      
                      save.updateData((src,dst) => {
                        bf.write16(
                          dst,
                          section.synLoc,
                          syndrome+diff
                        )
                      })
                    }}
                  >
                    Fix
                  </button>
                </td>
              </tr>
            )
          :
          null
        }
      </tbody>
    </table>
  </tt>
}