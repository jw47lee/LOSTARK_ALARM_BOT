const { EmbedBuilder } = require("discord.js");
const cr = require('./crawler');

module.exports = {
  name: "ready",
  once: true,
  async execute(interaction, client) {
    console.log(`Ready!!! ${client.user.tag} is logged in and online.`);

    var refresh_time = 30000;
    var test_channel = client.channels.cache.get("1030905589410304134");

    test_channel.send(
      "Hello! LostARK bot is online! I will let you know when Legendary rapport item is up!"
    );

    setInterval(async () => {
      const time = new Date();
      const current_minute = time.getMinutes();

      // test input
      /** 
      console.log(current_minute);
      var test_result = new Map([
        ["Continent", ["Area", "Legendary_item_name"]],
      ]);
      console.log("Continent");
      console.log(test_result.get("Continent"));
      embed_message = embed_creator(
        client,
        "Continent",
        test_result.get("Continent")
      );
      test_channel.send({
        embeds: [embed_message],
      });
      */

      if (current_minute > 30 && current_minute < 55) {
        console.log("do the crawler");
        //run crawler and get result
        // TODO
        const result = await cr.crawler();
        console.log(result);
        /*
        if (Object.keys(result).length != Object.keys(rapport_dic).length) {
          for (const [key, value] of Object.entries(result)) {
            if (!(key in rapport_dic)) {

              // if there is a change in the list, send embedded message
              // add rapport

              rapport_dic[key] = value;
              embed_message = embed_creator(key, value);
              test_channel.send({
                embeds: [embed_creator()],
              });
            }
          }
        }
        */

      } else {
        console.log('Merchant is not up');
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
  var item_map = "https://i.imgur.com/oqTzPl3.png";

  const embed = new EmbedBuilder()
    .setTitle("전호 @" + continent)
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
        name: info[0],
        value: info[1],
        inline: true,
      },
    ]);

  return embed;
}
