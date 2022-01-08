const getNewgameList = require("./utility/data");
const {Telegraf} = require('telegraf');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.on('text', (ctx) => {
    ctx.reply("it's working");
})

bot.launch();

//getNewgameList('https://webdiplomacy.ru/gamelistings.php?page-games=1&gamelistType=New');