let handler = async (m, { conn, text }) => {

let [nomor, orang, pesan] = text.split('|')
if (!nomor) throw 'Nomornya mana kak?\nContoh : #menfes 628965213****|Ayangmu|Haii sayang nnaa akoohhh\n\nNote :\nFormat nomor harus\n62896xxxxxxxx ✓\nJgn seperti ini\n0896xxxxxxxx ×\n\nHarus diisi semua..!!'
if (!orang) throw 'Dari siapa kak?\nContoh : #menfes 62896xxxxxxxx|Ayangmu|Haii ayang nnaa akoohh\n\nNote :\nFormat nomor harus\n62896xxxxxxxx ✓\nJgn seperti ini\n0896xxxxxxxx ×\n\nHarus diisi semua..!!'
if (!pesan) throw 'Pesannya mana kak?\nContoh : #menfes 62896xxxxxxxx|Orang|Halo kamuh\n\nNote :\nMenulis nomor harus\n62896xxxxxxxx ✓\nJgn seperti ini\n0896xxxxxxxx ×\n\nHarus diisi semua..!!'
let tulisan = `Hai kak ada menfes nih....

Dari: ${orang}
Pesan: ${pesan}`
let fixedNumber = nomor.replace(/[-+<>@]/g, '').replace(/ +/g, '').replace(/^[0]/g, '62') + '@s.whatsapp.net'
await m.reply(`*Sukses mengirim menfes ke nomor ${nomor}*`)
conn.reply(fixedNumber, tulisan, {
key : {
 fromMe: false, 
            participant: `0@s.whatsapp.net`, 
            ...({ remoteJid: "status@broadcast" }) 
        }, 
message: {
imageMessage: {
viewOnce: true
}
}
})}
handler.help = ['menfes <number>|<mesage>']
handler.tags = ['main']
handler.command = /^menfes(wa)?$/i
handler.private = true
handler.limit = true
module.exports = handler