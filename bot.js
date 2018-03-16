const Discord = require('discord.js');
const enmap = require('enmap');
const { readdir } = require('fs');

const client = new Discord.Client();

client.config = require('./config.json');
client.commands = new enmap();
client.version = `0-Beta`;

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
});

client.on('message', msg => {
    if(msg.author.bot) return;
    if(msg.content.indexOf(client.config.prefix) !== 0) return;
    
    msg.args = msg.content.slice(client.config.prefix.length).trim().split(/ +/g);
    let cmd = msg.args.shift().toLowerCase();
    
    if(!client.commands.has(cmd)) return;

    let c = client.commands.get(cmd);
    c.run(client, msg);
});

client.login(client.config.token)
    .then(() => {
        console.log(`[DISCORD] Logged in!`);
    })
    .catch(e => console.error);