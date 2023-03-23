let fetch = require('node-fetch')

let handler = async (m, { conn, args }) => {
    if (!args[0]) return
    let ress = await fetch(`http://weeb-scraper.onrender.com/api/anoboy/` + args[0])
    if (!ress) throw 'Error 404 Not Found'
    let res = await ress.json()
    let v = res.data
    let linkvi = res.data.video_embed_links
    let miror = res.data.video_mirrors
    let cap = `*Title :* ${res.data.name || res.data.episode_navigation.nav_name}\n*Synopsis :* ${res.data.synopsis || '-'}\n\n*Link untuk mendownload atau menonton videonya*\n`
    for (let x of linkvi) {
    for (let z of miror) {
    cap += `*Download 1 :*\n${x.resolution || '-'} : ${x.link || '-'}\n*Download 2 :*\n${z.resolution || '-'} : ${z.link || '-'}`
    cap += '' + '\n'
  	} }
    await conn.reply(m.chat, cap, m)
	// By Chandra XD
	// Follow bang
	// TikTok : @pnggilajacn
	// Github : https://github.com/Chandra-XD
	}
handler.command = /^(anoboydl)$/i
handler.limit = true
handler.group = false
module.exports = handler