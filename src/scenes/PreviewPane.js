import React from 'react';
import { useSave } from 'services/saveFile';
import bf from 'services/byteFuncs';
import { portraitMap, decodeString } from 'services/mvTables';
import ByteInput from 'components/ByteInput';

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
          <ByteInput
            addr={item.addr}
            byteWidth={1}
            display="dec"
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
          <ByteInput
            addr={addr}
            byteWidth={1}
            display="select"
            mapping={portraitMap}
          />
        </div>
      )
    }
  </div>
}