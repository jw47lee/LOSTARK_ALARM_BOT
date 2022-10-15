module.exports = {
  name: "ready",
  once: true,
  async execute(interaction, client) {
    console.log(`Ready!!! ${client.user.tag} is logged in and online.`);

    var refresh_time = 5000;
    var foo = true
    setInterval(() => {
        client.channel.sendmessage("here")


        // run crawler
        // update the list
        // if there is a change in the list, send embedded message
        
        
    }, refresh_time);
  },
};


var rapport_list = []
