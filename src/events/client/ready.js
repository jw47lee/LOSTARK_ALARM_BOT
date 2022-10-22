const { EmbedBuilder } = require("discord.js");
const cr = require("./crawler");

module.exports = {
  name: "ready",
  once: true,
  async execute(interaction, client) {
    console.log(`Ready!!! ${client.user.tag} is logged in and online.`);

    var refresh_time = 30000;
    var test_channel = client.channels.cache.get("1030905589410304134");
    
    var rapport_dic = {};
    // azena_tag = "<@&1032846558431031356>"
    /*
    test_channel.send({
      content:
        `Hello! LostARK bot is online! I will let you know when Legendary rapport item is up!` +
        "<@&1033169897456418836>, <@&1033169978251292732>",
      embeds: [test_embed_creator(client)],
    });
    */

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
                  test_channel.send({
                    //content: azena_tag,
                    embeds: [embed_message],
                  });
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

function test_embed_creator(client) {
  const embed = new EmbedBuilder()
    .setTitle("continent" + " · " + "Area" + "<@&1033169978251292732>")
    .setTimestamp(Date.now())
    .setColor(0xfaa3aa)
    .setAuthor({
      iconURL: client.user.displayAvatarURL(),
      name: client.user.tag,
    })
    .setFooter({
      iconURL: client.user.displayAvatarURL(),
      text: client.user.tag,
    })
    .setURL("https://www.youtube.com/watch?v=ByH9LuSILxU&ab_channel=AwwAnimals")
    .setImage(
      "https://styles.redditmedia.com/t5_2r5i1/styles/communityIcon_x4lqmqzu1hi81.jpg"
    )
    .addFields([
      {
        name: "aaa",
        value: "aaa",
        inline: true,
      },
      {
        name: "bbb",
        value: "bbb",
        inline: true,
      },
    ]);

  return embed;
}
