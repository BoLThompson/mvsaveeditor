import './App.css';
import { useLocation } from 'react-router-dom'
import React from 'react';

function read8(buffer, address) {
  const view = new Uint8Array(buffer);
  return view[address]
}

function read16(buffer,address) {
  const view = new Uint16Array(buffer);
  return view[address>>1]
}

function hprint(v,width){
  if (typeof v === "number")
  return v.toString(16).padStart(width,"0")
}

function checksum(buffer,start,length) {
  const view = new Uint16Array(buffer)

  let val = 0

  for (let i = 0; i < length/2; i++) {
    val += view[(start>>1)+i]
  }

  return val
}

function header(buffer,start) {
  const view = new Uint16Array(buffer)
  return(view[start>>1] << 16) | view[(start>>1)+1]
}

function hvalid(header) {
  return (header === 0x0007564d)
}

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
                val:hprint(read8(props.data,line.lineStart+colAddr),2)
              }))
          }))
          .map(line => 
            <tr key={line.lineStart}>
              <td
                className='ByteTableLineStart'
              >
                {hprint(line.lineStart,4)}
              </td>
              {
                line.data.map(cell => 
                  <td
                    key={cell.colAddr}
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

const sectionmap = [
  {
    start:0x0000,
    length:0x1000,
    alt:0x0000,
  },
  {
    start:0x4000,
    length:0x1000,
    alt:0x9000,
  },
  {
    start:0x5000,
    length:0x2000,
    alt:0xa000
  },
  {
    start:0x7000,
    length:0x2000,
    alt:0xc000
  },
]

const addrmap ={
  preview:{
    playerName:0x4c
  }
}

function App() {
  const location = useLocation();
  const [file,setFile] = React.useState();
  const [data,setData] = React.useState();

  function handleFileChange(e){
    if (e.target.files.length) {
      const inputFile = e.target.files[0];

      setFile(inputFile)
    }
  }

  function readSave(){
    if (!file) return

    const reader = new FileReader();

    reader.onload = async ({target}) => {
      setData(target.result)
    }

    reader.readAsArrayBuffer(file)
  }

  return (
    <div className="App">
      <div>
        {location.pathname}
      </div>
      <div>

        <label
          htmlFor="saveupload"
        >
          Save File:
        </label>
        <input
          onChange={handleFileChange}
          id="saveupload"
          name="save"
          type="File"
        />
        <button
          onClick={readSave}
        >
          Parse
        </button>
      </div>

      <tt>
        <table>
          <thead>
            <tr>
              <th>Section</th>
              <th>Header</th>
              <th>Checksum</th>
              <th>Valid</th>
            </tr>
          </thead>
          <tbody>
            {
              data ?
                sectionmap
                .map(section => ({
                  ...section,
                  checksum:checksum(data,section.start,section.length),
                  header:header(data,section.start)
                }))
                .map(section => 
                  <tr
                    key={section.start}
                  >
                    <td>
                      {hprint(section.start,4)}
                    </td>
                    <td>
                      {
                        hprint(section.header,8)
                      }
                    </td>
                    <td>
                      {hprint(section.checksum,8)}
                    </td>
                    <td>
                      {
                        (hvalid(section.header)) && (section.checksum & 0xFFFF)===0xFFFF ?
                        "." : "!"
                      }
                    </td>
                  </tr>
                )
              :
              null
            }
          </tbody>
        </table>
      </tt>
      {
        sectionmap.map(section => 
          <div key={section.start}>
            <ByteWindow
              data={data}
              start={section.start}
              length={section.length}
              lines={16}
            />
          </div>
        )
      }
    </div>
  );
}

export default App;
