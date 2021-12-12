const { Scenes } = require('telegraf')

class SceneGenerator {
    GenNameScene() {
        const name = new Scenes.BaseScene('name')
        name.on('text', async ctx => {
            const name = ctx.message.text
            if(name.length > 6) {
                await ctx.reply(`Привет ${name}! :)`)
                await ctx.scene.enter('gift')
            } else {
                await ctx.reply('Вы ввели неверное имя, попробуйте ещё раз.')
                await ctx.scene.reenter()
            }
        })
        name.on('message', ctx => ctx.reply('Напиши сообщение текстом.'))
        return name
    }
    GenGiftScene() {
        const gift = new Scenes.BaseScene('gift')
        gift.enter(ctx => ctx.reply('Что ты хочешь подарить?'))
        gift.on('text', async ctx => {
            const gift = ctx.message.text
            if(gift.length > 3) {
                await ctx.reply('Крутой подарок!')
                await ctx.scene.leave()
            } else {
                await ctx.reply('Вы ввели неверное подарок, попробуйте ещё раз.')
                await ctx.scene.reenter()
            }
        })
        gift.on('message', ctx => ctx.reply('Напиши сообщение текстом.'))
        return gift
    }
}

module.exports = SceneGenerator
