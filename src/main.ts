import { dirname, importx } from "@discordx/importer";
import type { Interaction, Message } from "discord.js";
import { IntentsBitField, ActivityType } from "discord.js";
import { Client } from "discordx";
import {configDotenv} from "dotenv";
import {init, rcon} from "./utils/rconInstance.js";
configDotenv()

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
  setInterval(() => setActivity(bot), 60 * 1000);
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
  await init();
  await bot.login(process.env.BOT_TOKEN);
}

run();

// Function to handle player details extraction
export function extractPlayerDetails(line: string): { id: number, steamId: string, name: string, teamId: number, squadId: string | null, isLeader: boolean, role: string } | null {
  const playerRegex = /ID: (\d+) \| SteamID: (\d+) \| Name: (.+) \| Team ID: (\d+) \| Squad ID: (.+) \| Is Leader: (\w+) \| Role: (.+)/;
  const match = line.match(playerRegex);

  if (!match) return null;

  const id = parseInt(match[1]);
  const steamId = match[2];
  const name = match[3];
  const teamId = parseInt(match[4]);
  const squadId = match[5] !== "N/A" ? match[5] : null;
  const isLeader = match[6].toLowerCase() === 'true';
  const role = match[7];

  return { id, steamId, name, teamId, squadId, isLeader, role };
}
export async function getSquadServerInfo(): Promise<{ players: Array<{ id: number, steamId: string, name: string, teamId: number, squadId: string | null, isLeader: boolean, role: string }>, playerCount: number } | null> {
  try {
    console.log('test')
    const response = await rcon.listPlayers();
    console.log(response.toUpperCase());

    const nextMap = await rcon.showNextMap();
    const currentMap = await rcon.showCurrentMap();
    console.log(currentMap)
    console.log(nextMap)

    const lines = response.split('\n');
    const players = lines
        .filter(line => line.startsWith('ID'))
        .map(extractPlayerDetails)
        .filter(player => player !== null) as { id: number, steamId: string, name: string, teamId: number, squadId: string | null, isLeader: boolean, role: string }[];

    return { players, playerCount: players.length };
  } catch (error) {
    throw Error(`Error retrieving Squad server info: ${error}`);
  }


}

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