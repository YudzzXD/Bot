let { search } = require('yt-search')
let axios = require('axios')
let handler = async (m, { conn, text, usedPrefix }) => {
  if (!text) throw 'Input Query'
  let vid = await search(text)
  if (!vid) throw 'Video/Audio Tidak Ditemukan'
  let anu = vid.videos[Math.floor(Math.random() * vid.videos.length)]
  let { title, thumbnail, videoId, duration, description, views, ago } = anu
  let url = 'https://www.youtube.com/watch?v=' + videoId
  let res = (await axios.get(API('can', '/api/download/ytmp3', { url: url } ))).data;
  if (res.status != 200) throw res.message;
  if (!res) throw res.message;
  let size = res.result.size
  if (size > 180000) throw `*File melebihi batas, download sendiri.!!* ☠️\n\nLink: ${res.result.download}`
  let buttons = [{ buttonText: { displayText: 'Video' }, buttonId:  `.ytv ${url}` }]
  let msg = await conn.sendMessage(m.chat, { image: { url: thumbnail }, caption: `*Title:* ${title}\n*Published:* ${ago}\n*Duration:* ${duration}\n*Views:* ${views}\n*Description:* ${description}\n*Url:* ${url}`, footer: '_Audio on progress..._', buttons }, { quoted: m })
  conn.sendMessage(m.chat, { audio: { url: res.result.download }, mimetype: 'audio/mpeg' }, { quoted: msg })
}
handler.help = ['play'].map(v => v + ' <query>')
handler.tags = ['downloader']
handler.command = ['play', 'song', 'music', 'ytplay']
handler.limit = true
module.exports = handler
