const streams = require('memory-streams');
const Attachment = require('discord.js').Attachment;
const moment = require('moment');

exports.run = async (client, msg) => {
    if(!msg.member.permissions.has('MANAGE_CHANNELS')) return msg.channel.send(`${client.config.emojis.error} You don't have permission to run that command!`);
    msg.channel.send('Please wait, I\'ll try to dump the messages now...');
    let debug = false;
    if(msg.args[0] === 'debug') debug = true;
    let log = new streams.WritableStream();
    let finished = false;
    let offset = msg.id;
    let dumpCount = 0;
    if(debug) msg.channel.send(`Warning: Debug mode was enabled so status messages will be sent.`);
    while(!finished){
        if(debug) msg.channel.send(`Offset: ${offset}, Count: ${dumpCount}`);
        let msgs = await msg.channel.fetchMessages({ limit: 100, before: offset })
            .catch(e => {
                return msg.channel.send(`${client.config.emojis.error} There was an error dumping messages!\n${e}`);
            });
        if(msgs.size < 100) {
            //if there's less than 100 messages we should be done
            finished = true;
        }
        msgs.forEach(m => {
            log.write(`[${moment(m.createdAt).format('lll')}][${m.author.username}#${m.author.discriminator}]${m.author.bot ? '[BOT]' : ''}: ${m.cleanContent}\n`);
            offset = m.id;
            dumpCount++;
        });
    }
    let attachment = new Attachment(log.toBuffer(), `${msg.channel.name}-dump.txt`);
    msg.channel.send(`Here's your dump!`, attachment)
        .catch(e => {
            msg.channel.send(`${client.config.emojis.error} There was an error dumping messages!\n${e}`);
        });
    log.end();
};

exports.conf = {
    name: 'dump',
    desc: 'Dumps the current channel',
    usage: '{prefix}dump'
};