let axios = require('axios');
let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `Contoh:\n ${usedPrefix + command} http://www.icocofun.com/share/post/457616496291?lang=id&pkg=id&share_to=copy_link&m=c6d95b35bbbbf91ce3da574262388117&d=f7445b55ca8eb354536296f34f9c2a878ccc7704deeb8e2840eed6641f41c5d7&nt=4`
    if (!args[0].includes("cocofun")) throw `Invalid *URL*`
    let res = (await axios.get(API('can', '/api/download/cocofun', { url: args[0] } ))).data;
    if (res.status != 200) throw res.message;
    if (!res) throw res.message;
    let x = res.result
    await conn.sendMessage(m.chat, { video: { url: `${x.no_watermark}`}, caption: `*Title :* ${x.caption || '-'}\n*Durasi :* ${x.duration || '-'} detik\n*Diputar :* ${x.play || '-'} kali\n*Like :* ${x.like || '-'} kali\n*Dishare :* ${x.share || '-'} kali`}, { quoted: m })
}
handler.help = ['cocofun'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(cocofun|cocofundl)$/i
handler.limit = true
handler.group = false
module.exports = handler