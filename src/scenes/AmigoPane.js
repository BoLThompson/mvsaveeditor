import React from 'react';
import { useSave } from 'services/saveFile';
import { decodeString, seireiDefs } from 'services/mvTables';
import bf from 'services/byteFuncs.js'
import './AmigoPane.css'

export default function AmigoPane(){
  const save = useSave()

  return <div
    className="AmigoPane"
  >
    <tt>
      <table>
        <thead>
          <tr>
            <th/>
            <th>
              Name
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
            Array.from(Array(100).keys()).map(i =>
              <tr
                key={i}
              >
                <td
                  className="amigoNumber"
                >
                  {`${i+1}:`}
                </td>
                <td>
                  {decodeString(save.data,0x0080+i*0x24,6)}
                </td>
                {
                  Object.entries(seireiDefs).map(s =>
                    <td
                      key={s[1].kanji}
                      className={"amigoSeireiLevel"}
                    >
                      {
                        ((lv)=>
                          lv ? lv : " "
                        )(
                          bf.read8(save.data,
                            (0x0080+i*0x24)+(0x12+parseInt(s[0]))
                          )
                        )
                      }
                    </td>
                  )
                }
                <td>
                  {
                    bf.hprint(bf.read8(save.data,
                      (0x0080+i*0x24)+0x22),
                      2
                    )
                  }
                </td>
              </tr>  
            )
          }
      </tbody>
    </table>
    </tt>
  </div>
}