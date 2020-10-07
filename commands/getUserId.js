const getUserId = async (ctx) => {
  console.log('Command: getUserId')
  await ctx.reply(ctx.from.id)
}

module.exports = getUserId
