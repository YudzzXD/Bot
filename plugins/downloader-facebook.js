const fetch = require('node-fetch')
const { MessageType } = require('@adiwajshing/baileys')
let handler = async (m, { conn, args, usedPrefix }) => {
	if (!args[0]) return m.reply('Putting *URL* Facebook..')
	if (/^https?:\/\/.*(fb.watch|facebook.com)/i.test(m.text)) throw `Url salah.....`
  //  let res = await fetch(`https://api.violetics.pw/api/downloader/facebook?apikey=${global.viokey}&url=` + args[0])
     let res = await fetch(`https://api.lolhuman.xyz/api/facebook?apikey=${global.lolkey}&url=` + args[0])
     let json = await res.json()
     if (!json.status) throw json
    // let url = `${json.result.hd.url || json.result.sd.url}`
     let url = json.result
	 m.reply('Sedang diproses...')
	if (url) await conn.sendFile(m.chat, url, 'fb.mp4', `*🔗 Url:* ${await shortlink(url)}`, m)
	else m.reply('Link download tidak ditemukan')
	}
handler.help = ['fb'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^f((b|acebook)(dl|download)?(er)?)$/i
handler.limit = true
handler.group = false
module.exports = handler

async function shortlink(url) {
isurl = /https?:\/\//.test(url)
return isurl ? (await require('axios').get('https://tinyurl.com/api-create.php?url='+encodeURIComponent(url))).data : ''
}