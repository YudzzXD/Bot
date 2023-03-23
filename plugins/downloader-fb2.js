let fetch = require('node-fetch')
let handler = async (m, { conn, command, args, usedPrefix }) => {
    if (!args[0]) return m.reply('Putting *URL* Facebook..') 
    if (/^https?:\/\/.*(fb.watch|facebook.com)/i.test(m.text)) throw `Url salah.....`
    let res = await fetch(`https://api.violetics.pw/api/downloader/facebook?apikey=${global.viokey}&url=` + args[0])
    let json = await res.json()
    let url = `${json.result.hd.url || json.result.sd.url}`
    if (!json.status) throw json
    await m.reply('Sedang diproses...')
    await conn.sendFile(m.chat, url, 'fb.mp4', `*🔗 Url:* ${await shortlink(url)}`, m)
}
handler.help = ['fb2'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^f((b|acebook|)(dl|download)?(er)?(2)?)$/i
handler.limit = true
handler.group = false
module.exports = handler

async function shortlink(url) {
isurl = /https?:\/\//.test(url)
return isurl ? (await require('axios').get('https://tinyurl.com/api-create.php?url='+encodeURIComponent(url))).data : ''
}