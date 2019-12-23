
const defaultItems = [
//-----------------------------Weapon----------------------------
  {
    name: "Staff of Compilation",
    slot: 'Weapon',
    description: 'Hit and Run without debugging',
    effect: "magic_power",
    effect_value: 10,
    price: 300,
    equipped: false,
    picture: 'https://image.flaticon.com/icons/png/512/2380/2380051.png'
  },
  {
    name: 'Decrementer',
    slot: 'Weapon',
    description: 'Few iterations and your health is gone',
    effect: "physical_power and health",
    effect_value: 5,
    price: 300,
    equipped: false,
    picture: 'https://image.flaticon.com/icons/png/512/681/681767.png'
  },
  {
    name: "Agile Bow",
    slot: 'Weapon',
    description: 'Agile and deadly',
    effect: "physical_power",
    effect_value: 10,
    price: 300,
    equipped: false,
    picture: 'http://icons.iconarchive.com/icons/chanut/role-playing/256/Bow-Arrow-icon.png'
  },
  {
    name: "Python Flail",
    slot: 'Weapon',
    description: 'x++ at home: x +=1',
    effect: "magic_power and health",
    effect_value: 5,
    price: 300,
    equipped: false,
    picture: 'https://image.flaticon.com/icons/png/512/2074/2074800.png'
  },
  {
    name: "RESTful sword",
    slot: 'Weapon',
    description: '',
    effect: "",
    effect_value: 0,
    price: 0,
    equipped: false,
    picture: 'https://image.flaticon.com/icons/png/512/1037/1037974.png'
  },
  {
    name: "Nullifier (bow)",
    slot: 'Weapon',
    description: '',
    effect: "",
    effect_value: 0,
    price: 0,
    equipped: false,
    picture: 'https://cdn2.iconfinder.com/data/icons/flat-icons-19/512/Hunting_bow.png'
  },
  {
    name: "Wand of Pointers",
    slot: 'Weapon',
    description: 'Pointer to lower health',
    effect: "",
    effect_value: 0,
    price: 0,
    equipped: false,
    picture: 'https://image.flaticon.com/icons/png/512/867/867855.png'
  },
//----------------------------Usable-------------------------
  {
    name: "Health Potion",
    slot: 'Usable',
    description: 'Drink and be healed',
    effect: "regains hp",
    effect_value: 100,
    price: 100,
    equipped: false,
    picture: 'https://image.flaticon.com/icons/png/512/1037/1037966.png'
  },
  {
    name: "Scroll of Timestamp",
    slot: 'Usable',
    description: 'One cheat day won\'t hurt me',
    effect: "no daily task failure penalty",
    effect_value: 0,
    price: 1000,
    equipped: false,
    picture: 'https://image.flaticon.com/icons/png/512/1037/1037988.png'
  },
]

module.exports = defaultItems;