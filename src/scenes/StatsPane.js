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
                    {bf.read16(save.data,(c.addr+0x50)+s[0]*2)}
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