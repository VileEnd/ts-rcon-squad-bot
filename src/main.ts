import { dirname, importx } from "@discordx/importer";
import type { Interaction, Message } from "discord.js";
import { IntentsBitField, ActivityType } from "discord.js";
import { Client } from "discordx";
import { getSquadServerInfo } from "./utils/utils-rcon";

export const bot = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMessageReactions,
    IntentsBitField.Flags.GuildVoiceStates,
    IntentsBitField.Flags.MessageContent,
  ],
  silent: false,
  simpleCommand: {
    prefix: "!",
  },
});

bot.once("ready", async () => {
  await bot.initApplicationCommands();
  console.log("Bot started");

  // Here we set the activity every 20 seconds.
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
}

run();



async function setActivity(client: any): Promise<void> {
  const serverInfo = await getSquadServerInfo();
  if(client.user && serverInfo) {
    client.user.setPresence({
      status: 'online',
      activities: [{
        name: `Squad | ${serverInfo.playerCount} players | ${serverInfo.players[0]?.name}}`,
        type: ActivityType.Watching
      }]
    });
  } else {
    throw Error("No client set or failed to retrieve server info");
  }
}
