exports.run = async (client, msg) => {
    const RichEmbed = require('discord.js').RichEmbed;
    const embed = new RichEmbed();
    let text = '';
    text += `👥 Users: ${client.users.size}\n`;
    text += `🏡 Guilds: ${client.guilds.size}\n`;
    text += `🖥 RAM Usage: ${Math.floor(process.memoryUsage().rss / 1000000)}MB\n`;
    text += `----------------------\n`;
    text += `NodeJS v${process.version}, Spiro v${client.version}`;

    embed
        .setTitle(`${client.user.tag}'s stats`)
        .setDescription(text)
        .setTimestamp(new Date(Date.now()).toISOString());
    msg.channel.send(embed);
};

exports.conf = {
    name: 'stats',
    desc: 'Get some of the bot\'s stats.',
    usage: '{prefix}stats'
};