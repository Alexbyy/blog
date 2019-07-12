const router = require('koa-router')()
const { login, newAccount } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')


router.prefix('/api/user')

router.post('/login', async function (ctx, next) {
    console.log("ctx.request.body",typeof ctx.request.body)
    if(typeof ctx.request.body === 'string'){
        ctx.request.body = JSON.parse(ctx.request.body)
    }
    const { username, password } = ctx.request.body
    console.log("username", username)
    console.log("password", password)
    const data = await login(username, password)
    if (data.username) {
        // 设置 session
        ctx.session.username = data.username
        ctx.session.realname = data.realname

        ctx.body = new SuccessModel("登陆成功")
        return
    }
    ctx.body = new ErrorModel('登录失败')
})

router.post('/new', async function(ctx, next){
    const {username, password, realname, state=1} = ctx.request.body
    const data = await newAccount(username, password, realname, state)
    ctx.body = new SuccessModel(data)
})

// router.get('/session-test', async function (ctx, next) {
//   if (ctx.session.viewCount == null) {
//     ctx.session.viewCount = 0
//   }
//   ctx.session.viewCount++

//   ctx.body ={
//     errno: 0,
//     viewCount: ctx.session.viewCount
//   }
// })

module.exports = router