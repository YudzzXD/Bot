let handler = m => m

handler.before = async function (m) {
   if (m.sender.startsWith('212' || '212')) {
   	global.db.data.users[m.sender].banned = true
    await conn.updateBlockStatus(m.sender, "block")
   }
   // pengen nambahin?? salin ae trs kasi kode negaranya
 }

module.exports = handler