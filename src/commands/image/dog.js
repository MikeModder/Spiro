const snek = require('snekfetch');
const RichEmbed = require('discord.js').RichEmbed;

exports.run = async (client, msg) => {
    snek.get('http://random.dog/woof.json')
        .then(res => {
            let url = JSON.parse(res.text).url;
            if(!url) return msg.channel.send(`${client.config.emojis.error} There was an error getting your random dog!`);
            let embed = new RichEmbed();
            embed
                .setImage(url)
                .setURL(url)
                .setTitle(`Here's your random dog!`);
            msg.channel.send(embed);
        })
        .catch(e => {
            return msg.channel.send(`${client.config.emojis.error} There was an error getting your random dog! \n\`\`\`${e}\`\`\``);
        });
};

exports.conf = {
    name: 'dog',
    desc: 'Get a random dog image.',
    usage: '{prefix}dog'
};