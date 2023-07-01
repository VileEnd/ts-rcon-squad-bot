import { Rcon } from "rcon-client";

export class RconService {
    private rcon: Rcon;

    constructor(private host: string, private port: number, private password: string) {
        this.rcon = new Rcon({ host, port, password });
    }

    public async connect(): Promise<void> {
        this.rcon.on("connect", () => console.log("connected"));
        this.rcon.on("authenticated", () => console.log("authenticated"));
        this.rcon.on("end", () => console.log("end"));
        await this.rcon.connect();
    }

    public async disconnect(): Promise<void> {
        await this.rcon.end();
    }

    private async sendCommand(command: string): Promise<string> {
        return await this.rcon.send(command);
    }

    public async listCommands(showDetails: boolean): Promise<string> {
        return await this.sendCommand(`ListCommands ${showDetails ? 1 : 0}`);
    }

    public async showCommandInfo(commandName: string): Promise<string> {
        return await this.sendCommand(`ShowCommandInfo ${commandName}`);
    }

    public async listPermittedCommands(showDetails: boolean): Promise<string> {
        return await this.sendCommand(`ListPermittedCommands ${showDetails ? 1 : 0}`);
    }

    public async adminKillServer(force: boolean): Promise<string> {
        return await this.sendCommand(`AdminKillServer ${force ? 1 : 0}`);
    }

    public async adminSetMaxNumPlayers(numPlayers: number): Promise<string> {
        return await this.sendCommand(`AdminSetMaxNumPlayers ${numPlayers}`);
    }

    public async adminSetNumReservedSlots(numReserved: number): Promise<string> {
        return await this.sendCommand(`AdminSetNumReservedSlots ${numReserved}`);
    }

    public async adminSetServerPassword(password: string): Promise<string> {
        return await this.sendCommand(`AdminSetServerPassword ${password}`);
    }

    public async adminSlomo(timeDilation: number): Promise<string> {
        return await this.sendCommand(`AdminSlomo ${timeDilation}`);
    }

    public async adminSetPublicQueueLimit(publicQueueLimit: number): Promise<string> {
        return await this.sendCommand(`AdminSetPublicQueueLimit ${publicQueueLimit}`);
    }

    public async listPlayers(): Promise<string> {
        return await this.sendCommand('ListPlayers');
    }

    public async listSquads(): Promise<string> {
        return await this.sendCommand('ListSquads');
    }

    public async adminTeleportToPlayer(nameOrSteamId: string): Promise<string> {
        return await this.sendCommand(`AdminTeleportToPlayer ${nameOrSteamId}`);
    }

    public async adminTeleportToPlayerById(playerId: string): Promise<string> {
        return await this.sendCommand(`AdminTeleportToPlayerById ${playerId}`);
    }

    public async adminKick(nameOrSteamId: string, kickReason: string): Promise<string> {
        return await this.sendCommand(`AdminKick "${nameOrSteamId}" ${kickReason}`);
    }

    public async showNextMap(): Promise<string> {
        return await this.sendCommand('ShowNextMap');
    }

    public async showCurrentMap(): Promise<string> {
        return await this.sendCommand('ShowCurrentMap');
    }

    public async adminListDisconnectedPlayers(): Promise<string> {
        return await this.sendCommand('AdminListDisconnectedPlayers');
    }

    public async adminKickById(playerId: number, kickReason: string): Promise<string> {
        return await this.sendCommand(`AdminKickById ${playerId} ${kickReason}`);
    }

    public async adminBan(nameOrSteamId: string, banLength: string, banReason: string): Promise<string> {
        return await this.sendCommand(`AdminBan "${nameOrSteamId}" "${banLength}" ${banReason}`);
    }

    public async adminBanById(playerId: number, banLength: string, banReason: string): Promise<string> {
        return await this.sendCommand(`AdminBanById ${playerId} "${banLength}" ${banReason}`);
    }

    public async adminWarn(nameOrSteamId: string, warnReason: string): Promise<string> {
        return await this.sendCommand(`AdminWarn "${nameOrSteamId}" ${warnReason}`);
    }

    public async adminWarnById(playerId: number, warnReason: string): Promise<string> {
        return await this.sendCommand(`AdminWarnById ${playerId} ${warnReason}`);
    }

