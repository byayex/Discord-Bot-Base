const { Guild, MessageEmbed, MessageActionRow, MessageSelectMenu} = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('basecommand')
		.setDescription('Base - Command!'),
	
		async execute(interaction, client) 
    {
		interaction.reply({content: 'You used the Base-Command', ephemeral: true})
    }
};