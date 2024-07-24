import { ActivityType, Client } from "discord.js";
import BaseEvent from "../BaseEvent";
import updateActivity from "../../manager/activityManager";
import { Index } from "../..";

export default class ReadyEvent extends BaseEvent {
    constructor(client: Index) {
        super(client, 'ready', true);
    }

    async run(): Promise<void> {
        console.log(`${this.client.user?.tag} is online!`);
        updateActivity(
            this.client,
            'online',
            {
                name: "Bot officiel",
                type: ActivityType.Custom
            }
        )
    }
}