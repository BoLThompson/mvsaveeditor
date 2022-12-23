import React from 'react';
import { useSave } from 'services/saveFile';
import bf from 'services/byteFuncs';
import { portraitMap, decodeString } from 'services/mvTables';

export default function PreviewPane() {
  const save = useSave();

  return <div>
    <div>
      {decodeString(save.data,0x004c,8)}
    </div>
    {
      [
        {
          addr:0x007a,
          byteWidth:1,
          radix:16,
          descr:"Party Size",
          type:"number"
        },
      ].map(item => 
        <div
          key={item.addr}
        >
          <input
            value={bf.hprint(bf.read16(save.data,item.addr),item.byteWidth*2)}
            className={`ByteInput w${item.byteWidth}`}
          />
          <label htmlFor={item.addr}>
            {item.descr}
          </label>
        </div>  
      )
    }
    {
      [
        0x000e,
        0x001a,
        0x0026,
        0x0032,
        0x003e,
        0x004a
      ]
      .slice(0,bf.read16(save.data,0x007a))
      .map(addr => 
        <div
          key={addr}
        >
          <select
            value={bf.read16(save.data,addr)}
          >
            {
              Object.entries(portraitMap).map(p => 
                <option
                  key={p[0]}
                  value={p[0]}
                >
                  {p[1]}
                </option>  
              )
            }
          </select>
        </div>
      )
    }
  </div>
}