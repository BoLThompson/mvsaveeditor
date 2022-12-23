import React from 'react';
import { useSave } from 'services/saveFile';
import bf from 'services/byteFuncs';

export default function PreviewPane() {
  const save = useSave();

  return <div>
    {
      [
        {
          addr:0x07a,
          byteWidth:2,
          radix:16,
          descr:"Party Size"
        }
      ].map(item => 
        <div
          key={item.addr}
        >
          <input
            value={bf.hprint(bf.read16(save.data,item.addr),item.byteWidth*2)}
          />
          <label htmlFor={item.addr}>
            {item.descr}
          </label>
        </div>  
      )
    }
  </div>
}