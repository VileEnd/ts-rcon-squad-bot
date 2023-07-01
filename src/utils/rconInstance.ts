import {RconService} from "./rconService.js";

export let rcon: RconService;

async function instantiateRconService(): Promise<RconService> {
    const rcon = new RconService(process.env.ServerHost, Number(process.env.ServerPort), process.env.RconPassword);
    await rcon.connect();
    return rcon;
}

export async function init() {
    rcon = await instantiateRconService();
}

