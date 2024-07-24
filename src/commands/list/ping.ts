import { BaseCommands } from '../baseCommands';
import { SlashCommandBuilder, CommandInteraction, Client } from 'discord.js';

const command: BaseCommands = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction: CommandInteraction, client: Client) {
        await interaction.reply('Pong!');
    },
};

export default command;