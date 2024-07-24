import { Client, ClientOptions, Collection, IntentsBitField } from 'discord.js';
import { BOT_TOKEN, GUILD_OWNER_ID } from './utils/pEnv';
import DbManager from './manager/dbManager';
import EventLoader from './utils/loader/eventLoader';
import CommandLoader from './utils/loader/commandLoader';
import { BaseCommands } from './commands/baseCommands';

interface Command {
    name: string;
    description: string;
    execute: (interaction: any, client: Client) => void;
}

export class Index extends Client {
    static instance: Index;
    public commands: Collection<string, BaseCommands> | undefined = undefined;

    constructor(props: ClientOptions) {
        super(props);
        Index.instance = this;
        this.commands = new Collection<string, BaseCommands>();
        this.login(BOT_TOKEN).then(() => {
            console.log('Bot logged in successfully');
            (new EventLoader(this)).loadEvents();
            (new CommandLoader(this)).loadCommands();
        });
    }

    public static getOwnerGuild() {
        return Index.instance.guilds.cache.get(GUILD_OWNER_ID);
    }
    public static getRoot(): string {
        return __dirname;
    }
}

new Index({
    intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMembers]
});
