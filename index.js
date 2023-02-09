const fs = require('fs');
const Discord = require("discord.js");
const {Client, Intents, Collection, GatewayIntentBits} = require('discord.js');
require('dotenv').config();
const {registerCommands} = require('./deploy-commands');

const client = new Client({ intents: [GatewayIntentBits.Guilds]});

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

