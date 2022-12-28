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
              <React.Fragment
                key={s.kanji}
              >
                <th>
                  {s.kanji}
                </th>
                <th>
                  魔
                </th>
              </React.Fragment>
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
                  <React.Fragment
                    key={s[0]}
                  >
                    <td>
                      <ByteInput
                        addr={(c.addr+0x50)+s[0]*2}
                        byteWidth={1}
                        display="dec"
                      />
                    </td>
                    <td>
                      <ByteInput
                        addr={0x5210+s[0]*2}
                        byteWidth={1}
                        display="dec"
                      />
                    </td>
                  </React.Fragment>
                )
              }
            </tr>
          )
        }
      </tbody>
    </table>
  </tt>
}