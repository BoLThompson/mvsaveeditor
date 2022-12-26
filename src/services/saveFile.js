import React from 'react'
import { sectionmap } from './mvTables';
import bf from 'services/byteFuncs'

const SaveContext = React.createContext();

function useSave() {
  const context = React.useContext(SaveContext);
  if (context === undefined)
    throw new Error('useSave must be used from within a SaveProvider')
  return context
}

function SaveProvider(props) {
  const [data,setData] = React.useState({
    data:null
  });

  function readFile(raw, filename) {
    setData(oldData => ({
      raw:raw,
      headers: sectionmap.map(s =>
        bf.header(raw,s.start)
      ),
      checksums: sectionmap.map(s =>
        bf.checksum(raw,s.start,s.length)
      ),
      filename: filename ? filename : oldData.filename
    }))
  }

  const api = {
    handleFileChange(e){
      //exit if there's no input file
      if (! e.target.files.length) 
        return false
      
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = async ({target}) => {
        readFile(target.result,file.name)
      }
  
      reader.readAsArrayBuffer(file)
    },

    download(){
      const blob = new Blob([new Uint8Array(data,0,data.byteLength)])

      const url = window.URL.createObjectURL(
        blob
      )
      const link = document.createElement('a');
      link.href=url;
      link.setAttribute('download',data.filename)
      document.body.appendChild(link)
      link.click();
      link.parentNode.removeChild(link);
    },

    update(cb) {
      let dst = new ArrayBuffer(data.raw.byteLength)
      new Uint8Array(dst).set(new Uint8Array(data.raw))

      const newRaw = cb(dst)

      readFile(newRaw)
    },
  }

  return <SaveContext.Provider
    value={{
      ...api,
      data:data.raw,
      headers:data.headers,
      checksums:data.checksums
    }}
  >
    {props.children}
  </SaveContext.Provider>
}

export {SaveProvider, useSave}