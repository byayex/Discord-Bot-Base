const { ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('Mention the User.')
        .setType(ApplicationCommandType.User),

    async execute(interaction, client) {

        const targetMember = interaction.targetMember;

        interaction.reply({ ephemeral: true, content: 'Executed the mention.' })

        interaction.channel.send(`Hello ${targetMember}`)
    }
};