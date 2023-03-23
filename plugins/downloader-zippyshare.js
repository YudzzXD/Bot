let { extract } = require('zs-extract')
let { lookup } = require('mime-types')

let handler = async (m, { conn, args }) => {
  if (!args[0]) throw 'Input URL'
  if (!args[0].includes('zippyshare.com')) throw 'Invalid URL'
  await m.reply('Sedang diproses...')
  for (let i = 0; i < args.length; i++) {
    if (!args[i].includes('zippyshare.com/v')) continue
    let res = await extract(args[i])
    let mimetype = await lookup(res.download)
    conn.sendMessage(m.chat, { document: { url: res.download }, fileName: res.filename, mimetype }, { quoted: m })
  }
}
handler.help = ['ippyshare'].map(v => 'z' + v + ' <url>')
handler.tags = ['downloader']
handler.command = /^z(s|ippy(dl|share)?)$/i 
handler.premium = true
module.exports = handler