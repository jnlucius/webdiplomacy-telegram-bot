const puppeteer = require('puppeteer');
const fs = require('fs/promises');

//const { getNewgameList } = require("./utility/data.js");
//const {Telegraf} = require('telegraf');
//require('dotenv').config();

//const bot = new Telegraf(process.env.BOT_TOKEN);

//querySelector(".light").textContent + ", " + x.querySelector("b").textContent + x.lastChild.textContent
async function getNewgameList(url){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const games = await page.evaluate(() => {
        let gameArr = [];

        let titles = Array.from(document.querySelectorAll(".gameName")).map(x => x.textContent);
        let players = Array.from(document.querySelectorAll(".gamePhase")).map(x => x.querySelector("b").textContent + x.lastChild.textContent);
        let details = Array.from(document.querySelectorAll(".gamePotType")).map(x => x.textContent);
        let timePerPhase = Array.from(document.querySelectorAll(".gameHoursPerPhase strong")).map(x => x.textContent);
        let links = Array.from(document.querySelectorAll(".enterBarOpen a")).map(x => x.href);
    
        for(let i = 0; i < links.length; i++){
            gameArr.push({title: titles[i], players: players[i], detail: details[i], timePerPhase: timePerPhase[i], link: links[i]})
        }

        return gameArr;
    })

    //for debuging
    for( game of games){
        console.log("\nTitle: " + game.title);
        console.log("Players: " + game.players);
        console.log("Detail: " + game.detail);
        console.log("Phase: " + game.timePerPhase);
        console.log("Link: " + game.link);

        //bot.telegram.sendMessage(process.env.CHANNEL_ID, game.title);
    }


    
    await browser.close();
    return games;
}

//getNewgameList('https://webdiplomacy.ru/gamelistings.php?page-games=1&gamelistType=New');

//bot.launch();

module.exports = {
    getNewgameList
};
