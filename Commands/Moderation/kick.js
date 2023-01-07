const { SlashCommandBuilder, ModalSubmitFields, Embed } = require("discord.js");
const { EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("This command kicks a member from the discord server.")
    .addUserOption(option => option.setName('target').setDescription('The user you would like to kick').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('The reason for kicking the user.')),

    async execute (interaction, client) {

        const kickUser = interaction.options.getUser('target');
        const kickMember = await interaction.guild.members.fetch(kickUser.id);
        const channel = interaction.channel;

        if(!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return await interaction.reply({ content: "You must have the Kick Members permission to execute this command!", ephemeral: true});
        if(!kickMember) return await interaction.reply({ content: "The user mentioned is no longer within the server!", ephemeral: true});
        if(!kickMember.kickable) return await interaction.reply({ content: "I cannot kick that user because their roles is above me or you.", ephemeral: true});
        
        let reason = interaction.options.getString('reason');
        if (!reason) reason = "No reason given";

        const dmEmbed = new EmbedBuilder()
        .setColor("Random")
        .setDescription(`:cross: You have been kicked from **${interaction.guild.name}** | ${reason}`)

        const embed = new EmbedBuilder()
        .setColor("Green")
        .setDescription(`:cross: ${kickUser.tag} has been **kicked* | ${reason}`)

        await kickMember.send({ embeds: [dmEmbed] }).catch(err => {
            return;
        });

        await kickMember.kick({ reason: reason }).catch(err => {
            interaction.reply({ content: "there was an error", ephemeral: true});
        });

        await interaction.reply({ embeds: [embed] });

    }
}

