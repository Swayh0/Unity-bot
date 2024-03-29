const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ButtonInteraction, ChannelType, PermissionsBitField } = require("discord.js");


module.exports = {
    data: new SlashCommandBuilder()
    .setName('ticket')
    .setDescription("Use this command to create a ticket."),
    async execute(interaction, client) {

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: `You must be an administrator to crate a ticket message.`, ephemeral: true })

        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('button')
            .setEmoji(`✅`)
            .setStyle(ButtonStyle.Secondary),
        )

        const embed = new EmbedBuilder()
        .setColor("Random")
        .setTitle("Tickets & Support")
        .setDescription(`Click the button below to talk to staff (create a ticket)`)

        await interaction.reply({ embeds: [embed], components: [button] });

        const collector = await interaction.channel.createMessageComponentCollector();

        collector.on('collect', async i => {

            await i.update({ embeds: [embed], components: [button] });

            const channel = await interaction.guild.channels.create({
                name: `ticket ${i.user.tag}`,
                type: ChannelType.GuildText,
                parrent: `1061345753940901908`
            });

            channel.permissionOverwrites.create(i.user.id, { ViewChannel: true, SendMessages: true} );
            channel.permissionOverwrites.create(channel.guild.roles.everyone, { ViewChannel: false, SendMessages: false} );

            channel.send({ content: `Welcome to your ticket, ${i.user}. When you are finished here, have an admin delete this channel.`});
            
        });

    }
}