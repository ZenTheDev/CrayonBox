/*
 * Copyright (c) 2019.
 * All rights lies to "VukAnd12#4407" and "Gravity Assist#0852"
 */

const Discord = require('discord.js');
const client = new Discord.Client();
const {prefix, osoinvite} = require('./crayons.json');
const verification = '604367758767161374';


client.once('ready', () => {
    console.log('crayonbox-assist has started up successfully.');
});

function has_user_role(user, role_name) {
    return user.roles.find(r => r.name === role_name);
}

function get_role(guild, role_name) {
    return guild.roles.find(r => r.name === role_name);
}

// asynchrone 
async function temp_message(content, channel, lifetime) {
    channel.send(content).then(msg => {
        msg.delete(lifetime)
    });
}

client.on('message', message => {

    const content = message.content;
    const member = message.member;
    const author = message.author;
    const channel = message.channel;
    const guild = message.guild;
    const mentions = message.mentions;

    if (content === "<@&641280891645067305>, <@!596351092602699787> is offline.") {
        channel.send("<@!282866197727543297>");
    }

    if (!author.bot) {

        const args = content.slice(prefix.length).split(/ +/);
        const command = args.shift().toLowerCase();

        if (content.toLowerCase().includes("this is so sad")) {
            channel.send("Alexa, play the funny song.");
        }

        if (content.toLowerCase().includes("do i get roles")) {
            message.reply("you may be looking for <#581355956613414912>! There's some role menus you can use over there.\nAlso see `.xprews`.");
        }

        if (content.toLowerCase() === "creeper") {
            if (channel.id !== 561997180638986242) {
                message.reply("this again? Just go to <#561997180638986242>...");
            }
        }

        if (command === "accept") {
            if (member.hasPermission("ADMINISTRATOR")) {
                const embedColor = '#c8d5ee';

                const role = get_role(guild, 'Trial Mod');
                let trial_member = mentions.members.first(); // Gets the user mentioned!(role add)
                //let trial_member_channel = trial_member.createDM();

                if (!trial_member) {
                    channel.send(`The correct usage is \`${prefix}accept @user\``); // Triggers if the user donsn't tag a user in the message
                } else {
                    const modAcceptEmbed = new Discord.RichEmbed() // Creates the embed that's DM'ed to the user when their warned!
                        .setColor(embedColor)
                        .setAuthor(author.username, author.avatarURL)
                        .setTitle(`Hi, your mod application in ${guild.name} has been accepted!`)
                        .setTimestamp()
                        .setFooter(`For ${trial_member.user.username}, made by VukAnd12 and Gravity Assist`);

                    client.channels.get(`607218116937908256`).send(modAcceptEmbed);

                    const warnSuccessfulEmbed = new Discord.RichEmbed() // Creates the embed thats returned to the person warning if its sent.
                        .setColor(embedColor)
                        .setTitle(`${trial_member.user.tag} has been given Trial Mod!`);

                    trial_member.addRole(role).catch(console.error);
                    message.delete();
                    channel.send(warnSuccessfulEmbed);
                }

            } else {
                channel.send("Don't even try you actual fucking shit.");
            }

        }

        if (content.toLowerCase().startsWith("pls penis")) {
            console.log("Saw pls penis");
            if (channel.id !== 598662819323314196 && channel.type !== dm) {
                console.log("pls penis will not be removed");
            } else {
                message.delete();
                temp_message('Hi there! :wave:\n`pls penis` appears to be disabled in this channel.', channel, 5000);
            }

        } else if (content === "--userphone" || content === "—userphone") {
            if (channel.id === 571040720228712490) {
                message.delete();
                temp_message('Hi there! :wave:\n`--userphone` appears to be disabled in this channel.', channel, 5000);
            }
        } else if (content === "wynn!wynntils") {
            // WYNNCRAFT
            channel.send("<https://forums.wynncraft.com/threads/wynntils-make-your-wynncraft-experience-even-better-1-12.235908/>\n(1.12.*)")
        } else if (channel.id === 638647989937897472) {
            if (member.id !== 282866197727543297) {
                message.delete();

                if (content === "aAAaaaaA" || content === "a­A­A­aa­a­a­A") {
                    member.removeRole(verification, 'Correct message');
                    client.channels.get(`638691842795503626`).send(`[cba verification] <@${member.id}> has verified ✨✨`);
                } else {
                    const wrongPass = new Discord.RichEmbed()
                        .setColor('#ff0000')
                        .setTitle('You do not have permission to access discord://AAA')
                        .setAuthor('Verification System', 'https://b.thumbs.redditmedia.com/OIDktcKCqI8n4CnTj2SNZAQtXjBWxo9Qah6ku96YsME.png')
                        .setDescription('That\'s the wrong password. Please try again.')
                        .setTimestamp()
                        .setFooter(`For ${member.user.username}, made by VukAnd12`)
                        .setImage("https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/facebook/11/cross-mark_274c.png");

                    temp_message(wrongPass, channel, 7000);

                    client.channels.get(`638691842795503626`).send(`[cba verification] <@${member.id}> failed, they sent:\n${content}`);
                }
            }

        } else if (content.toLowerCase().includes("b") && channel.id === 560892008840036372) {
            message.delete();

            const b = new Discord.RichEmbed()
                .setColor('#ff0000')
                .setTitle('Really funny.')
                .setDescription('B is not allowed here, for obvious reasons.')
                .setImage('https://media.tenor.com/images/002ad9767dabb97d0dfcc0300ad95da7/tenor.gif')
                .setTimestamp()
                .setFooter(`For ${member.user.username}`);

            temp_message(b, channel, 5000);

        } else if (content.toLowerCase().includes("discord.gg/") || content.toLowerCase().includes("discordapp.com/invite/")) {
            if (!has_user_role(member, "Discord Mod")) {

                let search_text = content.toLowerCase();
                let allowed_invite = true;
                let n = 0;

                const invites = guild.fetchInvites();
                const guild_invites = [];

                for (let invite_code in invites) {
                    guild_invites.push("discord.gg/" + invite_code);
                    guild_invites.push("discordapp.com/invite/" + invite_code);
                }

                while (search_text.includes("discord.gg/") && allowed_invite) {
                    n = search_text.search("discord.gg/");
                    if (!guild_invites.includes(search_text.substring(n, search_text.substring(n).search(" ")))) {
                        allowed_invite = false;
                    }
                    search_text = search_text.substring(n + 18);
                }

                search_text = content.toLowerCase();

                while (search_text.includes("discordapp.com/invite/") && allowed_invite) {
                    n = search_text.search("discordapp.com/invite/");
                    if (!guild_invites.includes(search_text.substring(n, search_text.substring(n).search(" ")))) {
                        allowed_invite = false;
                    }
                    search_text = search_text.substring(n + 18);
                }

                if (!allowed_invite) {
                    message.delete();

                    const dcInvite = new Discord.RichEmbed()
                        .setColor('#ff0000')
                        .setTitle('Rule 6!')
                        .setDescription('Per rule 6, it is not allowed to send invites to other Discord servers.')
                        .setImage('https://steamuserimages-a.akamaihd.net/ugc/961973556167374789/672A76928C54C3E57E081E0EB9E9A752B18B1778/')
                        .setTimestamp()
                        .setFooter(`For ${member.user.username}`);

                    temp_message(dcInvite, channel, 5000);
                }
            }
        }
    }
});

client.on('guildMemberAdd', (guildMember) => {

    guildMember.addRole(verification, "Rules detection");

    const welcome = new Discord.RichEmbed()
        .setColor('#00ff00')
        .setTitle('Welcome to the server!')
        .setAuthor('Verification System', 'https://b.thumbs.redditmedia.com/OIDktcKCqI8n4CnTj2SNZAQtXjBWxo9Qah6ku96YsME.png')
        .setDescription('To chat, you need to verify you\'ve read the rules. You can do so at <#638647989937897472>.\nAnd of course, AAAAAAAAAAAAAAA')
        .setTimestamp()
        .setFooter(`Made by VukAnd12`);

    guildMember.send(welcome);
});

client.login(osoinvite);