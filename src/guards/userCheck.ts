import { GuardFunction, SimpleCommandMessage} from "discordx";


export const UserCheck: GuardFunction<SimpleCommandMessage> = async (
    message
    ,client,
    next
) => {
    const users: Record<string, string> = {
        "292025326371078149": "VileEnd"
    }
    if (client.user) {
        console.log(client.user.id)
        if (client.user.id in users) {
            await next();
        }
    }
}
