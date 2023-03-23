let handler = async (m, { conn, args }) => {
   if (!args[0]) throw 'Nothing url'
   try {
   let url = API('can', '/api/other/ssweb', { link: args[0] })
   conn.sendMessage(m.chat, { image: { url }, caption: `${args[0]}` }, { quoted: m })
   } catch (e) {
		console.log(e)
		m.reply(`Maaf erjadi kesalahan.`)
	}
}
handler.help = ['ssweb']
handler.tags = ['internet']
handler.command = /^ss(web)?f?$/i
handler.limit = true
handler.fail = null
module.exports = handler