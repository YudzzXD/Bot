let handler = m => m

handler.all = async function (m, { isBlocked }) {
    if (isBlocked) return
    
    let ass = /^ass?alam|اَلسَّلاَمُ عَلَيْكُمْ|السلام عليکم$/i 
    let isAss = ass.exec(m.text)
    let assal = [
'🙏',
'😇',
'😅'
]
let assl = assal[Math.floor(Math.random() * assal.length)]
    if (isAss && !m.fromMe) {
    let infonya = ` 📚 _وَعَلَيْكُمْ السَّلاَمُ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ_\n_wa\'alaikumussalam wr.wb._\n
*ᴏʀᴀɴɢ ʏᴀɴɢ ᴍᴇɴɢᴜᴄᴀᴘᴋᴀɴ ꜱᴀʟᴀᴍ ꜱᴇᴘᴇʀᴛɪ ɪɴɪ ᴍᴀᴋᴀ ɪᴀ ᴍᴇɴᴅᴀᴘᴀᴛᴋᴀɴ 30 ᴘᴀʜᴀʟᴀ, ᴋᴇᴍᴜᴅɪᴀɴ, ᴏʀᴀɴɢ ʏᴀɴɢ ᴅɪʜᴀᴅᴀᴘᴀɴ ᴀᴛᴀᴜ ᴍᴇɴᴅᴇɴɢᴀʀɴʏᴀ ᴍᴇᴍʙᴀʟᴀꜱ ᴅᴇɴɢᴀɴ ᴋᴀʟɪᴍᴀᴛ ʏᴀɴɢ ꜱᴀᴍᴀ ʏᴀɪᴛᴜ ᴡᴀᴀʟᴀɪᴋᴜᴍᴜsꜱᴀʟᴀᴍ ᴡᴀʀᴀʜᴍᴀᴛᴜʟʟᴀʜɪ ᴡᴀʙᴀʀᴀᴋᴀᴛᴜʜ” ᴀᴛᴀᴜ ᴅɪᴛᴀᴍʙᴀʜ ᴅᴇɴɢᴀɴ ʏᴀɴɢ ʟᴀɪɴ (ᴡᴀʀɪᴅʜᴡᴀᴀɴᴀ). ᴀʀᴛɪɴʏᴀ ꜱᴇʟᴀɪɴ ᴅᴀʀɪᴘᴀᴅᴀ ᴅᴏ'ᴀ ꜱᴇʟᴀᴍᴀᴛ ᴊᴜɢᴀ ᴍᴇᴍɪɴᴛᴀ ᴘᴀᴅᴀ ᴀʟʟᴀʜ ꜱᴡᴛ"* `
    conn.sendMessage(m.chat, {
        react: {
          text: `${assl}`,
          key: m.key,
        }})
    setTimeout(() => {
    conn.reply(m.chat, infonya, m )
    }, 1000)
    }
    // pengen nambahin?? salin trs ganti kata"nya

}

handler.limit = false
module.exports = handler