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
            Object.entries(sectionmap)
            .map(s => 
              <tr
                key={s[0]}
              >
                <td>
                  {bf.hprint(s[1].start,4)}
                </td>
                <td>
                  {bf.hprint(save.headers[s[0]],8)}
                </td>
                <td>
                  {bf.hprint(save.checksums[s[0]],8)}
                </td>
                <td>
                  {
                    bf.hvalid(save.headers[s[0]]) &
                    ! ((save.checksums[s[0]] & 0xFFFF) ^ 0xFFFF)
                    ?
                    "Yes"
                    :
                    "No"
                  }
                </td>
                <td>
                  <button
                    onClick={()=>{
                      const diff = 0xffff - (save.checksums[s[0]] & 0xffff)
                      const syndrome = bf.read16(save.data,s[1].synLoc)
                      
                      save.update(handle => {
                        bf.write16(
                          handle,
                          s[1].synLoc,
                          syndrome+diff
                        )

                        return handle
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