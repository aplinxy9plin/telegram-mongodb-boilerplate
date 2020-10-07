const { Markup } = require("telegraft")

const sendKeyboard = async (ctx) => {
  console.log('Command: sendKeyboard')
  await ctx.reply('One time keyboard', Markup
    .keyboard(['Hello', 'World'])
    .oneTime()
    .resize()
    .extra()
  )
}

module.exports = getUserId
