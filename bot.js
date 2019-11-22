/*
 * Copyright (c) 2019.
 * All rights lies to "VukAnd12#4407" and "Gravity Assist#0852"
 */

const Discord = require('discord.js');
const client = new Discord.Client();
const {prefix, token} = require('./crayons.json');
const static_embed = require("./static_embed.js");
const static_functions = require("./static_functions.js");
const verification = '604367758767161374';

client.once('ready', () => {
    console.log('crayonbox-assist has started up successfully.');
});

client.on('message', (message) => {
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
            if (channel.id !== "561997180638986242") {
                message.reply("this again? Just go to <#561997180638986242>...");
            }
        }

        if (command === "accept") {
            if (member.hasPermission("ADMINISTRATOR")) {

                const role = static_functions.get_role(guild, 'Trial Mod');
                const trial_member = mentions.members.first(); // Gets the user mentioned!(role add)

                if (!trial_member) {
                    channel.send(`The correct usage is \`${prefix}accept @user\``); // Triggers if the user donsn't tag a user in the message
                } else {
                    client.channels.get(`607218116937908256`).send(static_embed.TrialModAccept(member, trial_member.user, guild));

                    trial_member.addRole(role).catch(console.error);
                    message.delete();
                    channel.send(static_embed.TrialModAddWarn(trial_member));
                }
            } else {
                channel.send("Don't even try you actual fucking shit.");
            }
        }

        if (content.toLowerCase().startsWith("pls penis")) {
            console.log("Saw pls penis");
            if (channel.id !== "598662819323314196" && channel.type !== "dm") {
                console.log("pls penis will not be removed");
            } else {
                message.delete();
                static_functions.temp_message('Hi there! :wave:\n`pls penis` appears to be disabled in this channel.', channel, 5000);
            }

        } else if (content === "--userphone" || content === "—userphone") {
            if (channel.id === "571040720228712490") {
                message.delete();
                static_functions.temp_message('Hi there! :wave:\n`--userphone` appears to be disabled in this channel.', channel, 5000);
            }
        } else if (content === "wynn!wynntils") {
            // WYNNCRAFT
            channel.send("<https://forums.wynncraft.com/threads/wynntils-make-your-wynncraft-experience-even-better-1-12.235908/>\n(1.12.*)")
        } else if (channel.id === "638647989937897472") {
            if (member.id !== "282866197727543297") {
                if (content === "aAAaaaaA" || content === "a­A­A­aa­a­a­A") {
                    member.removeRole(verification, 'Correct message');
                    client.channels.get(`638691842795503626`).send(`[cba verification] <@${member.id}> has verified ✨✨`);
                } else {
                    static_functions.temp_message(static_embed.WrongVerifyMessage(member), channel, 7000);
                    client.channels.get(`638691842795503626`).send(`[cba verification] <@${member.id}> failed, they sent:\n${content}`);
                }

                message.delete();
            }

        } else if (content.toLowerCase().includes("b") && channel.id === "560892008840036372") {
            message.delete();
            static_functions.temp_message(static_embed.NotAllowedCharacter(member, "B"), channel, 5000);

        } else if (content.toLowerCase().includes("discord.gg/") || content.toLowerCase().includes("discordapp.com/invite/")) {
            if (!static_functions.has_user_role(member, "Discord Mod")) {

                if (!static_functions.ContainsNoGuildDiscordInvite(content, guild)) {
                    message.delete();

                    static_functions.temp_message(static_embed.NoDiscordInvite(member), channel, 5000);
                }
            }
        }
    }
});

client.on('guildMemberAdd', (guildMember) => {
    guildMember.addRole(verification, "Rules detection");
    guildMember.send(static_embed.WelcomeMessage());
});

client.login(token);