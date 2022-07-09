const { Guild, Interaction, MessageEmbed, MessageActionRow, Modal, TextInputComponent, MessageButton } = require('discord.js');
const { sendEmbed } = require('../../utils/embed');
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
            sendEmbed('🤖 - Bot Error', 'Please contact staff!', null, interaction, true, 'error');
        }
    }
}
