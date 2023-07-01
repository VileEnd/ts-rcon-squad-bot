import type { CommandInteraction } from "discord.js";
import { ApplicationCommandOptionType } from "discord.js";
import { Discord, Slash, SlashGroup, SlashOption } from "discordx";
import {rcon} from "../utils/rconInstance.js";

@Discord()
@SlashGroup({ description: "testing", name: "squad" })
@SlashGroup({ description: "maths", name: "maths", root: "squad" })
export class GroupExample {
  @Slash({ description: "add" })
  @SlashGroup("maths", "squad")
  add(
    @SlashOption({
      description: "x value",
      name: "x",
      required: true,
      type: ApplicationCommandOptionType.Number,
    })
    x: number,
    @SlashOption({
      description: "y value",
      name: "y",
      required: true,
      type: ApplicationCommandOptionType.Number,
    })
    y: number,
    interaction: CommandInteraction
  ): void {
    interaction.reply(String(x + y));
  }
  @Slash({description: 'nextmap'})
  @SlashGroup('nextmap', 'squad')
  async nextmap(): Promise<string> {

      return await rcon.showNextMap()
  }
  @Slash({ description: "set notification" })
  @SlashGroup("squad_message", "squad")
  multiply(
    @SlashOption({
      description: "x value",
      name: "x",
      required: true,
      type: ApplicationCommandOptionType.Number,
    })
    x: number,
    @SlashOption({
      description: "y value",
      name: "y",
      required: true,
      type: ApplicationCommandOptionType.Number,
    })
    y: number,
    interaction: CommandInteraction
  ): void {
    interaction.reply(String(x * y));
  }

  @Slash({ description: "root" })
  @SlashGroup("squad")
  root(
    @SlashOption({
      description: "text",
      name: "text",
      required: true,
      type: ApplicationCommandOptionType.String,
    })
    text: string,
    interaction: CommandInteraction
  ): void {
    interaction.reply(text);
  }
}
