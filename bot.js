const Discord = require('discord.js');
const enmap = require('enmap');
const mongoose = require('mongoose');
const { readdir } = require('fs');

const client = new Discord.Client();

client.config = require('./config.json');
client.commands = new enmap();
client.version = `0-Beta`;
client.dbReady = false;

client.updateGame = () => {
    client.user.setActivity(`over you. | Say ${client.config.prefix}help for help! | Spiro v${client.version}`, { url: 'https://github.com/MikeModder/Spiro', type: 'WATCHING' });
};

let categories = client.config.categories;
for(let i = 0; i < categories.length; i++){
    readdir(`./src/commands/${categories[i]}`, (err, files) => {
        console.log(`[COMMANDS] Loading ${files.length} commands in category ${categories[i]}...`);

        files.forEach(file => {
            let cmd = require(`./src/commands/${categories[i]}/${file}`);
            cmd.cat = categories[i];
            client.commands.set(cmd.conf.name, cmd);
        });
    });
}

client.on('ready', () => {
    console.log(`[DISCORD] Bot is ready! Logged in as ${client.user.tag}, serving ${client.users.size} users across ${client.guilds.size} guilds.`);
    client.updateGame();
    mongoose.connect(client.config.db);
    client.db = mongoose.connection;
    client.db.once('open', () => {
        console.log(`[DB] Connected to database!`);
        client.dbReady = true;
    });
    client.db.on('error', (e) => {
        console.error(e);
    });
});

client.on('message', msg => {
    if(msg.author.bot) return;
    if(msg.content.indexOf(client.config.prefix) !== 0) return;
    
    msg.args = msg.content.slice(client.config.prefix.length).trim().split(/ +/g);
    let cmd = msg.args.shift().toLowerCase();
    
    if(!client.commands.has(cmd)) return;
    if(!client.dbReady) return msg.channel.send(`:x: Please wait, we still need to connect to the database!`);

    let c = client.commands.get(cmd);
    c.run(client, msg);
});

client.login(client.config.token)
    .then(() => {
        console.log(`[DISCORD] Logged in!`);
    })
    .catch(e => console.error);