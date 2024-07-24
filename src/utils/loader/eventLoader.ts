import { Client } from "discord.js";
import { readdirSync } from "fs";
import { join } from "path";
import { Index } from "../..";

export default class EventLoader {
    private client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    loadEvents(): void {
        const eventDir = join(Index.getRoot(), 'events/list');
        const eventFiles = readdirSync(eventDir);

        for (const file of eventFiles) {
            if (file.endsWith('.ts') || file.endsWith('.js')) {
                const eventClass = require(`${eventDir}/${file}`).default;
                const eventInstance = new eventClass(this.client);
                if (eventInstance.once) {
                    this.client.once(eventInstance.name, (...args) => eventInstance.run(...args));
                } else {
                    this.client.on(eventInstance.name, (...args) => eventInstance.run(...args));
                }
            }
        }
    }
}