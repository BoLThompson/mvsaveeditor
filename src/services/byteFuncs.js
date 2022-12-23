export default {
  read8: function(buffer, address) {
    const view = new Uint8Array(buffer);
    return view[address]
  },
  
  read16: function(buffer,address) {
    const view = new Uint16Array(buffer);
    return view[address>>1]
  },
  
  write16: function(buffer,address,value) {
    const view = new Uint16Array(buffer);
    view[address>>1] = value
  },
  
  hprint: function(v,width){
    if (typeof v === "number")
    return v.toString(16).padStart(width,"0")
  },
  
  checksum: function(buffer,start,length) {
    const view = new Uint16Array(buffer)
  
    let val = 0
  
    for (let i = 0; i < length/2; i++) {
      val += view[(start>>1)+i]
    }
  
    return val
  },
  
  header: function(buffer,start) {
    const view = new Uint16Array(buffer)
    return(view[start>>1] << 16) | view[(start>>1)+1]
  },
  
  hvalid: function(header) {
    return (header === 0x0007564d)
  },
}