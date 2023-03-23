let moment = require('moment-timezone')
let handler = m => m

handler.before = async function (m) {
    if (m.chat.endsWith('broadcast') || m.key.remoteJid.endsWith('broadcast')) return
    if (m.fromMe) return
    if (m.isGroup) return
   // if (db.data.settings.groupOnly) return
    let user = global.db.data.users[m.sender]
    let { banned } = db.data.users[m.chat]
    let username = conn.getName(m.sender) 
    if (new Date - user.pc < 86400000) return // setiap 24 jam sekali
 //   await conn.modifyChat(m.chat, 'mute', -Math.floor(new Date / 1e3) * 1e3 - 1e3).catch(console.log)
let tulisan = `${ucapan()}

${banned ? `kamu *terbanned* kak 😕\nHubungi: wa.me/${owner[0]}` : 'Perkenalkan saya *WhatsApp Bot*, bot yang dikembangkan oleh WhatsApp LLC\nWhatsApp Bot adalah bot whatsapp yang di bangun menggunakan Nodejs, yang berfungsi untuk memudahkan pengguna WhatsApp atau juga dapat berperan sebagai asisten virtual yang membalas setiap pesan WhatsApp secara otomatis dalam hitungan detik.\n\nSilahkan ketik :\n*#menu* untuk melihat semua fitur yang ada di bot.\n*#rules* untuk melihat peraturan yang ditentukan oleh bot.\n*#limit* untuk melihat limit, dan jika bot tidak merespon chat kamu berarti limit kamu sudah habis\n\nJoin gc jika kamu ingin mendownload sesuatu, baca rules jika melanggar langsung kick and banned https://wahyudiid.w3spaces.com'}
`.trim()
conn.reply(m.chat, tulisan, m)
    user.pc = new Date * 1
}

module.exports = handler
function ucapan() {
        const hour_now = moment.tz('Asia/Jakarta').format('HH')
        var ucapanWaktu = 'Ohayou...'
        if (hour_now >= '03' && hour_now <= '10') {
          ucapanWaktu = 'Ohayou...'
        } else if (hour_now >= '10' && hour_now <= '15') {
          ucapanWaktu = 'Konnichiwa...'
        } else if (hour_now >= '15' && hour_now <= '17') {
          ucapanWaktu = 'Konnichiwa...'
        } else if (hour_now >= '17' && hour_now <= '18') {
          ucapanWaktu = 'Konbanwa...'
        } else if (hour_now >= '18' && hour_now <= '23') {
          ucapanWaktu = 'Konbanwa...'
        } else {
          ucapanWaktu = 'Konbanwa'
        }	
        return ucapanWaktu
}