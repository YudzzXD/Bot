let { getBuffer } = require('../lib/myfunc')
let levelling = require('../lib/levelling')
let handler = m => m
handler.before = async function (m) {
let user = global.db.data.users[m.sender]
let { exp, name, level, role } = global.db.data.users[m.sender]
let { min, xp, max } = levelling.xpRange(level, global.multiplier)
let exp = exp - min
let maxexp = xp
let pp = `https://github.com/Chandra-XD/cn-grabbed-result/raw/main/media/image/ppkosong.jpg`
try {
pp = await conn.profilePictureUrl(m.sender, 'image')
} catch (e) {
} finally {
		if (!user.autolevelup) return !0
		let before = user.level * 1
		while (levelling.canLevelUp(user.level, user.exp, global.multiplier)) user.level++
		if (before !== user.level) {
		let buffer = await getBuffer(`https://api.xzusfin.repl.co/rankcard?avatar=${pp}&name=${name}&exp=${exp}&maxexp=${maxexp}&level=${level}&rank=${role}&text=#FFFFFF&avatarborder=#FF1493&avatarbackground=#FF1493&bar=#FFFFFF&barbackground=#5f5f6f&background=#2f2f3c&border=#1f1f2f&image=`)
		let txt = `Congratulations, you have leveled up 🎉🎉
Before *${before}* to *${user.level}*`.trim()
        await conn.sendMessage(m.chat, { image: buffer, caption: txt }, { quoted: m })
                }
        }
        }
module.exports = handler