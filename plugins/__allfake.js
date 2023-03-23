let fs = require('fs')
let fetch = require('node-fetch')

let handler = m => m
handler.all = async function (m) {
	let pp = 'https://telegra.ph/file/2d06f0936842064f6b3bb.png'
	try {
		pp = await this.profilePictureUrl(m.sender, 'image')
	} catch (e) {
	} finally {
		
        global.bg = await (await fetch(img)).buffer()
		global.doc = pickRandom(["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.presentationml.presentation", "application/msword", "application/pdf"])
		
		// Ini untuk command crator/owner
		global.kontak2 = [
         [owner2[0], await this.getName(owner[0] + '@s.whatsapp.net'), 'Developer Bot', 'wahyudi.my.id@gmail.com', true],
         [owner2[1], await this.getName(owner[1] + '@s.whatsapp.net'), 'Developer Ke 2', 'wahyudi.my.id@gmail.com', true],
         [owner2[2], await this.getName(owner[2] + '@s.whatsapp.net'), 'Yuds ID', 'Nothing', true], // Kalo mau di tambah tinggal copy 1baris ini di tempel di bawahnya trs di edit dikit!
        ]
		
		// pesan sementara
		global.ephemeral = '86400' // 86400 = 24jam, kalo ingin di hilangkan ganti '86400' jadi 'null' atau ''

                // Module
                global.fetch = require('node-fetch')

		// Troli
		global.ftroli = { key: { remoteJid: 'status@broadcast', participant: '0@s.whatsapp.net' }, message: { orderMessage: { itemCount: 9999999999999999999999999999999999999999999999999999999, status: 1, surface: 1, message: wm2, orderTitle: wm2, sellerJid: '0@s.whatsapp.net' } } }
		
		// Kontak
		global.fkontak = { key: {participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: `status@broadcast` } : {}) }, message: { 'contactMessage': { 'displayName': wm2, 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;${wm2},;;;\nFN:${wm2},\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabell:Ponsel\nEND:VCARD`, 'jpegThumbnail': require('fs').readFileSync('./media/ppbot.jpg'), thumbnail: require('fs').readFileSync('./media/ppbot.jpg'),sendEphemeral: true}}}
		
		// Payment
		global.fpay = { "key": { "remoteJid": "0@s.whatsapp.net","fromMe": false, "id": "BAE595C600522C9C", "participant": "0@s.whatsapp.net" }, "message": { "requestPaymentMessage": { "currencyCodeIso4217": wm2, "amount1000": 99999999999999, "requestFrom": "0@s.whatsapp.net", "noteMessage": { "extendedTextMessage": { "text": "Hai Kak 👋" }}, "expiryTimestamp": 99999999999999, "amount": { "value": 99999999999999, "offset": 99999999999999, "currencyCode": wm2 }}}}

                // Pilih random
                global.fake = pickRandom([ ftroli, fkontak, fpay ])

	}
}
module.exports = handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}
