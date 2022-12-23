import React from 'react'

const SaveContext = React.createContext();

function useSave() {
  const context = React.useContext(SaveContext);
  if (context === undefined)
    throw new Error('useSave must be used from within a SaveProvider')
  return context
}

function SaveProvider(props) {
  const [file,setFile] = React.useState();
  const [data,setData] = React.useState();

  const api = {
    parse(){
      if (!file) return
  
      const reader = new FileReader();
  
      reader.onload = async ({target}) => {
        setData(target.result)
      }
  
      reader.readAsArrayBuffer(file)
    },

    updateData(cb) {
      let dst = new ArrayBuffer(data.byteLength)
      new Uint8Array(dst).set(new Uint8Array(data))

      cb(data,dst)

      setData(dst)
    },

    handleFileChange(e){
      if (e.target.files.length) {
        const inputFile = e.target.files[0];

        setFile(inputFile)
      }
    },

    download(){
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
    },
  }

  return <SaveContext.Provider
    value={{
      ...api,
      file:file,
      data:data,
    }}
  >
    {props.children}
  </SaveContext.Provider>
}

export {SaveProvider, useSave}