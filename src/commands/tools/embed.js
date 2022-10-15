const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("embed")
    .setDescription("Returns an embed."),
  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setTitle("This is an EMBED!")
      .setDescription("This is a very cool description")
      .setColor(0x18e1ee)
      .setImage(client.user.displayAvatarURL())
      .setThumbnail(client.user.displayAvatarURL())
      .setTimestamp(Date.now())
      .setAuthor({
        url: "https://www.youtube.com/watch?v=Qx22TnVVIfU&ab_channel=Hello%2CMyMusicPlayer",
        iconURL: interaction.user.displayAvatarURL(),
        name: interaction.user.tag
      })
      .setFooter({
        iconURL: client.user.displayAvatarURL(),
        text: client.user.tag
      })
      .setURL('https://www.youtube.com/watch?v=Qx22TnVVIfU&ab_channel=Hello%2CMyMusicPlayer')
      .addFields([
        {
            name: 'Field 1',
            value: 'Field value 1',
            inline: true
        },
        {
            name: 'Field 2',
            value: 'Field value 2',
            inline: true
        }
      ]);

      await interaction.reply({
        embeds: [embed]
      })
  },
};
