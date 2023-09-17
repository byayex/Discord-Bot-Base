const { ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');
const stringSimilarity = require('string-similarity');

const bannedWords = ["bitch", "n*gga", "n*gger", "fuck you", "heil hitler", "sieg heil"];

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('Check Message for Toxicity.')
        .setType(ApplicationCommandType.Message),

    async execute(interaction, client) {

        const targetMessage = interaction.targetMessage;

        // Function to check similarity between words
        function isSimilar(word1, word2) {
            const similarity = stringSimilarity.compareTwoStrings(word1.toLowerCase(), word2.toLowerCase());
            return similarity > 0.8;
        }

        const isToxic = bannedWords.some(bannedWord => {
            if (targetMessage.content.toLowerCase().includes(bannedWord.toLowerCase())) {
                return true;
            }
            for (const word of bannedWords) {
                if (isSimilar(targetMessage.content, word)) {
                    return true;
                }
            }
            return false;
        });

        if (isToxic) {
            await targetMessage.delete().catch(console.error)
            await targetMessage.member.disableCommunicationUntil(Date.now() + (5 * 60 * 1000), 'Bad Word Usage in Message.')
                .catch(console.error);
            await interaction.reply({ content: "Bad Word detected. User got timed out for 5 minutes.", ephemeral: true })
        }else
        {
            await interaction.reply({ content: "No Bad Word detected.", ephemeral: true })
        }

    }
};
