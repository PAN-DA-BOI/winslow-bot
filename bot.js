const Discord = require("discord.js");
const mc = require("minecraft-protocol");

//bot token
const BOT_TOKEN = "BOT_TOKEN";
const MC_SERVER_IP = "winslow.plus";
const MC_SERVER_PORT = 25565;

const client = new Discord.Client();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (message.content.toLowerCase().includes("bot, is the server up")) {
    try {
      await new Promise((resolve, reject) => {
        const client = mc.createClient({
          host: MC_SERVER_IP,
          port: MC_SERVER_PORT,
        });//ping the server
        client.on("connect", () => {
          client.end();
          resolve(true);
        });//works
        client.on("error", (err) => {
          reject(err);
        });//dont works
      });
      message.reply("The Minecraft server is **UP**!");
    } catch (err) {
      message.reply("The Minecraft server is **DOWN**!");
    }//msg
  }
});

client.login(BOT_TOKEN);
