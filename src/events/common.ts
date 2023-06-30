import type { ArgsOf, Client } from "discordx";
import { Discord, On } from "discordx";
import {ActivityType, Status} from "discord.js";

@Discord()
export class Example {
  @On()
  messageDelete([message]: ArgsOf<"messageDelete">, client: Client): void {
    console.log("Message Deleted", client.user?.username, message.content);
  }


}
