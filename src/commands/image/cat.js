const snek = require('snekfetch');
const RichEmbed = require('discord.js').RichEmbed;

exports.run = async (client, msg) => {
    snek.get('http://aws.random.cat/meow')
        .then(res => {
            let url = JSON.parse(res.text).file;
            if(!url) return msg.channel.send(`${client.config.emojis.error} There was an error getting your random cat!`);
            let embed = new RichEmbed();
            embed
                .setImage(url)
                .setURL(url)
                .setTitle(`Here's your random cat!`);
            msg.channel.send(embed);
        })
        .catch(e => {
            return msg.channel.send(`${client.config.emojis.error} There was an error getting your random cat! \n\`\`\`${e}\`\`\``);
        });
};

exports.conf = {
    name: 'cat',
    desc: 'Get a random cat image.',
    usage: '{prefix}cat'
};