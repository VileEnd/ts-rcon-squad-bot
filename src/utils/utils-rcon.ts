// The original function, now refactored
import {Rcon} from "rcon-client";

let squadServerHost = '185.250.250.162';
let squadServerPort = 27170; // Replace with your Squad server's RCON port
let squadRconPassword = 'ILoveYOu';


// Function to handle Rcon connection
export async function connectRcon(rcon: any) {
    rcon.on("connect", () => console.log("connected"));
    rcon.on("authenticated", () => console.log("authenticated"));
    rcon.on("end", () => console.log("end"));

    await rcon.connect();
}

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
    const rcon = new Rcon({
        host: squadServerHost,
        port: squadServerPort,
        password: squadRconPassword,
    });

    try {
        await connectRcon(rcon);
        const response = await rcon.send('ListPlayers');
        console.log(response.toUpperCase());

        const nextMap = await rcon.send('ShowNextMap');
        const currentMap = await rcon.send('ShowCurrentMap');
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
    } finally {
        await rcon.end();
    }

    return null;
}