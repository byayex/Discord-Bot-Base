const { ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');

const bannedWords = ["bitch", "nigga", "nigger", "fuck you", "heil hitler", "sieg heil"]

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('Check Message for Toxicity.')
        .setType(ApplicationCommandType.Message),

    async execute(interaction, client) {

        const targetMessage = interaction.targetMessage;

        if (bannedWords.some(word => { targetMessage.toLowerCase().includes(word.toLowerCase()); })) 
        {
            await targetMessage.delete().catch(console.error)
            await targetMessage.member.disableCommunicationUntil(Date.now() + (5 * 60 * 1000), 'Bad Word Usage in Message.')
                .catch(console.error);
        }
        
    }
};