    public async adminForceTeamChange(nameOrSteamId: string): Promise<string> {
        return await this.sendCommand(`AdminForceTeamChange ${nameOrSteamId}`);
    }

    public async adminForceTeamChangeById(playerId: number): Promise<string> {
        return await this.sendCommand(`AdminForceTeamChangeById ${playerId}`);
    }

    public async adminRemovePlayerFromSquadById(playerId: number): Promise<string> {
        return await this.sendCommand(`AdminRemovePlayerFromSquadById ${playerId}`);
    }

    public async adminRemovePlayerFromSquad(playerName: string): Promise<string> {
        return await this.sendCommand(`AdminRemovePlayerFromSquad ${playerName}`);
    }

    public async adminDemoteCommander(playerName: string): Promise<string> {
        return await this.sendCommand(`AdminDemoteCommander ${playerName}`);
    }

    public async adminDemoteCommanderById(playerId: number): Promise<string> {
        return await this.sendCommand(`AdminDemoteCommanderById ${playerId}`);
    }

    public async adminDisbandSquad(teamNumber: number, squadIndex: number): Promise<string> {
        return await this.sendCommand(`AdminDisbandSquad ${teamNumber} ${squadIndex}`);
    }

    public async slInviteMember(name: string): Promise<string> {
        return await this.sendCommand(`SLInviteMember ${name}`);
    }

    public async listLevels(): Promise<string> {
        return await this.sendCommand('ListLevels');
    }

    public async listLayers(): Promise<string> {
        return await this.sendCommand('ListLayers');
    }

    public async adminChangeLevel(levelName: string): Promise<string> {
        return await this.sendCommand(`AdminChangeLevel ${levelName}`);
    }

    public async adminChangeLayer(layerName: string): Promise<string> {
        return await this.sendCommand(`AdminChangeLayer ${layerName}`);
    }

    public async adminSetNextLevel(levelName: string): Promise<string> {
        return await this.sendCommand(`AdminSetNextLevel ${levelName}`);
    }

    public async adminSetNextLayer(layerName: string): Promise<string> {
        return await this.sendCommand(`AdminSetNextLayer ${layerName}`);
    }

    public async adminVoteLevel(): Promise<string> {
        return await this.sendCommand('AdminVoteLevel');
    }

    public async adminVoteLayer(): Promise<string> {
        return await this.sendCommand('AdminVoteLayer');
    }

    public async adminVoteNextLevel(): Promise<string> {
        return await this.sendCommand('AdminVoteNextLevel');
    }

    public async adminVoteNextLayer(): Promise<string> {
        return await this.sendCommand('AdminVoteNextLayer');
    }

    public async adminBroadcast(message: string): Promise<string> {
        return await this.sendCommand(`AdminBroadcast ${message}`);
    }

    public async chatToAdmin(message: string): Promise<string> {
        return await this.sendCommand(`ChatToAdmin ${message}`);
    }

    public async adminVote(question: string, possibleAnswers: string, duration: number): Promise<string> {
        return await this.sendCommand(`AdminVote "${question}" "${possibleAnswers}" ${duration}`);
    }

    public async adminRestartMatch(): Promise<string> {
        return await this.sendCommand('AdminRestartMatch');
    }

    public async adminEndMatch(): Promise<string> {
        return await this.sendCommand('AdminEndMatch');
    }

    public async adminPauseMatch(): Promise<string> {
        return await this.sendCommand('AdminPauseMatch');
    }

    public async adminUnpauseMatch(): Promise<string> {
        return await this.sendCommand('AdminUnpauseMatch');
    }

    public async adminSetFogOfWar(layerBasedSetting: number): Promise<string> {
        return await this.sendCommand(`AdminSetFogOfWar ${layerBasedSetting}`);
    }

    public async adminForceAllVehicleAvailability(layerBasedSetting: number): Promise<string> {
        return await this.sendCommand(`AdminForceAllVehicleAvailability ${layerBasedSetting}`);
    }

    public async adminForceAllDeployableAvailability(layerBasedSetting: number): Promise<string> {
        return await this.sendCommand(`AdminForceAllDeployableAvailability ${layerBasedSetting}`);
    }

