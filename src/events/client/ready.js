module.exports = {
    name: 'ready',
    once: true,
    async execute(interaction, client) {
        console.log(`Ready!!! ${client.user.tag} is logged in and online.`);

    }

}