import type { CommandInteraction } from "discord.js";
import { ApplicationCommandOptionType } from "discord.js";
import {Discord, Guard, Slash, SlashGroup, SlashOption} from "discordx";
import {rcon} from "../utils/rconInstance.js";
import {UserCheck} from "../guards/userCheck.js";

@Discord()
@SlashGroup({ description: "testing", name: "squad" })
@SlashGroup({ description: "maths", name: "maths", root: "squad" })
export class SquadCommands {

  @Slash({ description: "shows the next map" })
  @SlashGroup("squad")
  @Guard(UserCheck)
  nextmap(
    interaction: CommandInteraction
  ): void {
      rcon.showNextMap().then(nextMap => {
          interaction.reply(nextMap).catch(error => {
              // Handle the error here
              console.log(error);
          });
      }).catch(error => {
          // Handle the error here
          console.log(error);
      });
  }

    @Slash({ description: "shows the current map" })
    @SlashGroup("squad")
    currentmap(
        interaction: CommandInteraction
    ): void {
        rcon.showCurrentMap().then(nextMap => {
            interaction.reply(nextMap).catch(error => {
                // Handle the error here
                console.log(error);
            });
        }).catch(error => {
            // Handle the error here
            console.log(error);
        });
    }

    @Slash({ description: "kick a player based on its name" })
    @SlashGroup("squad")
    kick(
        @SlashOption({
            description:"Name or SteamId",
            name:"x",
            required: true,
            type: ApplicationCommandOptionType.String
        })
        x: string,
        @SlashOption({
            description:"Reason for kick",
            name:"y",
            required: true,
            type: ApplicationCommandOptionType.String
        })
            y: string,
        interaction: CommandInteraction
    ): void {
        rcon.adminKick(x,y).then(nextMap => {
            interaction.reply(nextMap).catch(error => {
                // Handle the error here
                console.log(error);
            });
        }).catch(error => {
            // Handle the error here
            console.log(error);
        });
    }
    @Slash({ description: "ends the current match" })
    @SlashGroup("squad")
    endmatch(
        interaction: CommandInteraction
    ): void {
        rcon.adminEndMatch().then(nextMap => {
            interaction.reply(nextMap).catch(error => {
                // Handle the error here
                console.log(error);
            });
        }).catch(error => {
            // Handle the error here
            console.log(error);
        });
    }


    @Slash({ description: "shows the next Layer" })
    @SlashGroup("squad")
    setnextlayer(
        interaction: CommandInteraction
    ): void {
       let user =interaction.user
        console.log(user.id)
        console.log(user.username)

        if(user.id === "292025326371078149"){
        rcon.adminVoteNextLevel().then(nextMap => {
            interaction.reply(nextMap ).catch(error => {
                // Handle the error here
                console.log(error);
            });
        }).catch(error => {
            // Handle the error here
            console.log(error);
        });
    }else{
            interaction.reply(`${user.username}: No rights to execute this command`)
        }}
}
