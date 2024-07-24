
import { ActivityType, CategoryChannel, ChannelType, Client, EmbedBuilder, GuildMember, PermissionsBitField } from "discord.js";
import BaseEvent from "../BaseEvent";
import { Index } from "../..";
import config from "../../utils/config";
export default class ReadyEvent extends BaseEvent {
    constructor(client: Index) {
        super(client, 'guildMemberAdd');
    }

    async run(event: GuildMember): Promise<void> {
        const guild = Index.getOwnerGuild();
        if (guild === undefined) return;
        const category = Index.getOwnerGuild()?.channels.cache.get(config.category.sas);
        if (category && category.type === ChannelType.GuildCategory) {
            const channel = await Index.getOwnerGuild()?.channels.create({
                name: event.user.username,
                type: ChannelType.GuildText,
                parent: category.id,
                permissionOverwrites: [
                    {
                        id: event.user.id,
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                    },
                    {
                        id: guild.roles.everyone,
                        deny: [PermissionsBitField.Flags.ViewChannel]
                    }
                ],
            });
            const embed = new EmbedBuilder()
                .setTitle("Vérification de votre compte")
                .setDescription(`Bonjour <@${event.user.id}>,\n\nAfin de pouvoir rejoindre notre serveur communautaire, nous aimerions que vous nous fournissiez :\n\n- Si vous êtes fondateur => votre URL d'invitation à votre serveur\n- Si vous êtes développeur => une liste de vos plugins, démonstrations et les potentiels serveurs sur lesquels vous avez travaillé\n- Si vous êtes streamer => un lien vers votre chaîne YouTube, Twitch ou autre réseau permettant la retransmission vidéo\n- Si vous êtes influenceur => un lien vers votre compte influenceur (préférence pour TikTok)\n- Autres => une description de vous-même avec des liens ou des vidéos/photos de votre parcours\nMerci de votre coopération. Comprenez que, pour le bien de la communauté de ce serveur, nous ne vous demanderons qu'une seule fois ces informations et que rien ne sortira de ce salon une fois fermé.\n\nCordialement.`)
                .setColor("#54f000");
            channel?.send({ embeds: [embed] })
        } else {
            console.error("La catégorie SAS n'a pas été trouvée ou n'est pas une catégorie valide.");
        }
    }
}