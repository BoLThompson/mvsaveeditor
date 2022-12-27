import bf from "services/byteFuncs"

export const sectionmap = [
    {
      start:0x0000,
      length:0x1000,
      alt:0x0000,
      synLoc:0x0e90,
    },
    {
      start:0x4000,
      length:0x1000,
      alt:0x9000,
      synLoc:0x4004,
    },
    {
      start:0x5000,
      length:0x2000,
      alt:0xa000,
      synLoc:0x5004,
    },
    {
      start:0x7000,
      length:0x2000,
      alt:0xc000,
      synLoc:0x7004,
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
    /*0x3b*/"flint",
    /*0x3c*/"air",
    /*0x3d*/"lux",
    /*0x3e*/"nerve",
    /*0x3f*/"wish",
    //everything? beyond this point is just more basic MDs
  ]
  
export const charmap = {
    0x0000:"❗",
    0x0010:"★",
    0x0020:" ",
    0x0030:"X",
    0x0040:"➩",
    0x41:"A",0x42:"B",0x43:"C",0x44:"D",0x45:"E",
    0x46:"F",0x47:"G",0x48:"H",0x49:"I",0x4a:"J",
    0x4b:"K",0x4f:"L",0x4d:"M",0x4e:"N",0x4f:"O",
    0x50:"P",0x51:"Q",0x52:"R",0x53:"S",0x54:"T",
    0x55:"U",0x56:"V",0x57:"W",0x58:"X",0x59:"Y",
    0x5a:"Z",
    0x0744:"a",0x0745:"b",0x0746:"c",0x0747:"d",
    0x0748:"e",0x0749:"f",0x074a:"g",0x074b:"h",
    0x074c:"i",0x074d:"j",0x074e:"k",0x074f:"l",
    0x0750:"m",0x0751:"n",0x0752:"o",0x0753:"p",
    0x0754:"q",0x0755:"r",0x0756:"s",0x0757:"t",
    0x0758:"u",0x0759:"v",0x075a:"w",0x075b:"x",
    0x075c:"y",0x075d:"z",
    0x0060:"ぁ",
    0x70:"あ",0x71:"ア",0x72:"い",0x73:"イ",0x74:"う",0x75:"ウ",0x76:"え",0x77:"エ",0x78:"お",0x79:"オ",
    0x7a:"か",0x7b:"カ",0x7c:"き",0x7d:"キ",0x7e:"く",0x7f:"ク",0x80:"け",0x81:"ケ",0x82:"こ",0x83:"コ",
    0x84:"さ",0x85:"サ",0x86:"し",0x87:"シ",0x88:"す",0x89:"ス",0x8a:"せ",0x8b:"セ",0x8c:"そ",0x8d:"ソ",
    0x8e:"た",0x8f:"タ",0x90:"ち",0x91:"チ",0x92:"つ",0x93:"ツ",0x94:"て",0x95:"テ",0x96:"と",0x97:"ト",
    0x98:"な",0x99:"ナ",0x9a:"に",0x9b:"ニ",0x9c:"ぬ",0x9d:"ヌ",0x9e:"ね",0x9f:"ネ",0xa0:"の",0xa1:"ノ",
    0xa2:"は",0xa3:"ハ",0xa4:"ひ",0xa5:"ヒ",0xa6:"ふ",0xa7:"フ",0xa8:"へ",0xa9:"ヘ",0xaa:"ほ",0xab:"ホ",
    0xac:"ま",0xad:"マ",0xae:"み",0xaf:"ミ",0xb0:"む",0xb1:"ム",0xb2:"め",0xb3:"メ",0xb4:"も",0xb5:"モ",
    0xb6:"や",0xb7:"ヤ",0xb8:"ゆ",0xb9:"ユ",0xba:"よ",0xbb:"ヨ",
    0xbc:"ら",0xbd:"ラ",0xbe:"り",0xbf:"リ",0xc0:"る",0xc1:"ル",0xc2:"れ",0xc3:"レ",0xc4:"ろ",0xc5:"ロ",
    0xc6:"わ",0xc7:"ワ",0xc8:"を",0xc9:"ヲ",0xca:"ん",0xcb:"ン",
    0xcc:"ゔ",0xcd:"ヴ",
    0xce:"が",0xcf:"ガ",0xd0:"ぎ",0xd1:"ギ",0xd2:"ぐ",0xd3:"グ",0xd4:"げ",0xd5:"ゲ",0xd6:"ご",0xd7:"ゴ",
    0xd8:"ざ",0xd9:"ザ",0xda:"じ",0xdb:"ジ",0xdc:"ず",0xdd:"ズ",0xde:"ぜ",0xdf:"ゼ",0xe0:"ぞ",0xe1:"ゾ",

    0x043f:"豆",
    0x04ae:"腐",
  }

export const seireiDefs = [
  {
    kanji:'火',
    elem:"Fire",
    name:"Toasty",
  },
  {
    kanji:'風',
    elem:"Wind",
    name:"Air",
  },
  {
    kanji:'毒',
    elem:'Poison',
    name:"Boo",
  },
  {
    kanji:'美',
    elem:"Beauty",
    name:"Powder"
  },
  {
    kanji:'刃',
    elem:'Blade',
    name:'Slash',
  },
  {
    kanji:'音',
    elem:"Sound",
    name:"Hamming"
  },
  {
    kanji:'石',
    elem:"Stone",
    name:"Flint"
  },
  {
    kanji:'虫',
    elem:'Bug',
    name:'Buzz'
  },
  {
    kanji:'木',
    elem:"Wood",
    name:"Stick"
  },
  {
    kanji:'獣',
    elem:"Beast",
    name:"Gar"
  },
  {
    kanji:'水',
    elem:"Water",
    name:"Flow",
  },
  {
    kanji:'雷',
    elem:'Lightning',
    name:'Tesla'
  },
  {
    kanji:'古',
    elem:'Ancient',
    name:'Clock'
  },
  {
    kanji:'闇',
    elem:"Darkness",
    name:"Nerve"
  },
  {
    kanji:"光",
    elem:"Light",
    name:"Lux",
  },
  {
    kanji:"愛",
    elem:"Love",
    name:"Wish"
  }
]

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

//70 - 77 contains bura, playtime
//16x78 - location?

//16x7a is party size (includes protag)
//16x0e is protagonist's portrait
//16x1a is party member 1's portrait
  //spacing of c
//16x26 is party member 2's portrait
//16x32 is party member 3's portrait
//16x3e is party member 4's portrait
//16x4a is party member 5's portrait

//0x0004 probably player's level
//0x005c onwards is strangely related to the protag's unlocked magics. Accepted values are 01 and... the correct level of that magic?
//0x0008 is current hp
//0x000c is current MP
//0x006d is the character type
  //0 for mprotag
  //1a for fdark (requires all seirei to be learned except light)
//16x0074 is bura (preview only :/)
//0x0080 first amigo's name
  //amigo data is 0x25 bytes wide
  //+8 = bit 0 is enable, disable. >> 1 =index of the friend it's set to
    //this uses a different index than the portraits

//16x5180 is the protagonist's actual fire seirei level.

//area name is indexed at 16x78
  //16x400c is the room you'll load in to
//suspect that 8x1a is the number of registered amigos
//suspect that 8x92 is amigo1's fire spirit level, each spirit following suit

//0x4210 looks to be the start of actor data for the room you saved in
  //don't fucking touch this

//0x513e changed after a battle
//  so did 0x5204
//editing 0x5267 changed kirsche's current health, he was party slot 2
//0x517c is related to protag experience points
//16x5210 the number of fire spells the protagonist has learned
//16x5200 - each word here is a spell equipped to the protagonist
//  0x513b   0x0513a
/* :XXXXXXXX XXXXXXXX XXXXXXXXX
    |||||||| ||||||\\_ protagonist's level << 2
    |||||||| |
    \\\\\\\\ \________ protagonist's current HP?
*/