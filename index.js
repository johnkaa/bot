const { Scenes, session, Telegraf, Markup } = require('telegraf');
const config = require('config')
const SceneGenerator = require('./Scenes')
const curScene = new SceneGenerator()
const nameScene = curScene.GenNameScene()
const giftScene = curScene.GenGiftScene()

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.use(Telegraf.log())

const stage = new Scenes.Stage([nameScene, giftScene])

bot.use(session())
bot.use(stage.middleware())

bot.start(async ctx => {
    try {
        await ctx.replyWithHTML('<strong>Привет от Санты!</strong>', Markup.inlineKeyboard([
            Markup.button.callback('Начать', 'btnStart')
        ]))
    } catch (e) {
        console.error(e)
    }
})
bot.action('btnStart', async ctx => {
    try {
        await ctx.answerCbQuery()
        await ctx.reply('Введите ваше имя и фамилию.')
        await ctx.scene.enter('name')
    } catch (e) {
        console.error(e)
    }
})
bot.hears('/count', ctx => ctx.reply(`name: ${ctx.db.name}`))
bot.help(ctx => ctx.reply('Send me a sticker'))

bot.launch()

// Enable graceful stop
// process.once('SIGINT', () => bot.stop('SIGINT'))
// process.once('SIGTERM', () => bot.stop('SIGTERM'))
