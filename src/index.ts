import * as fs from 'fs';
import * as Discord from 'discord.js';
import { Client, Collection, GatewayIntentBits } from 'discord.js';
import { registerCommands } from './deploy-commands';
import { ExtendedClient } from './models/ExtendedClient';
import DatabaseManager from './utils/DatabaseManager';
import { Command } from './models/Command';

const client = new Client({ intents: [GatewayIntentBits.Guilds] }) as ExtendedClient;

client.connection = new DatabaseManager();

client.commands = new Collection<string, Command>();
const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.ts'));

for (const file of commandFiles) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const command: Command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

['event_handler'].forEach((handler) => {
    import(`./handlers/${handler}`).then((handlerModule) => {
        handlerModule.default(client, Discord);
    }).catch((error) => {
        console.error(`Error importing handler ${handler}:`, error);
    });
});

client.login(process.env.TOKEN);

registerCommands();