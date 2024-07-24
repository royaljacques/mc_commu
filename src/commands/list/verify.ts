import { isAdmin } from '../../manager/permissionsManager';
import config from '../../utils/config';
import { BaseCommands } from '../baseCommands';
import { SlashCommandBuilder, Client, PermissionsBitField, ChatInputCommandInteraction, TextChannel, Message } from 'discord.js';

const command: BaseCommands = {
    data: new SlashCommandBuilder()
        .setName('verify')
        .setDescription('vérifié un utilisateur afin qu\'il puisse accéder au reste du serveur')
        .addMentionableOption(option =>
            option.setName("utilisateur")
                .setDescription("mention de l'utilisateur concerné")
                .setRequired(true)
        ) as SlashCommandBuilder,

    async execute(interaction: ChatInputCommandInteraction, client: Client) {
        if (interaction != null) {
            if (isAdmin(interaction.member)) {
                const user = interaction.options.getMentionable("utilisateur");

                if (user) {
                    const roleId = config.roles.vérifié;
                    const role = interaction.guild?.roles.cache.get(roleId);

                    if (role) {
                        const member = interaction.guild?.members.cache.get(interaction.user.id);
                        if (member) {
                            await member.roles.add(role);
                            await interaction.reply(`${user} a été vérifié et a reçu le rôle ${role.name}`);


                            const rulesChannelId = config.channel.rules;
                            const rulesChannel: TextChannel = <TextChannel>interaction.guild?.channels.cache.get(rulesChannelId);

                            if (rulesChannel) {
                                rulesChannel.send(`${user}`).then((message: Message) => {
                                    message.delete()
                                });
                            }
                            const global: TextChannel = <TextChannel>interaction.guild?.channels.cache.get(config.channel.global);
                            global.send(`${user} a été vérifié et peut maintenant accéder au reste du serveur.`)
                            setTimeout(async () => {
                                const channel = interaction.channel;
                                if (channel) {
                                    await channel.delete();
                                }
                            }, 10000);
                        } else {
                            await interaction.reply('L\'utilisateur mentionné n\'a pas été trouvé dans ce serveur.');
                        }
                    } else {
                        await interaction.reply('Le rôle spécifié n\'a pas été trouvé.');
                    }
                } else {
                    await interaction.reply('L\'utilisateur mentionné est invalide.');
                }
            } else {
                await interaction.reply('La commande ne peut être utilisée que par un administrateur.');
            }
        }

    },
};

export default command;