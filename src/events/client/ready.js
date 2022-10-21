const { EmbedBuilder } = require("discord.js");
const cr = require("./crawler");

module.exports = {
  name: "ready",
  once: true,
  async execute(interaction, client) {
    console.log(`Ready!!! ${client.user.tag} is logged in and online.`);

    var refresh_time = 20000;
    var test_channel = client.channels.cache.get("1030905589410304134");
    var rapport_dic = {};

    test_channel.send(
      "Hello! LostARK bot is online! I will let you know when Legendary rapport item is up!"
    );

    setInterval(() => {
      const time = new Date();
      const current_minute = time.getMinutes();
      // console.log(rapport_dic);

      if (current_minute > 30 && current_minute < 55) {
        console.log("Do the crawler");
        cr.crawler().then((result) => {
          if (typeof result != "undefined") {
            if (Object.keys(result).length != Object.keys(rapport_dic).length) {
              console.log("Here comes legendary rapport!");
              for (const [key, value] of Object.entries(result)) {
                if (!(key in rapport_dic)) {
                  rapport_dic[key] = value;
                  embed_message = embed_creator(client, key, value);
                  test_channel.send({ embeds: [embed_message] });
                }
              }
            }
          }
        });
      } else {
        console.log("Merchant is not up");
        rapport_dic = {};
      }
    }, refresh_time);
  },
};

var rapport_list = {};

function embed_creator(client, continent, info) {
  /*
    if key == 어느 장소
        item_name = 어느 아이템
        item_map = map_url
    */

  // example map
  var item_map = info["Image"];

  const embed = new EmbedBuilder()
    .setTitle(continent + " · " + info["Area"])
    .setTimestamp(Date.now())
    .setColor(0xfaa300)
    .setAuthor({
      iconURL: client.user.displayAvatarURL(),
      name: client.user.tag,
    })
    .setFooter({
      iconURL: client.user.displayAvatarURL(),
      text: client.user.tag,
    })
    .setURL(item_map)
    .setImage(item_map)
    .addFields([
      {
        name: info["Card_Rarity"] + " card",
        value: info["Card"],
        inline: true,
      },
      {
        name: info["Rapport_Rarity"] + " rapport",
        value: info["Rapport"],
        inline: true,
      },
    ]);

  return embed;
}
