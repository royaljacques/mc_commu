import { APIInteractionGuildMember, GuildMember } from "discord.js"
import config from "../utils/config"

export function isAdmin(member: GuildMember | null | APIInteractionGuildMember): boolean {
    if (member instanceof GuildMember) {
        return member.roles.cache.has(config.roles.Administration);
    } else {
        return false;
    }
}
