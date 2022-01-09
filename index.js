const { getNewgameList } = require("./utility/data.js");
const {Telegraf} = require('telegraf');
require('dotenv').config();

//for looping
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function loop() {
  while (true) {
    const games = await getNewgameList('https://webdiplomacy.ru/gamelistings.php?page-games=1&gamelistType=New');

    for (game of games){
        bot.telegram.sendMessage(process.env.CHANNEL_ID, `"${game.title}"\n\nPhase: ${game.timePerPhase}\nMap: ${game.detail}\n${game.players}\nLink: ${game.link}`);
    } 

    await delay(300000);
  }
}

const bot = new Telegraf(process.env.BOT_TOKEN);

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




