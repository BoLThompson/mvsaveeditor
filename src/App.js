import './App.css';
import { useLocation } from 'react-router-dom'
import React from 'react';

function read8(buffer, address) {
  const view = new Uint8Array(buffer);
  return view[address]
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

function ByteWindow(props){
  const [scroll,setScroll] = React.useState(0)

  if (!props.data) return null

  function handleWheel(e){
    const dir = e.deltaY > 0 ? 1 : -1
    updateScroll(4*dir)
  }

  function updateScroll(delta) {
    function clamp(val,min,max) {
      if (val < min) return min
      if (val > max) return max
      return val
    }

    const newScroll = clamp(scroll+delta,0,(props.length/0x10)-props.lines)

    setScroll(newScroll)
  }

  return <tt>
    <table
      style={{
        // overflowY:"auto",
        // maxHeight:"16em",
        display:"inline-block"
      }}
      onWheel={handleWheel}
    >
      <tbody>
        {
          Array.from(Array(props.lines).keys())
          .map(addr => ({
            lineStart:((addr+scroll)*0x10)+props.start,
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
                className='lineStart'
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
      {
        data ?
          [
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
          ].map(section => 
            <div
              key={section.start}
            >
              <div>
                Checksum: {
                  hprint( checksum(data,section.start,section.length), 8)
                }
              </div>
              <div>
                <ByteWindow 
                  start={section.start}
                  length={section.length}
                  data={data}
                  lines={8}
                />
              </div>
            </div>
          )
        :
        null
      }
    </div>
  );
}

export default App;
