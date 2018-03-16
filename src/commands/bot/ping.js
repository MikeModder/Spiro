exports.run = async (client, msg) => {
    msg.channel.send(`:ping_pong: -- Pong! Current ping is ${Math.round(client.ping)}ms`);
};

exports.conf = {
    name: 'ping',
    desc: 'Check the bot\'s ping',
    usage: '{prefix}ping'
};