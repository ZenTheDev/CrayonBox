/*
 * Copyright (c) 2019.
 * All rights lies to "VukAnd12#4407" and "Gravity Assist#0852"
 */

const Discord = require('discord.js');
const fs = require('fs');

const {token} = require('./crayons.json');

const static_embed = require("./static_embed.js");
const static_functions = require("./static_functions.js");
const bot_functions = require("./bot_functions.js");
const bot_modules = require("./module_functions.js");

const verification = '604367758767161374';

const client = new Discord.Client();

const jsonData = JSON.parse(fs.readFileSync('./data.json', 'utf8'));


const jsonActions = {
    0: bot_functions.test,
    1: bot_functions.acceptTrialMod
};
const modules = {
    1: bot_modules.one_letter,
    2: bot_modules.verification,
    3: bot_modules.banned_characters,
};



client.once('ready', () => {
    console.log('crayonbox-assist has started up successfully.');
});

client.on('message', (message) => {

    let old_data = JSON.stringify(jsonData, null, 2);
    
    const member = message.member;
    const channel = message.channel;
    const content = message.content;
    
    const channelID = message.channel.id.toString();
    
    let guildID;
    let guild;
    if (channel.type !== "dm") {
        guild = message.guild;
        guildID = guild.id.toString();
        const prefix = jsonData[guildID]["prefix"];
    } else {
        const prefix = jsonData["baseprefix"];
    }

    if (content.toLowerCase() === "creeper") {
        if (channel.id !== "561997180638986242") {
            message.reply("this again? Just go to <#561997180638986242>...");
        }
    }

    if (!message.author.bot) {
        if (message.content.toLowerCase().startsWith(prefix) && channel.type !== "dm") {

            const args = message.content.slice(prefix.length).split(/ +/);
            const command = args.shift().toLowerCase();

            if (jsonData[guildID]["commands"].hasOwnProperty(command)) {
                jsonActions[jsonData[guildID]["commands"][command]["action"].toString()](message, client);
            } else {
                channel.send("Unknow command");
            }
        } else {

            // solve everything over JSON Configuration
            if (channel.type !== "dm") {
                if (jsonData[guildID]["specialchannels"].includes(channelID)) {
                    modules[jsonData[guildID][channelID]["use"].toString()](message, jsonData, client);
                }
            }
            

            // not implemented into JSON configuration
            // SPECIAL COMMANDS
            if (content === "<@&641280891645067305>, <@!596351092602699787> is offline.") {
                channel.send("<@!282866197727543297>");
            } else if (content.toLowerCase() === "creeper") {
                if (channel.id !== "561997180638986242") {
                    message.reply("this again? Just go to <#561997180638986242>...");
                }
            } else if (content.toLowerCase().includes("this is so sad")) {
                channel.send("Alexa, play the funny song.");
            } else if (content.toLowerCase().includes("do i get roles")) {
                message.reply("you may be looking for <#581355956613414912>! There's some role menus you can use over there.\nAlso see `.xprews`.");
            }

            if (content.toLowerCase().includes("discord.gg/") || content.toLowerCase().includes("discordapp.com/invite/")) {
                if (!static_functions.has_user_role(member, "Discord Mod")) {

                    if (!static_functions.ContainsNoGuildDiscordInvite(content, guild)) {
                        message.delete();

                        static_functions.temp_message(static_embed.NoDiscordInvite(member), channel, 5000);
                    }
                }
            } else if (content.toLowerCase().startsWith("pls penis")) {
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
                channel.send("<https://forums.wynncraft.com/threads/wynntils-make-your-wynncraft-experience-even-better-1-12.235908/>\n(1.12.*)");
            }
        }
    }
    if (old_data !== JSON.stringify(jsonData, null, 2)) {
        fs.writeFileSync("./data.json", JSON.stringify(jsonData, null, 2));
    }
});

client.on('guildMemberAdd', (guildMember) => {
    guildMember.addRole(verification, "Rules detection");
    guildMember.send(static_embed.WelcomeMessage());
});

client.login(token);
