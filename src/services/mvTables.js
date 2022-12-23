import bf from "services/byteFuncs"

export const sectionmap = [
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
  
export const portraitMap = [
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
    /*0x0b*/"cider",
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
  
export const charmap = {
    0x0000:"❗",
    0x0010:"★",
    0x0020:" ",
    0x0030:"X",
    0x0040:"➩",
    0x0050:"P",
    0x0060:"ぁ",
    0x0070:"あ",
    0x0080:"け",
    0x043f:"豆",
    0x04ae:"腐",
  }

export function decodeString(buffer,addr,maxLength) {
  let str = ""
  for (let i = 0; i < maxLength; i++) {
    const code = bf.endSwap(bf.read16(buffer,addr+i*2))

    //stop at EOF control character
    if (code === 0xFFFF)
      break;
    
    str = str + (code in charmap ? charmap[code] : "?")
  }
  
  return str
}

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

//area name is indexed
//suspect that 8x1a is the number of registered amigos
//suspect that 8x92 is amigo1's fire spirit level, each spirit following suit