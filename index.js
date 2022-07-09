const fs = require('fs');
const Discord = require("discord.js");
const {Client, Intents, Collection} = require('discord.js');
require('dotenv').config();
const {registerCommands} = require('./deploy-commands');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS], partials: ['GUILD_MEMBER', 'MESSAGE', 'REACTION', 'USER']});

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
client.events = new Discord.Collection();

for(const file of commandFiles)
{
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

['event_handler'].forEach(handler=>{
    require(`./handlers/${handler}`)(client, Discord);
})

client.login(process.env.TOKEN);

registerCommands();

