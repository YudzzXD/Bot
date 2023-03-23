let fs = require('fs') 
let chalk = require('chalk')
let waifu = JSON.parse(fs.readFileSync('./media/waifu.json'))

// Ini owner real no fek"
owner = [
  ['6285840104297'], // global owner 0
  ['6283129109022'], // global owner 1
  ['6287748217883'], // global owner 2
  ['6285840104297', 'Yuds ID', true] // global owner 3
]

// Ini cuma nampilin di plugins/info-creator.js
owner2 = [
'6285840104297', // global owner 1
'6287748217883', // global owner 2
'6283129109022' // global owner 3
]

apilolhuman = ['a243d5d9b0d811b81d63e6cf', '8e66d0934cf741bfd2182c16', '8e66d0934cf741bfd2182c16', '2e0da1f78d1721134b21816d', '902c3bc9d8c08b0dcf8f5373', '808693688ecc695293359089', '85faf717d0545d14074659ad']
lolkey = pickRandom(apilolhuman) // klo punya apikey sendiri hapus aja ganti apikeylu
viokey = 'beta' // gausah diganti ini
itsuka = 'ItsukaChan' // gausah di ganti ini

mods = [] // Want some help?
prems = [] // Premium user has unlimited limit
APIs = {
  nrtm: 'https://nurutomo.herokuapp.com',
  violetics : 'https://violetics.pw',
  lol: 'https://api.lolhuman.xyz',
  males: 'https://malesin.xyz',
  can: 'https://pnggilajacn.my.id',
  ari: 'https://api.akuari.my.id'
}
APIKeys = {
  'https://api.lolhuman.xyz': 'SadTeams',
  'https://violetics.pw': 'beta',
  'https://pnggilajacn.my.id': 'ItsukaChan'
}

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

const spack = fs.readFileSync("lib/exif.json")
const stickerpack = JSON.parse(spack)
if (stickerpack.spackname == '') {
  var sticker_name = '© 𝙄𝙩𝙨𝙪𝙠𝙖𝘽𝙤𝙩-𝙈𝙙'
  var sticker_author = '𝘾𝙝𝙖𝙣𝙙𝙧𝙖 𝙓𝘿'
} else {
  var sticker_name = stickerpack.spackname
  var sticker_author = stickerpack.sauthor
}

const file_exif = "lib/exif.json"
fs.watchFile(file_exif, () => {
  fs.unwatchFile(file_exif)
  console.log(chalk.redBright("Update 'exif.json'"))
  delete require.cache[file_exif]
  require('./lib/exif.json')
})

// Template button
global.dtu = 'ᴅᴏɴᴀᴛᴇ'
global.urlnya = "https://pnggilajacn.my.id/contacts"

// Random
global.doc = pickRandom(["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.presentationml.presentation", "application/msword", "application/pdf"])
global.img = pickRandom(waifu)
global.ephemeral = '86400' // 86400 = 24jam, kalo ingin di hilangkan ganti '86400' jadi 'null' atau ''

// Sticker WM
packname = sticker_name
author = sticker_author
wm = `Jangan lupa donasi kak\nDana : 087748217883\nPulsa : 085840104297`
wm2 = `© WhatsApp Bot | WhatsApp LLC`
jepang = 'ルールはルール'

Intervalmsg = 900 // Ini antispam, klo pengen lama tambahin jadi 1800
multiplier = 100
rpg = {
  emoticon(string) {
    string = string.toLowerCase()
    let emot = {
      exp: '✉️',
      money: '💵',
      potion: '🥤',
      diamond: '💎',
      common: '📦',
      uncommon: '🎁',
      mythic: '🗳️',
      legendary: '🗃️',
      pet: '🎁',
      trash: '🗑',
      armor: '🥼',
      sword: '⚔️',
      wood: '🪵',
      rock: '🪨',
      string: '🕸️',
      horse: '🐎',
      cat: '🐈' ,
      dog: '🐕',
      fox: '🦊',
      petFood: '🍖',
      iron: '⛓️',
      gold: '👑',
      emerald: '💚'
    }
    let results = Object.keys(emot).map(v => [v, new RegExp(v, 'gi')]).filter(v => v[1].test(string))
    if (!results.length) return ''
    else return emot[results[0][0]]
  }
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  delete require.cache[file]
  require(file)
})

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}
