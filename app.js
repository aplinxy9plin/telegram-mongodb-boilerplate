const { Telegraf } = require('telegraf')

// env
const URL = process.env.URL || 'https://telegramp-bot.herokuapp.com/'
const API_TOKEN = process.env.API_TOKEN || 'telegram bot token'
const PRODUCTION = process.env.PRODUCTION === 'true' // boolean true or false
const PORT = process.env.PORT || 3000

// components
const onMessage = require("./components/message")

// commands
const getUserId = require("./commands/getUserId")
const sendKeyboard = require("./commands/sendKeyboard")

const bot = new Telegraf(API_TOKEN, {
  webHook: {
    port: PORT,
  },
})

// listening
bot.on("message", onMessage)
bot.on("/getUserId", getUserId)
bot.on("/sendKeyboard", sendKeyboard)

if(PRODUCTION){
  bot.telegram.setWebhook(`${URL}/bot${API_TOKEN}`);
  bot.startWebhook(`/bot${API_TOKEN}`, null, PORT)
}else{
  bot.launch()
}
