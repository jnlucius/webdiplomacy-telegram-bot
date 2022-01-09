const { getNewgameList } = require("./utility/data.js");
const {Telegraf} = require('telegraf');
require('dotenv').config();


const bot = new Telegraf(process.env.BOT_TOKEN);

(
    async function main() {
        try {
            const games = await getNewgameList('https://webdiplomacy.ru/gamelistings.php?page-games=1&gamelistType=New');

            for (game of games){
                bot.telegram.sendMessage(process.env.CHANNEL_ID, `"${game.title}"\n\nPhase: ${game.timePerPhase}\nMap: ${game.detail}\n${game.players}\nLink: ${game.link}`);
            }

            
        }
        catch(err){
            console.log(err);
        }
    }
)();

bot.launch();

//getNewgameList('https://webdiplomacy.ru/gamelistings.php?page-games=1&gamelistType=New');




