import { Client, ActivityType, PresenceStatusData } from 'discord.js';

export default function updateActivity(client: Client, status: PresenceStatusData, activity: { name: string; type: ActivityType; url?: string }) {
    client.user?.setPresence({
        status: status,
        activities: [{
            name: activity.name,
            type: activity.type,
            url: activity.url
        }]
    })
}