import { CommandInteraction, EmbedBuilder } from 'discord.js';
import { ExtendedClient } from '../../models/ExtendedClient';
import { StringSelectMenuInteraction } from 'discord.js';

module.exports = async (client: ExtendedClient, interaction: CommandInteraction) => {

    if (interaction.isCommand()) {

        const command = client.commands.get(interaction.commandName);

        if (!command) return;

        try {
            await command.execute(client, interaction);
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


    if (interaction.isStringSelectMenu()) {
        const selectMenuInteraction = (interaction as StringSelectMenuInteraction);

        if (selectMenuInteraction.customId == 'ticket-create') {
            const interactionValue = selectMenuInteraction.values[0];

            switch (interactionValue) {
                case "service-request":
                    {
                        break;
                    }
                case "exchange-request":
                    {
                        break;
                    }
                case "buy-product":
                    {
                        break;
                    }
                case "other":
                    {
                        break;
                    }
            }

            return;
        }
    }
};
