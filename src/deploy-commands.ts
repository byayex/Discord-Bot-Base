import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { config } from 'dotenv';
import * as fs from 'fs/promises';

config();

async function registerCommands() {
    const commands: string[] = [];
    const commandFiles = (await fs.readdir('./commands')).filter((file) =>
        file.endsWith('.ts')
    );

    const clientId = process.env.CLIENT_ID as string;
    const DEV_GUILD = process.env.GUILD_ID as string;
    const modus = process.env.CMD_MODE as string;
    const emptyCommands = process.env.EMPTY_COMMANDS as string;

    for (const file of commandFiles) {
        const command = await import(`./commands/${file}`);
        commands.push(command.data.toJSON());
    }

    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN as string);

    try {
        console.log('Started refreshing application (/) commands.');

        if (modus === 'GLOBAL') {
            // ON EVERY GUILD (1h)
            if (emptyCommands === 'Y') {
                console.log('Started Removing all Commands');
                console.log('Reloading Globally!');
                await rest.put(Routes.applicationCommands(clientId), {
                    body: [],
                });
            } else {
                console.log('Reloading Globally!');
                await rest.put(Routes.applicationCommands(clientId), {
                    body: commands,
                });
            }
        }

        if (modus === 'DEV') {
            // ONLY ON CERTAIN GUILD (INSTANT)
            if (emptyCommands === 'Y') {
                console.log('Started Removing all Commands');
                console.log('Reloading on the Developer-Server!');
                await rest.put(
                    Routes.applicationGuildCommands(clientId, DEV_GUILD),
                    { body: [] }
                );
            } else {
                console.log('Reloading on the Developer-Server!');
                await rest.put(
                    Routes.applicationGuildCommands(clientId, DEV_GUILD),
                    { body: commands }
                );
            }
        }

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
}

export { registerCommands };
