import { Client, Collection, REST, Routes } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';
import { BaseCommands } from '../../commands/baseCommands';
import { BOT_TOKEN, BOT_ID, GUILD_OWNER_ID } from '../pEnv';
import { Index } from '../..';

export default class CommandLoader {
    client: Index;
    commandCollection: Collection<string, BaseCommands>;

    constructor(client: Index) {
        this.client = client;
        this.commandCollection = new Collection<string, BaseCommands>();
    }

    async loadCommands() {
        const commandFiles = readdirSync(join(__dirname, '..', '..', 'commands', "list")).filter(file => file.endsWith('.ts') || file.endsWith('.js'));

        const commands = [];
        for (const file of commandFiles) {
            const command: BaseCommands = require(`../../commands/list/${file}`).default;
            this.commandCollection.set(command.data.name, command);
            commands.push(command.data.toJSON());
        }

        this.client.commands = this.commandCollection;

        const rest = new REST({ version: '10' }).setToken(BOT_TOKEN);

        try {
            console.log('Started refreshing application (/) commands.');

            await rest.put(
                Routes.applicationGuildCommands(BOT_ID, GUILD_OWNER_ID),
                { body: commands },
            );

            console.log('Successfully reloaded application (/) commands.');
        } catch (error) {
            console.error(error);
        }
    }
}
