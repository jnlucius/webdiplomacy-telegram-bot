const { getNewgameList } = require("./utility/data.js");
const {Telegraf} = require('telegraf');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

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
        bot.telegram.sendMessage(process.env.CHANNEL_ID, `"${game.title}"\n\nPhase: ${game.timePerPhase}\nMap: ${game.detail}\n${game.players}\nLink: ${game.link}`).then((m) => {
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

//getNewgameList('https://webdiplomacy.ru/gamelistings.php?page-games=1&gamelistType=New');




