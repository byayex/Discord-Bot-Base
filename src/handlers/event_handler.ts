import * as fs from 'fs';
import { Client, ClientEvents } from 'discord.js';

export default async (client: Client, Discord: typeof import('discord.js')): Promise<void> => {
    const load_dir = async (dirs: string): Promise<void> => {
        const event_files = fs.readdirSync(`./events/${dirs}`).filter(file => file.endsWith('.ts'));

        for (const file of event_files) {
            const eventModule = await import(`../events/${dirs}/${file}`);
            const event_name = file.split('.')[0] as keyof ClientEvents;
            client.on(event_name, eventModule.default.bind(Discord, client));
        }
    };

    await Promise.all(['client', 'guild'].map(e => load_dir(e)));
};
