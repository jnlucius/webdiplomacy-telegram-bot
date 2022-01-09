const { getNewgameList } = require("./utility/data.js");
const {Telegraf} = require('telegraf');
require('dotenv').config();
const express = require('express');
const expressApp = express();

const PORT = process.env.PORT || 3000;
const URL = process.env.URL;

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.telegram.setWebhook(`${URL}/bot${BOT_TOKEN}`);
expressApp.use(bot.webhookCallback(`/bot${BOT_TOKEN}`));

let msgInChatID = [];

//for looping
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function loop() {
  while (true) {

    if(!msgInChatID.length == 0){
        //console.log("Elements in array: " + msgInChatID.length);
        for (msg of msgInChatID){
            bot.telegram.deleteMessage(process.env.CHANNEL_ID, msg);
            //console.log("Deleted message");
        }
        msgInChatID = [];
        //console.log("Elements in array: " + msgInChatID.length);
    }

    const games = await getNewgameList('https://webdiplomacy.ru/gamelistings.php?page-games=1&gamelistType=New');

    for (game of games){
        bot.telegram.sendMessage(process.env.CHANNEL_ID, `<b>"${game.title}"</b>\n\n<b>Phase:</b> ${game.timePerPhase}\n<b>Map:</b> ${game.detail}\n${game.players}\n<b>Link:</b> ${game.link}`,  {parse_mode: 'HTML'}).then((m) => {
            msgInChatID.push(m.message_id);
            //console.log("Pushed msg id into the array. Id: " + m.message_id);
        })
       
    } 
    //5 minutes interval
    await delay(300000);
  }
}



(
    async function main() {
        try {
            //posting list in a loop
            loop();
            
        }
        catch(err){
            console.log(err);
        }
    }
)();

bot.launch();

expressApp.get('/', (req, res) => {
  res.send('Hello World!');
});
expressApp.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



