import { CacheType, ChatInputCommandInteraction, CommandInteraction, EmbedBuilder } from 'discord.js';
import { ExtendedClient } from '../../models/ExtendedClient';

module.exports = async (client: ExtendedClient, interaction: CommandInteraction) => {

    if (interaction.isCommand()) {

        const commandInteraction = interaction as ChatInputCommandInteraction<CacheType>;

        const command = client.commands.get(interaction.commandName);

        if (!command) return;

        try {
            await command.execute(client, commandInteraction);
        } catch (err) {
            console.error(err);

            const error_embed = new EmbedBuilder()
                .setColor('#d19732')
                .setTitle('🤖 - Bot Error')
                .setDescription('Please contact staff!')
                .setTimestamp();

            await interaction.reply({ embeds: [error_embed], ephemeral: true });
        }
    }

};
