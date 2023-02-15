const { EmbedBuilder } = require('discord.js');
require('dotenv').config();

module.exports = async (Discord, client, interaction) =>
{
    if(interaction.isCommand())
    {
        const command = client.commands.get(interaction.commandName);

        if (!command) return;

        try
        {
        await command.execute(interaction, client)
        } catch (err)
        {
            console.error(err);

            var error_embed = new EmbedBuilder()
            .setColor('#d19732')
            .setTitle('🤖 - Bot Error')
            .setDescription('Please contact staff!')
            .setTimestamp()

            interaction.reply({embeds: [error_embed], ephemeral: true});
        }
    }
}
