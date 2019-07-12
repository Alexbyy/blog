const { exec, escape } = require('../db/mysql')
const { genPassword } = require('../utils/cryp')

const login = async (username, password) => {
    username = escape(username)

    // 生成加密密码
    password = genPassword(password)
    password = escape(password)

    const sql = `
        select username, realname from users where username=${username} and password=${password}
    `
    // console.log('sql is', sql)

    const rows = await exec(sql)
    return rows[0] || {}
}

const newAccount = async (username, password, realname, state) => {
    username = escape(username)
    realname = escape(realname)
    state    = escape(state)
    password = genPassword(password)
    password = escape(password)
    console.log("username", username)
    console.log("password", password)
    console.log("state", state)
    console.log("realname", realname)
    const sql = `
        insert into users (username, password, realname, state) values (${username}, ${password}, ${realname}, ${state})
    `
    const rows = await exec(sql)
    return rows[0] || {}
}
module.exports = {
    login,
    newAccount
}