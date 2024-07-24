import { ActivityType, Client, CommandInteraction } from "discord.js";
import BaseEvent from "../BaseEvent";
import updateActivity from "../../manager/activityManager";
import { Index } from "../..";

export default class ReadyEvent extends BaseEvent {
    constructor(client: Index) {
        super(client, 'interactionCreate');
    }

    async run(interaction: CommandInteraction): Promise<void> {
        if (interaction.isChatInputCommand()) {
            const command = this.client.commands?.get(interaction.commandName)
            command?.execute(interaction, this.client)
        }
    }
}