const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('basecommand')
		.setDescription('Base - Command!')
		.addStringOption(option =>
			option.setName('input')
				.setDescription('The input to echo back')
				.setRequired(false)),
	
		async execute(interaction, client) 
    {
		const string = interaction.options.getString('input');

		if(string = undefined)
		{
			interaction.reply({content: `You used the Base-Command!\nInput: undefiend`, ephemeral: true})
		}else
		{
			interaction.reply({content: `You used the Base-Command!\n${string}`, ephemeral: true})
		}
    }
};