exports.run = async (client, msg) => {
    let RichEmbed = require('discord.js').RichEmbed;
    let command = msg.args[0];
    if(!command){
        let embed = new RichEmbed();
        embed.setTitle('Commands');
        client.commands.forEach(c => {
            embed.addField(c.conf.name, c.conf.desc);
        });
        return msg.author.send(embed).then(() => { msg.react('✅'); }).catch(e => { msg.channel.send(`***${msg.author.tag}***, I couldn't send you a DM with the commands!`); });
    }

    if(!client.commands.has(command)) return msg.channel.send(`:x: That isn't a valid command!`);
    let c = client.commands.get(command);
    let embed = new RichEmbed();
    embed
        .setTitle(`${command} help`)
        .setDescription(c.conf.desc)
        .addField('Usage:', c.conf.usage.replace(`{prefix}`, client.config.prefix));
    msg.channel.send(embed);
};

exports.conf = {
    name: 'help',
    desc: 'Shows command help',
    usage: '{prefix}help [command]'
};