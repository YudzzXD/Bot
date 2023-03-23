const simple = require('./lib/simple')
const util = require('util')
const { color } = require('./lib/color')
const moment = require("moment-timezone")

const isNumber = x => typeof x === 'number' && !isNaN(x)
const delay = ms => isNumber(ms) && new Promise(resolve => setTimeout(resolve, ms))

module.exports = {
    async handler(chatUpdate) {
        if (db.data == null) await loadDatabase()
        this.msgqueque = this.msgqueque || []
        // console.log(chatUpdate)
        if (!chatUpdate) return
        this.pushMessage(chatUpdate.messages).catch(console.error)
        // if (!(chatUpdate.type === 'notify' || chatUpdate.type === 'append')) return
        let m = chatUpdate.messages[chatUpdate.messages.length - 1]
        if (!m) return
        // console.log(m)
        const Tnow = (new Date()/1000).toFixed(0)
        const seli = Tnow - m.messageTimestamp
        if (seli > global.Intervalmsg) return console.log(new ReferenceError(`Pesan ${Intervalmsg} detik yang lalu diabaikan agar tidak nyepam`))

        try {
            m = simple.smsg(this, m) || m
            if (!m) return
            // console.log(m)
            m.exp = 0
            m.limit = false
            try {
                let user = db.data.users[m.sender]
                if (typeof user !== 'object') db.data.users[m.sender] = {}
                if (user) {
                    if (!isNumber(user.exp)) user.exp = 0
                    if (!isNumber(user.limit)) user.limit = 50
                    if (!isNumber(user.joinlimit)) user.joinlimit = 1
                    if (!isNumber(user.money)) user.money = 1000000
                    if (!isNumber(user.bank)) user.bank = 1000000
                    if (!isNumber(user.lastclaim)) user.lastclaim = 0
                    if (!('registered' in user)) user.registered = false
                    if (!user.registered) {
                        if (!('name' in user)) user.name = m.name
                        if (!isNumber(user.age)) user.age = -1
                        if (!isNumber(user.regTime)) user.regTime = -1
                    }
                    if (!isNumber(user.afk)) user.afk = -1
                    if (!('afkReason' in user)) user.afkReason = ''
                    if (!('pasangan' in user)) user.pasangan = ''
                    if (!('banned' in user)) user.banned = false
                    if (!('premium' in user)) user.premium = false
                    if (!('created' in user)) user.created = false
                    if (!isNumber(user.premiumDate)) user.premiumDate = 0
                    if (!isNumber(user.bannedDate)) user.bannedDate = 0
                    if (!isNumber(user.level)) user.level = 0
                    if (!isNumber(user.pc)) user.pc = 0
                    if (!('role' in user)) user.role = 'Beginner'
                    if (!('autolevelup' in user)) user.autolevelup = true 
                    if (!isNumber(user.lastweekly)) user.lastweekly = 0
                    if (!isNumber(user.lastmonthly)) user.lastmonthly = 0
                    if (!isNumber(user.reglast)) user.reglast = 0
                    if (!isNumber(user.unreglast)) user.unreglast = 0
                    if (!isNumber(user.snlast)) user.snlast = 0
                    if (!isNumber(user.snlast)) user.judilast = 0
                    if (!isNumber(user.snlast)) user.casinolast = 0
                } else db.data.users[m.sender] = {
                    exp: 0,
                    limit: 50,
                    joinlimit: 1,
                    money: 100000,
                    bank: 100000,
                    lastclaim: 0,
                    registered: false,
                    name: m.name,
                    age: -1,
                    regTime: -1,
                    afk: -1,
                    afkReason: '',
                    pasangan: '',
                    banned: false,
                    premium: false,
                    created: false,
                    pc: 0,
                    level: 0,
                    role: 'Beginner',
                    autolevelup: true,
                    lastweekly: 0,
                    lastmonthly: 0,
                    reglast: 0,
                    unreglast: 0,
                    snlast: 0,
                    judilast: 0,
                    casinolast: 0,
                }
                let chat = db.data.chats[m.chat]
                if (typeof chat !== 'object') db.data.chats[m.chat] = {}
                if (chat) {
	                if (!('isBanned' in chat)) chat.isBanned = false
                    if (!('welcome' in chat)) chat.welcome = false
                    if (!('detect' in chat)) chat.detect = false
                    if (!('sWelcome' in chat)) chat.sWelcome = ''
                    if (!('sBye' in chat)) chat.sBye = ''
                    if (!('sPromote' in chat)) chat.sPromote = ''
                    if (!('sDemote' in chat)) chat.sDemote = ''
                    if (!('delete' in chat)) chat.delete = true
                    if (!('antiLink' in chat)) chat.antiLink = false 
                    if (!('antiSticker' in chat)) chat.antiSticker = false
                    if (!('stiker' in chat)) chat.stiker = false
                    if (!('mute' in chat)) chat.mute = true 
                    if (!('viewonce' in chat)) chat.viewonce = false
                    if (!('useDocument' in chat)) chat.useDocument = false
                    if (!('nsfw' in chat)) chat.nsfw = false
                    if (!('premnsfw' in chat)) chat.premnsfw = false
			        if (!('premium' in chat)) chat.premium = false
                    if (!('premiumTime' in chat)) chat.premiumTime = false
                    if (!isNumber(chat.expired)) chat.expired = 0
                } else db.data.chats[m.chat] = {
	                isBanned: false,
                    welcome: false,
                    detect: false,
                    sWelcome: '',
                    sBye: '',
                    sPromote: '',
                    sDemote: '',
                    delete: true,
                    antiLink: false,
                    stiker: false,
                    mute: true,
                    antiSticker: false,
                    viewonce: false,
                    useDocument: false,
                    nsfw: false,
                    premnsfw: false,
			        premium: false,
			        premiumTime: false,
                    expired: 0
                }
                let settings = db.data.settings[this.user.jid]
                if (typeof settings !== 'object') db.data.settings[this.user.jid] = {}
                if (settings) {
                if (!'anticall' in settings) settings.anticall = true
                if (!('self' in settings)) settings.self = false
                if (!('autoread' in settings)) settings.autoread = false
                if (!('restrict' in settings)) settings.restrict = false
                if (!'autoreset' in settings) settings.autoreset = true
		        if (!isNumber(settings.autoresetTime)) settings.autoresetTime = (new Date() * 1) + 3600000 * 720
		        if (!'backup' in settings) settings.backup = true
		        if (!isNumber(settings.backupTime)) settings.backupTime = 0
		        if (!isNumber(settings.status)) settings.status = 0
		        } else db.data.settings[this.user.jid] = {
                anticall: true,
                self: false,
                autoread: false,
                restrict: false,
                autoreset: true,
		        autoresetTime: (new Date() * 1) + 3600000 * 720,
		        status: true,
		        backup: true,
		        backupTime: 0,
		        status: 0
		        }
            } catch (e) {
                console.error(e)
            }
            if (opts['nyimak']) return
            if (!m.fromMe && opts['self']) return
            if (opts['pconly'] && m.chat.endsWith('g.us')) return
            if (opts['gconly'] && !m.chat.endsWith('g.us')) return
            if (opts['swonly'] && m.chat !== 'status@broadcast') return
            if (typeof m.text !== 'string') m.text = ''

            const isROwner = [conn.decodeJid(global.conn.user.id), ...global.owner.map(([number, isCreator, isDeveloper]) => number)].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
            const isOwner = isROwner || m.fromMe
            const isMods = isOwner || global.mods.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
            const isPrems = db.data.users[m.sender].premium
            const isBans = db.data.users[m.sender].banned
            const isCreated = db.data.users[m.sender].created

            if (opts['queque'] && m.text && !(isMods || isPrems)) {
                let queque = this.msgqueque, time = 1000 * 5
                const previousID = queque[queque.length - 1]
                queque.push(m.id || m.key.id)
                setInterval(async function () {
                    if (queque.indexOf(previousID) === -1) clearInterval(this)
                    else await delay(time)
                }, time)
            }

            // for (let name in global.plugins) {
            //     let plugin = global.plugins[name]
            //     if (!plugin) continue
            //     if (plugin.disabled) continue
            //     if (!plugin.all) continue
            //     if (typeof plugin.all !== 'function') continue
            //     try {
            //         await plugin.all.call(this, m, chatUpdate)
            //     } catch (e) {
            //         if (typeof e === 'string') continue
            //         console.error(e)
            //     }
            // }

            if (m.isBaileys) return 
            if (m.chat.endsWith('broadcast') || m.key.remoteJid.endsWith('broadcast')) return // Supaya tidak merespon di status
            let blockList = await conn.fetchBlocklist()
            if (blockList?.includes(m.sender)) return
            m.exp += Math.ceil(Math.random() * 10)

            let usedPrefix
            let _user = db.data && db.data.users && db.data.users[m.sender]

            const groupMetadata = (m.isGroup ? (conn.chats[m.chat] || {}).metadata : {}) || {}
        //    const groupMetadata = (m.isGroup ? (conn.chats[m.chat].metadata || await conn.groupMetadata(m.chat)): {}) || {}
            const participants = (m.isGroup ? groupMetadata.participants : []) || []
            const user = (m.isGroup ? participants.find(u => conn.decodeJid(u.id) === m.sender) : {}) || {} // User Data
            const bot = (m.isGroup ? participants.find(u => conn.decodeJid(u.id) == this.user.jid) : {}) || {} // Your Data
            const isRAdmin = user && user.admin == 'superadmin' || false
            const isAdmin = isRAdmin || user && user.admin == 'admin' || false // Is User Admin?
            const isBotAdmin = bot && bot.admin || false // Are you Admin?
            for (let name in global.plugins) {
                let plugin = global.plugins[name]
                if (!plugin) continue
                if (plugin.disabled) continue
                if (typeof plugin.all === 'function') {
                    try {
                        await plugin.all.call(this, m, chatUpdate)
                    } catch (e) {
                        // if (typeof e === 'string') continue
                        console.error(e)
                    }
                }
                if (!opts['restrict']) if (plugin.tags && plugin.tags.includes('admin')) {
                    // global.dfail('restrict', m, this)
                    continue
                }
                const str2Regex = str => str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
                let _prefix = plugin.customPrefix ? plugin.customPrefix : conn.prefix ? conn.prefix : global.prefix
                let match = (_prefix instanceof RegExp ? // RegExp Mode?
                    [[_prefix.exec(m.text), _prefix]] :
                    Array.isArray(_prefix) ? // Array?
                        _prefix.map(p => {
                            let re = p instanceof RegExp ? // RegExp in Array?
                                p :
                                new RegExp(str2Regex(p))
                            return [re.exec(m.text), re]
                        }) :
                        typeof _prefix === 'string' ? // String?
                            [[new RegExp(str2Regex(_prefix)).exec(m.text), new RegExp(str2Regex(_prefix))]] :
                            [[[], new RegExp]]
                ).find(p => p[1])
                if (typeof plugin.before === 'function') if (await plugin.before.call(this, m, {
                    match,
                    conn: this,
                    participants,
                    groupMetadata,
                    user,
                    bot,
                    isROwner,
                    isOwner,
                    isRAdmin,
                    isAdmin,
                    isBotAdmin,
                    isPrems,
                    isBans,
                    isCreated,
                    chatUpdate,
                })) continue
                if (typeof plugin !== 'function') continue
                if ((usedPrefix = (match[0] || '')[0])) {
                    let noPrefix = m.text.replace(usedPrefix, '')
                    let [command, ...args] = noPrefix.trim().split` `.filter(v => v)
                    args = args || []
                    let _args = noPrefix.trim().split` `.slice(1)
                    let text = _args.join` `
                    command = (command || '').toLowerCase()
                    let fail = plugin.fail || global.dfail // When failed
                    let isAccept = plugin.command instanceof RegExp ? // RegExp Mode?
                        plugin.command.test(command) :
                        Array.isArray(plugin.command) ? // Array?
                            plugin.command.some(cmd => cmd instanceof RegExp ? // RegExp in Array?
                                cmd.test(command) :
                                cmd === command
                            ) :
                            typeof plugin.command === 'string' ? // String?
                                plugin.command === command :
                                false

                    if (!isAccept) continue
                    m.plugin = name
                    if (m.chat in db.data.chats || m.sender in db.data.users) {
                        let chat = db.data.chats[m.chat]
                        let user = db.data.users[m.sender]
                        if (name != 'o-unbanchat.js' && chat && chat.isBanned) return // Except this
                        if (name != 'o-unbanuser.js' && user && user.banned) return
                    }
                    if (plugin.rowner && plugin.owner && !(isROwner || isOwner)) { // Both Owner
                        fail('owner', m, this)
                        continue
                    }
                    if (plugin.rowner && !isROwner) { // Real Owner
                        fail('rowner', m, this)
                        continue
                    }
                    if (plugin.owner && !isOwner) { // Number Owner
                        fail('owner', m, this)
                        continue
                    }
                    if (plugin.mods && !isMods) { // Moderator
                        fail('mods', m, this)
                        continue
                    }
                    if (plugin.premium && !isPrems) { // Premium
                        fail('premium', m, this)
                        continue
                    }
                    if (plugin.banned && !isBans) { // Banned
                        fail('banned', m, this)
                        continue
                    }
                    if (plugin.created && !isCreated) { // Created
                         fail('created', m, this)
                         continue
                    }
                    if (plugin.group && !m.isGroup) { // Group Only
                        fail('group', m, this)
                        continue
                    } else if (plugin.botAdmin && !isBotAdmin) { // You Admin
                        fail('botAdmin', m, this)
                        continue
                    } else if (plugin.admin && !isAdmin) { // User Admin
                        fail('admin', m, this)
                        continue
                    }
                    if (plugin.private && m.isGroup) { // Private Chat Only
                        fail('private', m, this)
                        continue
                    }
                    if (plugin.register == true && _user.registered == false) { // Butuh daftar?
                        fail('unreg', m, this)
                        continue
                    }
                    m.isCommand = true
                    let xp = 'exp' in plugin ? parseInt(plugin.exp) : 17 // XP Earning per command
                    if (xp > 9999999999999999999999) m.reply('Ngecit -_-') // Hehehe
                    else m.exp += xp
                    if (!isPrems && plugin.limit && db.data.users[m.sender].limit < plugin.limit * 1) {
                        this.reply(m.chat, `*ID :* Limit kamu habis atau tidak mencukupi untuk menggunakan fitur ini silahkan beli limit melalui *${usedPrefix}buyall* atau *${usedPrefix}buy2all* atau kamu juga bisa membeli limit di owner\n\n*EN :* Your limit is exhausted or not sufficient to use this feature, please buy a limit via *${usedPrefix}buyall* or *${usedPrefix}buy2all* or you can also buy a limit at the owner`, m)
                        continue // Limit habis
                    }
                    if (plugin.level > _user.level) {
                        this.reply(m.chat, `diperlukan level ${plugin.level} untuk menggunakan perintah ini. Level kamu ${_user.level}`, m)
                        continue // If the level has not been reached
                    }
                    let extra = {
                        match,
                        usedPrefix,
                        noPrefix,
                        _args,
                        args,
                        command,
                        text,
                        conn: this,
                        participants,
                        groupMetadata,
                        user,
                        bot,
                        isROwner,
                        isOwner,
                        isRAdmin,
                        isAdmin,
                        isBotAdmin,
                        isPrems,
                        isBans,
                        isCreated,
                        chatUpdate,
                    }
                    try {
                    if (!isOwner) {
                       if (m.isGroup && (new Date - global.db.data.chats[m.chat].delay < 10000)) return
                       if (!m.isGroup && (new Date - global.db.data.users[m.sender].delay < 10000)) return
                    }
                        await plugin.call(this, m, extra)
                        if (!isPrems) m.limit = m.limit || plugin.limit || false
                    } catch (e) {
                        // Error occured
                        m.error = e
                        console.error(e)
                        if (e) {
                            let text = util.format(e)
                            for (let key of Object.values(global.APIKeys))
                                text = text.replace(new RegExp(key, 'g'), '#HIDDEN#')
                            if (e.name) for (let [jid] of global.owner.filter(([number, isCreator, isDeveloper]) => isDeveloper && number)) {
                                let data = (await conn.onWhatsApp(jid))[0] || {}
                                if (data.exists) m.reply(`*Plugin:* ${m.plugin}\n*Sender:* ${m.sender}\n*Chat:* ${m.chat}\n*Command:* ${usedPrefix}${command} ${args.join(' ')}\n\n\`\`\`${text}\`\`\``.trim(), data.jid)
                            }
                            m.reply(String(e))
                        }
                    } finally {
                        // m.reply(util.format(_user))
                        if (typeof plugin.after === 'function') {
                            try {
                                await plugin.after.call(this, m, extra)
                            } catch (e) {
                                console.error(e)
                            }
                        }
                       // if (m.limit) m.reply(+ m.limit + ' Limit used')
                    }
                    break
                }
            }
        } catch (e) {
            console.error(e)
        } finally {
            if (opts['queque'] && m.text) {
                const quequeIndex = this.msgqueque.indexOf(m.id || m.key.id)
                if (quequeIndex !== -1) this.msgqueque.splice(quequeIndex, 1)
            }
            //console.log(db.data.users[m.sender])
            let user, stats = db.data.stats
            if (m) {
                if (m.sender && (user = db.data.users[m.sender])) {
                    user.exp += m.exp
                    user.limit -= m.limit * 1
                }

                let stat
            if (m.plugin) {
                let now = +new Date
                if (m.plugin in stats) {
                    stat = stats[m.plugin]
                    if (!isNumber(stat.total)) stat.total = 1
                    if (!isNumber(stat.success)) stat.success = m.error != null ? 0 : 1
                    if (!isNumber(stat.last)) stat.last = now
                    if (!isNumber(stat.lastSuccess)) stat.lastSuccess = m.error != null ? 0 : now
                } else stat = stats[m.plugin] = {
                    total: 1,
                    success: m.error != null ? 0 : 1,
                    last: now,
                    lastSuccess: m.error != null ? 0 : now
                }
                stat.total += 1
                
                if (m.isGroup) global.db.data.chats[m.chat].delay = now
                else global.db.data.users[m.sender].delay = now

                stat.last = now
                    if (m.error == null) {
                        stat.success += 1
                        stat.lastSuccess = now
                    }
                }
            }

             try {
                 require('./lib/print')(m, this)
             } catch (e) {
                 console.log(m, m.quoted, e)
             }
            if (opts['autoread']) await this.readMessages([m.key]) //this.chatRead(m.chat, m.isGroup ? m.sender : undefined, m.id || m.key.id).catch(() => { })
        }
    },
    async participantsUpdate({ id, participants, action }) {
        if (opts['self']) return
        // if (id in conn.chats) return // First login will spam
        if (global.isInit) return
        let chat = db.data.chats[id] || {}
        let text = ''
        switch (action) {
            case 'add':
            case 'remove':
                if (chat.welcome) {
                    let groupMetadata = await this.groupMetadata(id) || (conn.chats[id] || {}).metadata
                    for (let user of participants) {
                        let pp = 'https://github.com/Chandra-XD/cn-grabbed-result/raw/main/media/image/ppkosong.jpg'
                        try {
                            pp = await this.profilePictureUrl(user, 'image')
                        } catch (e) {

                        } finally {
                            text = (action === 'add' ? (chat.sWelcome || this.welcome || conn.welcome || 'Welcome, @user!').replace('@subject', await this.getName(id)).replace('@desc', groupMetadata.desc ? String.fromCharCode(8206).repeat(4001) + groupMetadata.desc : '') :
                                (chat.sBye || this.bye || conn.bye || 'Bye, @user!')).replace('@user', await this.getName(user))
                            let wel = API('can', '/api/maker/welcome', {
                                name: await this.getName(id),
                                gpname: await this.getName(user),
                                member: groupMetadata.participants.length,
                                pp: pp,
                                bg: 'https://cdn.discordapp.com/attachments/850808002545319957/859359637106065408/bg.png'
                            })
                            let lea = API('can', '/api/maker/goodbye', {
                                name: await this.getName(id),
                                gpname: await this.getName(user),
                                member: groupMetadata.participants.length,
                                pp: pp,
                                bg: 'https://cdn.discordapp.com/attachments/850808002545319957/859359637106065408/bg.png'
                            })
//                            await this.sendFile(id, action === 'add' ? wel : lea, 'pp.jpg', text, null, false, { mentions: [user] })
// lu klo gapengen button pake yg di atas
                            await this.send3TemplateButtonImg(id, action === 'add' ? wel : lea, text, wm, action === 'add' ? 'Selamat datang' : 'Sampai jumpa', action === 'add' ? 'y' : 'y') // y ke 1 selamat datang ke 2 sampai jumpa
                        }
                    }
                }
                break
        case 'promote':
            text = (chat.sPromote || this.spromote || conn.spromote || '@user ```is now Admin```')
        case 'demote':
            if (!text)
                text = (chat.sDemote || this.sdemote || conn.sdemote || '@user ```is no longer Admin```')
            text = text.replace('@user', '@' + participants[0].split('@')[0])
            if (chat.detect)
                this.sendMessage(id, { text, mentions: this.parseMention(text) })
            break
        }
    },
    async delete(message) {
        try {
            const { fromMe, id, participant } = message
            if (fromMe) return
            let chats = Object.entries(conn.chats).find(([_, data]) => data.messages?.[id])
            if (!chats) return
            let msg = chats instanceof String ? JSON.parse(chats[1].messages[id]) : chats[1].messages[id]
            let chat = db.data.chats[msg.key.remoteJid] || {}
            if (chat.delete) return
            await this.reply(msg.key.remoteJid, `
Terdeteksi @${participant.split`@`[0]} telah menghapus pesan
Untuk mematikan fitur ini, ketik
*.enable delete*
`.trim(), msg, {
                mentions: [participant]
            })
            this.copyNForward(msg.key.remoteJid, msg).catch(e => console.log(e, msg))
        } catch (e) {
            console.error(e)
        }
    }
},

