import React from 'react';
import bf from 'services/byteFuncs';
import { useSave } from 'services/saveFile';


// addr=where we readin from
// byteWidth=how many bytes we readin
// display=
//        hex
//        dec


export default function ByteInput(props) {
  const save = useSave();
  const readfunc = props.byteWidth === 1 ? bf.read8 : bf.read16
  const writefunc = props.byteWidth === 1 ? bf.write8 : bf.write16

  const typeMap = {
    hex: {
      width:`${props.byteWidth}em`,
      getValue:()=>{
        return bf.hprint(
          readfunc(save.data,props.addr),
          props.byteWidth*2
        )
      },
      handleChange: (e)=>{
        e.preventDefault()

        const str = e.target.value ? e.target.value : "0"
        const nV = parseInt(str,16)
    
        if (! isNaN(nV))
          save.update(handle => {
            writefunc(handle,props.addr,nV)
            return handle
          })
      }
    },
    dec:{
      width:`${props.byteWidth+1}em`,
      getValue:()=>{
        return readfunc(save.data,props.addr)
      },
      handleChange: (e) => {
        e.preventDefault()
    
        const str = e.target.value ? e.target.value : "0"
        const nV = parseInt(str)
    
        if (!isNaN(nV))
          save.update(handle => {
            writefunc(handle,props.addr,nV)
            return handle
          })
      }
    },
  }
  
  if (props.display in typeMap) {
    const t = typeMap[props.display]
    let value = t.getValue()
    if (typeof value === "undefined") value = ""

    return <input
      style={{
        width:t.width,
        font:'inherit',
        border:"none",
        background:'none',
        textAlign:'center',
      }}
      title={bf.hprint(props.addr,4)}
      className={props.className}
      value={value}
      onChange={t.handleChange}
    />
  }
  else if (props.display === "select")
    return <select
        value={readfunc(save.data,props.addr)}
        onChange={(e)=>{
          e.preventDefault()
      
          if (e.target.value in props.mapping)
            save.update(handle => {
              writefunc(handle,props.addr,e.target.value)
              return handle
            })
        }}
      >
        {
          Object.entries(props.mapping).map(p => 
            <option
              key={p[0]}
              value={p[0]}
            >
              {p[1]}
            </option>  
          )
        }
      </select>
  else return null
}