    public async adminForceAllRoleAvailability(layerBasedSetting: number): Promise<string> {
        return await this.sendCommand(`AdminForceAllRoleAvailability ${layerBasedSetting}`);
    }

    public async adminForceAllActionAvailability(layerBasedSetting: number): Promise<string> {
        return await this.sendCommand(`AdminForceAllActionAvailability ${layerBasedSetting}`);
    }

    public async adminNoTeamChangeTimer(layerBasedSetting: number): Promise<string> {
        return await this.sendCommand(`AdminNoTeamChangeTimer ${layerBasedSetting}`);
    }

    public async adminNoRespawnTimer(layerBasedSetting: number): Promise<string> {
        return await this.sendCommand(`AdminNoRespawnTimer ${layerBasedSetting}`);
    }

    public async adminDisableVehicleClaiming(layerBasedSetting: number): Promise<string> {
        return await this.sendCommand(`AdminDisableVehicleClaiming ${layerBasedSetting}`);
    }

    public async adminDisableVehicleTeamRequirement(layerBasedSetting: number): Promise<string> {
        return await this.sendCommand(`AdminDisableVehicleTeamRequirement ${layerBasedSetting}`);
    }

    public async adminDisableVehicleKitRequirement(layerBasedSetting: number): Promise<string> {
        return await this.sendCommand(`AdminDisableVehicleKitRequirement ${layerBasedSetting}`);
    }

    public async adminAlwaysValidPlacement(alwaysValid: number): Promise<string> {
        return await this.sendCommand(`AdminAlwaysValidPlacement ${alwaysValid}`);
    }

    public async adminForceNetUpdateOnClientSaturation(enabled: number): Promise<string> {
        return await this.sendCommand(`AdminForceNetUpdateOnClientSaturation ${enabled}`);
    }

    public async adminAddCameraman(nameOrId: string): Promise<string> {
        return await this.sendCommand(`AdminAddCameraman ${nameOrId}`);
    }

    public async adminCreateVehicle(className: string): Promise<string> {
        return await this.sendCommand(`AdminCreateVehicle ${className}`);
    }

    public async adminCreateDeployable(className: string): Promise<string> {
        return await this.sendCommand(`AdminCreateDeployable ${className}`);
    }

    public async adminGiveEquipment(className: string): Promise<string> {
        return await this.sendCommand(`AdminGiveEquipment ${className}`);
    }

    public async adminSpawnActor(index: number): Promise<string> {
        return await this.sendCommand(`AdminSpawnActor ${index}`);
    }

    public async adminDemoPlay(fileName: string): Promise<string> {
        return await this.sendCommand(`AdminDemoPlay ${fileName}`);
    }

    public async adminDemoRec(fileName: string): Promise<string> {
        return await this.sendCommand(`AdminDemoRec ${fileName}`);
    }

    public async adminDemoStop(): Promise<string> {
        return await this.sendCommand('AdminDemoStop');
    }

    public async adminProfileServer(secondsToProfileFor: number, bUseRaw: number): Promise<string> {
        return await this.sendCommand(`AdminProfileServer ${secondsToProfileFor} ${bUseRaw}`);
    }

    public async adminProfileServerCSV(startOrStop: string): Promise<string> {
        return await this.sendCommand(`AdminProfileServerCSV ${startOrStop}`);
    }

    public async debugVehicleList(mode: number): Promise<string> {
        return await this.sendCommand(`DebugVehicleList ${mode}`);
    }

    public async debugVehicleSetComponentHealthByName(vehicleNameOrIndex: string, componentIndex: number, newComponentHealth: number): Promise<string> {
        return await this.sendCommand(`DebugVehicleSetComponentHealthByName "${vehicleNameOrIndex}" ${componentIndex} ${newComponentHealth}`);
    }

    public async recordingStart(): Promise<string> {
        return await this.sendCommand('RecordingStart');
    }

    public async recordingStartNamed(replayName: string): Promise<string> {
        return await this.sendCommand(`RecordingStart_Named ${replayName}`);
    }

    public async recordingStop(): Promise<string> {
        return await this.sendCommand('RecordingStop');
    }

}
