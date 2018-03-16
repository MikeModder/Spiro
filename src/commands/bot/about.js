const RichEmbed = require('discord.js').RichEmbed;

exports.run = async (client, msg) => {
    let embed = new RichEmbed();
    embed
        .setTitle(`About ${client.user.tag}`)
        .setThumbnail(client.user.avatarURL)
        .addField('NodeJS Version', process.version)
        .addBlankField()
        .addField('Spiro', `v${client.version}`)
        .addField('Source', 'https://github.com/MikeModder/Spiro');
    
    msg.channel.send(embed);
};

exports.conf = {
    name: 'about',
    desc: 'Show some info about the bot.',
    usage: '{prefix}about'
};