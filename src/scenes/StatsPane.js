import React from 'react';
import {seireiDefs} from 'services/mvTables'
import bf from 'services/byteFuncs'
import { useSave } from 'services/saveFile';

const characterDefs = [
  {
    name:"Protagonist",
    addr: 0x5130,
  }
]

export default function StatsPane(props) {
  const save = useSave();

  return <tt>
    <table>
      <thead>
        <tr>
          <th>
            Character
          </th>
          {
            seireiDefs.map(s => 
              <th
                key={s.kanji}
              >
                {s.kanji}
              </th>  
            )
          }
        </tr>
      </thead>
      <tbody>
        {
          characterDefs.map(c => 
            <tr
              key={c.addr}
            >
              <td>
                {c.name}
              </td>
              {
                Object.entries(seireiDefs).map(s =>
                  <th
                    key={s[0]}
                  >
                    <ValueInput
                      value={bf.read16(save.data,(c.addr+0x50)+s[0]*2)}
                      onChange={e => {
                        e.preventDefault()

                        save.update(handle => {
                          bf.write16(
                            handle,
                            (c.addr+0x50)+s[0]*2,
                            e.target.value
                          )
                          
                          return handle
                        })
                      }}
                      type="number"
                    />
                  </th>
                )
              }
            </tr>
          )
        }
      </tbody>
    </table>
  </tt>
}

function ValueInput(props) {
  const len = String(props.value).length;

  return <input
    type="number"
    value={typeof props.value === "undefined" ? "" : props.value}
    style={{
      width:`${len+1}em`
    }}
    onChange={props.onChange}
  />
}