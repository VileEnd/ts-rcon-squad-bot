interface ListCommands {
    ShowDetails: 0 | 1;
}

interface ShowCommandInfo {
    CommandName: string;
}

interface ListPermittedCommands {
    ShowDetails: 0 | 1;
}

interface AdminKillServer {
    Force: 0 | 1;
}

interface AdminSetMaxNumPlayers {
    NumPlayers: number;
}

interface AdminSetNumReservedSlots {
    NumReserved: number;
}

interface AdminSetServerPassword {
    Password: string;
}

interface AdminSlomo {
    TimeDilation: number;
}

interface AdminSetPublicQueueLimit {
    PublicQueueLimit: number;
}

interface ListPlayers {}

interface ListSquads {}

interface AdminListDisconnectedPlayers {}

interface AdminTeleportToPlayer {
    NameOrSteamId: string;
}

interface AdminTeleportToPlayerById {
    PlayerId: string;
}

interface AdminKick {
    NameOrSteamId: string;
    KickReason: string;
}

interface AdminKickById {
    PlayerId: string;
    KickReason: string;
}

interface AdminBan {
    NameOrSteamId: string;
    BanLength: string;
    BanReason: string;
}

interface AdminBanById {
    PlayerId: string;
    BanLength: string;
    BanReason: string;
}

interface AdminWarn {
    NameOrSteamId: string;
    WarnReason: string;
}

interface AdminWarnById {
    PlayerId: string;
    WarnReason: string;
}

interface AdminForceTeamChange {
    NameOrSteamId: string;
}

interface AdminForceTeamChangeById {
    PlayerId: string;
}

interface AdminRemovePlayerFromSquadById {
    PlayerId: string;
}

interface AdminRemovePlayerFromSquad {
    PlayerName: string;
}

interface AdminDemoteCommander {
    PlayerName: string;
}

interface AdminDemoteCommanderById {
    PlayerId: string;
}

interface AdminDisbandSquad {
    TeamNumber: 1 | 2;
    SquadIndex: number;
}

interface SLInviteMember {
    Name: string;
}

interface ListLevels {}

interface ListLayers {}

interface AdminChangeLevel {
    LevelName: string;
}

interface AdminChangeLayer {
    LayerName: string;
}

interface AdminSetNextLevel {
    LevelName: string;
}

interface AdminSetNextLayer {
    LayerName: string;
}

interface ShowCurrentMap {}

interface ShowNextMap {}

interface AdminVoteLevel {}

interface AdminVoteLayer {}

interface AdminVoteNextLevel {}

interface AdminVoteNextLayer {}

interface AdminBroadcast {
    Message: string;
}

interface ChatToAdmin {
    Message: string;
}

interface AdminVote {
    Question: string;
    PossibleAnswers: string[];
    Duration: number;
}

interface AdminRestartMatch {}

interface AdminEndMatch {}

interface AdminPauseMatch {}

interface AdminUnpauseMatch {}

interface AdminSetFogOfWar {
    LayerBasedSetting: 0 | 1;
}

interface AdminForceAllVehicleAvailability {
    LayerBasedSetting: 0 | 1;
}

interface AdminForceAllDeployableAvailability {
    LayerBasedSetting: 0 | 1;
}

interface AdminForceAllRoleAvailability {
    LayerBasedSetting: 0 | 1;
}

interface AdminForceAllActionAvailability {
    LayerBasedSetting: 0 | 1;
}

interface AdminNoTeamChangeTimer {
    LayerBasedSetting: 0 | 1;
}

interface AdminNoRespawnTimer {
    LayerBasedSetting: 0 | 1;
}

interface AdminDisableVehicleClaiming {
    LayerBasedSetting: 0 | 1;
}

interface AdminDisableVehicleTeamRequirement {
    LayerBasedSetting: 0 | 1;
}

interface AdminDisableVehicleKitRequirement {
    LayerBasedSetting: 0 | 1;
}

interface AdminAlwaysValidPlacement {
    AlwaysValid: 0 | 1;
}

interface AdminForceNetUpdateOnClientSaturation {
    Enabled: 0 | 1;
}

interface AdminAddCameraman {
    NameOrId: string;
}

interface AdminCreateVehicle {
    ClassName: string;
}

interface AdminCreateDeployable {
    ClassName: string;
}

interface AdminGiveEquipment {
    ClassName: string;
}

interface AdminSpawnActor {
    Index: number;
}

interface AdminDemoPlay {
    FileName: string;
}

interface AdminDemoRec {
    FileName: string;
}

interface AdminDemoStop {}

interface AdminProfileServer {
    SecondsToProfileFor: number;
    bUseRaw: 0 | 1;
}

interface AdminProfileServerCSV {
    StartStop: 'Start' | 'Stop';
}

interface DebugVehicleList {
    Mode: 0 | 1 | 2;
}

interface DebugVehicleSetComponentHealthByName {
    VehicleNameOrIndex: string;
    ComponentIndex: number;
    NewComponentHealth: number;
}

interface RecordingStart {}

interface RecordingStart_Named {
    ReplayName: string;
}

interface RecordingStop {}
