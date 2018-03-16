const Tag = require('../../models/Tag');
const eachOf = require('async').eachOf;
const moment = require('moment');

exports.run = async (client, msg) => {
    let arg1 = msg.args.shift();
    let name;
    switch(arg1){
        case 'create':
            // Create a new tag
            name = msg.args.shift();
            let content = msg.args.join(' ');
            if(!name || !content) return msg.channel.send(`${client.config.emojis.error} You must provide a tag name and content!`);
            let t = new Tag({ name: name, content: content, author: msg.author.id });
            t.save((err, nt) => {
                if(err) return msg.channel.send(`${client.config.emojis.error} There was an error saving your tag! \`\`\`${err}\`\`\``);
                msg.channel.send(`${client.config.emojis.success} Tag \`${name}\` created!`);
            });
            break;
        case 'raw':
            name = msg.args.shift();
            Tag.findOne({ name: name }, (err, tag) => {
                if(err) return msg.channel.send(`${client.config.emojis.error} There was an error getting the tag! \`\`\`${err}\`\`\``);
                if(!tag) return msg.channel.send(`${client.config.emojis.error} No tag found with the name \`${name}\`!`);
                msg.channel.send(`Content of tag \`${tag.name}\`: \`\`\`${tag.content}\`\`\``);
            });
            break;
        case 'list':
            let from = msg.args.join(' ');
            if(from){
                // Search for a user
                
            }
            // Get the author's tags
            Tag.find({ author: msg.author.id }).lean().exec((err, tags) => {
                if(err) return msg.channel.send(`${client.config.emojis.error} There was an error getting a list of tags! \`\`\`${err}\`\`\``);
                if(!tags) return msg.channel.send(`${client.config.emojis.error} You haven't created any tags!`);
                let tarr = [];
                eachOf(tags, (tag, key, cb) => {
                    // Do stuff with the tags
                    tarr.push(tag.name);
                    cb();
                }, (err) => {
                    // Done
                    return msg.channel.send(`Tags created by \`${msg.author.tag}\`:\n \`${tarr.join(', ')}\``);
                });
            });
            break;
        case 'info':
            name = msg.args.shift();
            Tag.findOne({ name: name }, (err, tag) => {
                if(err) return msg.channel.send(`${client.config.emojis.error} There was an error getting the tag! \`\`\`${err}\`\`\``);
                if(!tag) return msg.channel.send(`${client.config.emojis.error} No tag found with the name \`${name}\`!`);
                let author = client.users.get(tag.author);
                let username = author ? author.tag : 'Unkown user';
                msg.channel.send(`Info on tag \`${tag.name}\`: \`\`\` Raw content: ${tag.content}\n Created on: ${moment(tag.createdAt).format('LLLL')}\n Created by: ${username}\n ObjectId: ${tag._id}\`\`\``);
            });
            break;
        default:
            if(!arg1) return msg.channel.send(`${client.config.emojis.error} You must specify a tag name!`);
            Tag.findOne({ name: arg1 }, (err, tag) => {
                if(err) return msg.channel.send(`${client.config.emojis.error} There was an error getting the tag! \`\`\`${err}\`\`\``);
                if(!tag) return msg.channel.send(`${client.config.emojis.error} No tag found with the name \`${arg1}\`!`);
                msg.channel.send(tag.content);
            });
            break;
    }
};

exports.conf = {
    name: 'tag',
    desc: 'Create and use custom text snippets!',
    usage: '{prefix}tag [subcommand/tag name] [args]'
};