conn.ws.on('CB:call', async function callUpdatePushToDb(json) {
        let call = json.tag
        let callerId = json.attrs.from
        console.log({ call, callerId })
        let users = db.data.users
        let user = users[callerId] || {}
        if (user.whitelist) return
        if (!db.data.settings[conn.user.jid].anticall) return
        switch (conn.callWhitelistMode) {
          case 'mycontact':
            if (callerId in conn.contacts && 'short' in conn.contacts[callerId])
            return
          break
        }
        const data = global.owner.filter(([id, isCreator]) => id && isCreator)
        let sentMsg = await conn.reply(callerId, `Sistem otomatis block, jangan menelepon bot silahkan hubungi owner untuk dibuka!`)
        await conn.sendContact(callerId, data.map(([id, name]) => [id, name]), sentMsg)
        await conn.updateBlockStatus(callerId, 'block')
        await conn.reply(owner[0]+'@s.whatsapp.net', `*NOTIF CALLER BOT!*\n\n@${callerId.split`@`[0]} telah menelpon *${conn.user.name}*\n\n ${callerId.split`@`[0]}\n`, null, { mentions: [callerId] })
        conn.delay(10000) // supaya tidak spam
    })

global.dfail = (type, m, conn) => {
    let nmsr = `Hai kak @${m.sender.replace(/@.+/, '')}`
    let msg = {
        rowner: `${nmsr}\nPerintah ini hanya untuk owner`,
        owner: `${nmsr}\nPerintah ini hanya untuk owner bot`,
        mods: `${nmsr}\nPerintah ini hanya untuk moderator bot`,
        premium: `${nmsr}\nKamu harus upgrade premium untuk dapat mengakses fitur ini\n\n*Premium*\n1 Bulan *Rp. 15.000*\nPermanen *Rp. 50.000*\n\nJika berminat hubungi *owner* kami..`, 
        banned: `${nmsr}\nPerintah ini hanya untuk pengguna yang terbanned..`,
        created: `${nmsr}\nPerintah ini hanya pengguna yang sudah membuat base\nContoh: #createbase YudzzXD`,
        group: `${nmsr}\nPerintah ini hanya dapat digunakan di grup!`,
        private: `${nmsr}\nPerintah ini hanya dapat digunakan di Chat Pribadi!`,
        admin: `${nmsr}\nPerintah ini hanya untuk *Admin* grup!`,
        unreg: `${nmsr}\nSilahkan daftar untuk menggunakan fitur ini dengan cara mengetik:\n\n*#daftar nama.umur*\n\nContoh: *#daftar Yuds.17*`,
        botAdmin: `${nmsr}\nJadikan bot sebagai *Admin* untuk menggunakan perintah ini!`,
        restrict: `${nmsr}\nFitur ini di *disable*! ( mati )`
    }[type]
    if (msg) return conn.reply(m.chat, msg, { key: { participant: '0@s.whatsapp.net', remoteJid: 'status@broadcast'}, message: { pollCreationMessage: { name: `Simple WhatsApp Bot` } } })
}

let fs = require('fs')
let chalk = require('chalk')
let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright("Update 'handler.js'"))
    delete require.cache[file]
    if (global.reloadHandler) console.log(global.reloadHandler())
})
