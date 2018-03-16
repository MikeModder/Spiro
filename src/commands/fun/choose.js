exports.run = async (client, msg) => {
    let options = msg.args;
    let choose = options[Math.floor(Math.random() * options.length)];
    msg.channel.send(`I choose **${choose}**!`);
};

exports.conf = {
    name: 'choose',
    desc: 'Chooses a random thing',
    usage: '{prefix}choose [option 1] [option 2] [ect]'
};