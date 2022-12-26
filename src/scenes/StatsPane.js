import React from 'react';
import {seireiDefs} from 'services/mvTables'
import { useSave } from 'services/saveFile';
import ByteInput from 'components/ByteInput';

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
                    <ByteInput
                      addr={(c.addr+0x50)+s[0]*2}
                      byteWidth={1}
                      display="dec"
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