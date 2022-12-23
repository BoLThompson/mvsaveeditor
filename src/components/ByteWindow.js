import React from 'react';
import bf from 'services/byteFuncs.js'

function ByteWindow(props){
  if (!props.data) return null

  return <tt>
    <table
      style={{
        overflowY:"auto",
        maxHeight:`${props.lines}em`,
        display:"inline-block"
      }}
      // onWheel={handleWheel}
    >
      <tbody>
        {
          // Array.from(Array(props.lines).keys())
          // .map(addr => ({
          //   lineStart:((addr+scroll)*0x10)+props.start,
          // }))

          Array.from(Array((props.length>>4)).keys())
          .map(addr => ({
            lineStart:((addr)*0x10)+props.start,
          }))
          .map(line => ({
            ...line,
            data: Array.from(Array(0x10).keys())
              .map(colAddr => ({
                colAddr:colAddr,
                val:bf.hprint(bf.read8(props.data,line.lineStart+colAddr),2)
              }))
          }))
          .map(line => 
            <tr key={line.lineStart}>
              <td
                className='ByteTableLineStart'
              >
                {bf.hprint(line.lineStart,4)}
              </td>
              {
                line.data.map(cell => 
                  <td
                    key={cell.colAddr}
                    title={bf.hprint(cell.colAddr+line.lineStart,4)}
                  >
                    {cell.val}
                  </td>  
                )
              }
            </tr>  
          )
        }
      </tbody>
    </table>
  </tt>
}

export default React.memo(ByteWindow, (pP,nP) => {
  const pC = bf.checksum(pP.data, pP.start, pP.length)
  const nC = bf.checksum(nP.data, nP.start, nP.length)
  if (pC !== nC)
    return false;
  return true;
})