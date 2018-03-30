exports.run = async (client, msg) => {
    const snek = require('snekfetch');
    const RichEmbed = require('discord.js').RichEmbed;

    const query = encodeURI(msg.args.join(' '));
    snek.get(`http://suggestqueries.google.com/complete/search?client=chrome&q=${query}`)
        .then(res => {
            const json = JSON.parse(res.text);
            const embed = new RichEmbed();
            embed
                .setTitle(`Completions for "${json[0]}":`)
                .setDescription(`${json[1][0]}\n${json[1][1]}\n${json[1][2]}`);
            msg.channel.send(embed);
        })
        .catch(e => {
            msg.channel.send(`${client.config.emojis.error} There was an error completing your query.\n${e}`)
        });
};

exports.conf = {
    name: 'complete',
    desc: 'Completes a query given',
    usage: '{prefix}complete [query]'
};