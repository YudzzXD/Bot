let axios = require('axios');
let handler = async (m, { conn, args }) => {
    if (!args[0]) throw m.reply('Putting *URL* Tiktok...')
    if (!args[0].match(/tiktok/gi)) throw `Invalid *URL*`
    let res = (await axios.get(API('ari', '/downloader/tiktok', { link: args[0] } ))).data;
    if (res.status != 200) throw res.message;
    if (!res) throw res.message;
    await m.reply('Sedang diproses...')
    await conn.sendMessage(m.chat, { video: { url: res?.respon?.video }, caption: wm }, { quoted: m })
}
handler.help = ['tiktok'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(tiktok|tt)$/i
handler.limit = true
handler.group = false
module.exports = handler