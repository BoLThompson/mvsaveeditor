import React from 'react';
import bf from 'services/byteFuncs.js'
import ByteInput from './ByteInput';

function ByteWindow(props){
  if (!props.data) return null

  return <tt>
    <table
      style={{
        overflowY:"auto",
        maxHeight:`${props.lines}em`,
        display:"inline-block"
      }}
    >
      <tbody>
        {
          //get an array for each 0xXXX0 line of the window
          Array.from(Array((props.length>>4)).keys())
          //calculate each line start address
          .map(addr => ({
            lineStart:((addr)*0x10)+props.start,
          }))
          //calculate the address of each cell in this row
          .map(row => ({
            ...row,
            cells: Array.from(Array(0x10).keys())
              .map(colAddr => ({
                addr:row.lineStart+colAddr,
              }))
          }))
          //now output each row
          .map(row => 
            <tr key={row.lineStart}>
              <td
                className='ByteTableLineStart'
              >
                {bf.hprint(row.lineStart,4)}
              </td>
              {
                row.cells.map(cell => 
                  <td
                    key={cell.addr}
                  >
                    <ByteInput
                      addr={cell.addr}
                      byteWidth={1}
                      display="hex"
                    />
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