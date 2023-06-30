import { dirname, importx } from "@discordx/importer";
import type { Interaction, Message } from "discord.js";
import {Activity, IntentsBitField, ActivityType } from "discord.js";
import { Client } from "discordx";

export const bot = new Client({
  // To use only guild command
  // botGuilds: [(client) => client.guilds.cache.map((guild) => guild.id)],

  // Discord intents
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMessageReactions,
    IntentsBitField.Flags.GuildVoiceStates,
    IntentsBitField.Flags.MessageContent,
  ],

  // Debug logs are disabled in silent mode
  silent: false,

  // Configuration for @SimpleCommand
  simpleCommand: {
    prefix: "!",
  },
});

bot.once("ready", async () => {

  await bot.initApplicationCommands();
  console.log("Bot started");
  setInterval(() => setActivity(bot), 20 * 1000);
});

bot.on("interactionCreate", (interaction: Interaction) => {
  bot.executeInteraction(interaction);
});

bot.on("messageCreate", (message: Message) => {
  bot.executeCommand(message);
});

async function run() {

  await importx(`${dirname(import.meta.url)}/{events,commands}/**/*.{ts,js}`);

  if (!process.env.BOT_TOKEN) {
    throw Error("Could not find BOT_TOKEN in your environment");
  }
  await bot.login(process.env.BOT_TOKEN);
  setActivity(bot)


}

run();
function setActivity(client: any):void{
  if(client.user) {
    client.user.setPresence({
      status: 'online',
      activities: [{
        name: "Hello",
        url: 'https://google.com',
        type: ActivityType.Playing
      }]
    })
  }else {
    throw Error("no client Set")
  }
}
