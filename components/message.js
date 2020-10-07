const { MongoClient } = require("mongodb")
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017'
const DB_NAME = process.env.DB_NAME || 'mongodb://localhost:27017/testBase'

const onMessage = async (ctx) => {
  try {
    const db = await MongoClient.connect(MONGO_URI)
    const dbo = db.db(DB_NAME)
    const currentUserInfo = await dbo.collection("users").findOne({
      userId: ctx.from.id,
    })
    if(currentUserInfo){
      await ctx.reply(`Hello, ${currentUserInfo.userName}`)
    }else{
      try {
        await dbo.collection("users").insertOne({
          userId: ctx.from.id,
          userName: ctx.from.first_name,
        })
      } catch (error) {
        console.error(error)
      }
    }
    await db.close()
    return
  } catch (error) {
    console.error(error)
    return
  }
}

module.exports = onMessage
