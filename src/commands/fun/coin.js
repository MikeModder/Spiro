exports.run = async (client, msg) => {
    let choices = [`${client.config.emojis.coin.heads} You flipped a coin and got heads!`, `${client.config.emojis.coin.tails} You flipped a coin and got tails!`];
    let response = choices[Math.floor(Math.random() * choices.length)];
    msg.channel.send(response);
};

exports.conf = {
    name: 'coinflip',
    desc: 'Flip a coin',
    usage: '{prefix}coinflip'
};