import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { ExtendedClient } from "../models/ExtendedClient";

module.exports = {
	data: new SlashCommandBuilder()
		.setName('basecommand')
		.setDescription('Base - Command!')
		.addStringOption(option =>
			option.setName('input')
				.setDescription('The input to echo back')
				.setRequired(false)),
	
	async execute(client: ExtendedClient, interaction: ChatInputCommandInteraction) 
    {
		const string = interaction.options.getString('input') ?? "";

		if(string.length == 0)
		{
			interaction.reply({content: `You used the Base-Command!\nInput: undefiend`})
		}else
		{
			interaction.reply({content: `You used the Base-Command!\n${string}`})
		}
    }
};