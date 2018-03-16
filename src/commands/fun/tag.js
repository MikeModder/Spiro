const Tag = require('../../models/Tag');

exports.run = async (client, msg) => {
    let arg1 = msg.args.shift();
    let name;
    switch(arg1){
        case 'create':
            // Create a new tag
            name = msg.args.shift();
            let content = msg.args.join(' ');
            if(!name || !content) return msg.channel.send(':x: You must provide a tag name and content!');
            let t = new Tag({ name, content });
            t.save((err, nt) => {
                if(err) return msg.channel.send(`:x: There was an error saving your tag! \`\`\`${err}\`\`\``);
                msg.channel.send(`✅ Tag \`${name}\` created!`);
            });
            break;
        case 'raw':
            name = args.shift();
            Tag.findOne({ name }, (err, tag) => {
                if(err) return msg.channel.send(`:x: There was an error getting the tag! \`\`\`${err}\`\`\``);
                if(!tag) return msg.channel.send(`:x: No tag found with the name \`${name}\`!`);
                msg.channel.send(`Content of tag \`${tag.name}\`: \`\`\`${tag.content}\`\`\``);
            });
            break;
        default:
            name = args.shift();
            Tag.findOne({ name }, (err, tag) => {
                if(err) return msg.channel.send(`:x: There was an error getting the tag! \`\`\`${err}\`\`\``);
                if(!tag) return msg.channel.send(`:x: No tag found with the name \`${name}\`!`);
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