let limit = 30
let fetch = require('node-fetch')
let { youtubedlv2, youtubedlv3 } = require('@bochilteam/scraper')

let handler = async (m, { conn, args, isPrems, isOwner }) => {
  if (args && /(?:https?:\/{2})?(?:w{3}|m|music)?\.?youtu(?:be)?\.(?:com|be)(?:watch\?v=|\/)([^\s&]+)/i.test(args[0])) {
    let q = '128kbps'
    let v = args[0]
    let res = await fetch(`https://ytdl.pnggilajacn.my.id/yt?url=${args[0]}`)
    res = await res.json()
    if (!res) res = ''
    let { description, ownerChannelName, viewCount, uploadDate, likes, dislikes } = res.result.videoDetails
    let yt = await youtubedlv2(v).catch(async _ => await youtubedlv3(v))
    let dl_url = await yt.audio[q].download()
    let ttl = await yt.title
    let cnx = await yt.audio[q].fileSize
    let size = await yt.audio[q].fileSizeH
    let isLimit = (isPrems || isOwner ? 99 : limit) * 1024 < size
    await m.reply('Sedang diproses...')
    if (cnx > 180000) return conn.sendMessage(m.chat, { text: `*File melebihi batas, download sendiri.!!* ☠️\n\nLink: ${await shortlink(dl_url)}` }, { quoted: m })
    let repl = await conn.sendMessage(m.chat, { [/^(?:-|--)doc$/i.test(args[1]) || isLimit ? 'document' : 'audio']: { url: dl_url }, fileName: `${ttl}.mp3`, mimetype: 'audio/mpeg' }, { quoted: m })
    let caption = `*Title:* ${ttl}\n*Quality:* ${q}\n*Channel:* ${ownerChannelName || ''}\n*Views:* ${viewCount}\n*Upload Date:* ${uploadDate}${likes ? `\n*Likes:* ${likes}` : ''}${dislikes ? `\n*Dislikes*: ${dislikes}` : ''}${description ? `\n*Description:*\n${description}` : ''}`.trim()
    await conn.sendMessage(m.chat, { image: { url: yt.thumbnail }, caption }, { quoted: repl })
    }
  else throw `Invalid URL`
}
handler.help = ['mp3','a'].map(v => 'yt' + v + ` <url>`)
handler.tags = ['downloader']
handler.command = /^yt(a|mp3)$/i
handler.limit = true
module.exports = handler

async function shortlink(url){
isurl = /https?:\/\//.test(url)
return isurl ? (await require('axios').get('https://tinyurl.com/api-create.php?url='+encodeURIComponent(url))).data : ''}
