import React from 'react'

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

  const api = {

    // updateData(cb) {
    //   let dst = new ArrayBuffer(data.byteLength)
    //   new Uint8Array(dst).set(new Uint8Array(data))

    //   cb(data,dst)

    //   setData(dst)
    // },

    handleFileChange(e){
      //exit if there's no input file
      if (! e.target.files.length) 
        return false
      
      const file = e.target.files[0];

      const reader = new FileReader();
  
      reader.onload = async ({target}) => {
        console.log("got to the async")
        console.log(target)
        setData({
          raw:target.result,
          filename:file.name
        })
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
  }

  return <SaveContext.Provider
    value={{
      ...api,
      data:data.raw,
    }}
  >
    {props.children}
  </SaveContext.Provider>
}

export {SaveProvider, useSave}