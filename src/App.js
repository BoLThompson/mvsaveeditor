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

function write16(buffer,address,value) {
  const view = new Uint16Array(buffer);
  view[address>>1] = value
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

function ByteWindowComponent(props){
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
                    title={hprint(cell.colAddr+line.lineStart,4)}
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

const ByteWindow = React.memo(ByteWindowComponent, (pP,nP) => {
  const pC = checksum(pP.data, pP.start, pP.length)
  const nC = checksum(nP.data, nP.start, nP.length)
  if (pC !== nC)
    return false;
  return true;
})

const sectionmap = [
  {
    start:0x0000,
    length:0x1000,
    alt:0x0000,
    synLoc:0x890
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

//78 - 7f party member count, location
//70 - 77 contains bura, playtime
//16x78 - location?
//6a - amigo count? not very responsive though
//6c - amigo 1 fire seirei level?
//78 - amigo 1's assigned party member?

//16x7a is party size (includes protag)
//16x0e is protagonist's portrait
//16x1a is party member 1's portrait
  //spacing of c
//16x26 is party member 2's portrait
//16x32 is party member 3's portrait
//16x3e is party member 4's portrait
//16x4a is party member 5's portrait
const portraitMap = [
  /*0x00*/"male",
  /*0x01*/"female",
  /*0x02*/"kirsche",
  /*0x03*/"blueberry",
  /*0x04*/"chocola",
  /*0x05*/"candy",
  /*0x06*/"ganache",
  /*0x07*/"peche",
  /*0x08*/"lemon",
  /*0x09*/"cabernet",
  /*0x0a*/"cassis",
  /*0x0b*/"cidre",
  /*0x0c*/"arancia",
  /*0x0d*/"cafeaulait",
  /*0x0e*/"pistachio",
  /*0x0f*/"olive",
  /*0x10*/"sesame",
  /*0x11*/"default doll",
  /*0x12*/"pink doll",
  /*0x13*/"green doll, bell head",
  /*0x14*/"yellow doll, bell head",
  /*0x15*/"blue doll, square head",
  /*0x16*/"white doll, square head",
  /*0x17*/"blue doll, baby head",
  /*0x18*/"purple doll, baby head",
  /*0x19*/"mr. congnac",
  /*0x1a*/"white java sparrow",
  /*0x1b*/"dodo",
  /*0x1c*/"pot",
  /*0x1d*/"frog",
  /*0x1e*/"brownie",
  /*0x1f*/"black sparrow",
  /*0x20*/"dogu?",
  /*0x21*/"blue doll, square head again?",
  /*0x22*/"purple bird with horns?",
  /*0x23*/"the caterpiller enemy?",
  /*0x24*/"dumb spinny blue recurring boss",
  /*0x25*/"light mage male",
  /*0x26*/"dark mage male",
  /*0x27*/"light mage female",
  /*0x28*/"dark mage female",
  /*0x29*/"enigma",
  /*0x2a*/"the bird boss from benaconcha",
  /*0x2b*/"old ugly enigma",
  /*0x2c*/"mouse boss?",
  /*0x2d*/"shelled enigma",
  /*0x2e*/"A different dumb spinny recurring blue boss?",
  /*0x2f*/"a toothless wolf?",
  /*0x30*/"some kind of insect?",
  /*0x31*/"that one dog that eats dodos",
  /*0x32*/"walrus",
  /*0x33*/"lava monster?",
  /*0x34*/"ram-horns monster?",
  /*0x35*/"the pot boss?",
  /*0x36*/"eyeball monster?",
  /*0x37*/"worm mouth monster?",
  /*0x38*/"rock triclops?",
  /*0x39*/"toasty",
  /*0x3a*/"flow",
]

//area name is indexed
//suspect that 8x1a is the number of registered amigos
//suspect that 8x92 is amigo1's fire spirit level, each spirit following suit
const charmap = {
  0x0000:"❗",
  0x1000:"★",
  0x2000:" ",
  0x3000:"X",
  0x4000:"➩",
  0x5000:"P",
  0x6000:"ぁ",
  0x7000:"あ",
  0x8000:"け"
}

const addrmap ={
  preview:{
    playerName:0x4c
  }
}

function App() {
  const location = useLocation();
  const [file,setFile] = React.useState();
  const [data,setData] = React.useState();
  const [args,setArgs] = React.useState({
    startAddr:0xa4,
    skipAddr:0x24,
    startVal:0,
    skipVal:0x1000,
    runLength:6,
    iterCount:80,
  })

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

  function updateData(cb) {
    let dst = new ArrayBuffer(data.byteLength)
    new Uint8Array(dst).set(new Uint8Array(data))

    cb(data,dst)

    setData(dst)
  }

  return (
    <div className="App">
      <div>
        {location.pathname}
      </div>
      <div
        style={{
          display:"flex"
        }}
      >
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
        <div>
          {
            [
              "startAddr",
              "skipAddr",
              "startVal",
              "skipVal",
              "runLength",
              "iterCount"
            ]
            .map(item =>
              <div
                key={item}
                style={{
                  display:'flex',
                  justifyContent:"space-between"
                }}
              >
                <label
                  htmlFor={item}
                >
                  {item}
                </label>
                <input
                  type="text"
                  id={item}
                  value={hprint(args[item],1)}
                  onChange={(e) => {
                    e.preventDefault()

                    const str = e.target.value ? e.target.value : "0"
                    const nV = parseInt(str,16)
                    if (nV !== NaN)
                      setArgs(prevArgs=>({
                        ...prevArgs,
                        [e.target.id]:nV
                      }))
                  }}
                />
                {args[item]}
              </div>
            )
          }
          <button
            onClick={()=>{
              updateData((src,dst) => {
                for (let i = 0; i < args.iterCount; i++) {
                  for (let ii = 0; ii < args.runLength; ii++) {
                    write16(
                      dst,
                      args.startAddr+(args.skipAddr*i)+(ii*2),
                      args.startVal+(ii*args.skipVal)+(i*args.runLength*args.skipVal)
                    )
                  }
                }
              })
            }}
          >
            Write
          </button>
        </div>
        <div>
          <button
            onClick={()=>{
              const blob = new Blob([new Uint8Array(data,0,data.byteLength)])

              const url = window.URL.createObjectURL(
                blob
              )
              const link = document.createElement('a');
              link.href=url;
              link.setAttribute('download',file.name)
              document.body.appendChild(link)
              link.click();
              link.parentNode.removeChild(link);
            }}
          >
            Download
          </button>
        </div>
      </div>
      
      <div
        style={{
          display:'flex',
          gap:'2em'
        }}
      >
        <div>
          <tt>
            <table>
              <thead>
                <tr>
                  <th>Section</th>
                  <th>Header</th>
                  <th>Checksum</th>
                  <th>Valid</th>
                  <th></th>
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
                        <td>
                          <button
                            onClick={()=>{
                              const diff = 0xffff - (section.checksum & 0xffff)
                              const syndrome = read16(data,section.synLoc)
                              
                              updateData((src,dst) => {
                                write16(
                                  dst,
                                  section.synLoc,
                                  syndrome+diff
                                )
                              })
                            }}
                          >
                            Fix
                          </button>
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

        <div>
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
                  value={hprint(read16(data,item.addr),item.byteWidth*2)}
                />
                <label htmlfor={item.addr}>
                  {item.descr}
                </label>
              </div>  
            )
          }
        </div>
      </div>
    </div>
  );
}

export default App;
