let instagramGetUrl = require('fg-ig')
let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `*Perintah ini untuk mengunduh postingan ig/reel/tv, bukan untuk highlight/story!*\n\nContoh:\n${usedPrefix + command} https://www.instagram.com/p/BmjK1KOD_UG/?utm_source=ig_web_copy_link`
    if (!args[0].match(/https:\/\/www.instagram.com\/(p|reel|tv)/gi)) throw `*Link salah! Perintah ini untuk mengunduh postingan ig/reel/tv, bukan untuk highlight/story!*\n\nContoh:\n${usedPrefix + command} https://www.instagram.com/p/BmjK1KOD_UG/?utm_source=ig_web_copy_link`
    let results = (await instagramGetUrl(args[0])).url_list[0]
    m.reply('Sedang diproses...')
    await conn.sendFile(m.chat, results, '', wm, m)
}

handler.help = ['instagram'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(ig|igdl|instagram)$/i
handler.limit = true
handler.group = false
module.exports = handler