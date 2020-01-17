/*
 * Copyright (c) 2020.
 * All rights lies to "VukAnd12#4407", "Gravity Assist#0852" and "Zen#4633"
 */

const Discord = require('discord.js');
const fs = require('fs');

const {token} = require('./crayons.json');

const static_embed = require("./static_embed.js");
const static_functions = require("./static_functions.js");
const bot_functions = require("./bot_functions.js");
const bot_modules = require("./module_functions.js");


const client = new Discord.Client();

let jsonData = JSON.parse(fs.readFileSync('./data.json', 'utf8'));


const jsonActions = {
    0: bot_functions.dev,
    1: bot_functions.acceptTrialMod,
    2: bot_functions.feature,
    3: bot_functions.giveaway_drop,
    4: bot_functions.export_channel,
  5: bot_functions.createVote
};
const modules = {
    1: bot_modules.one_letter,
    2: bot_modules.verification,
    3: bot_modules.banned_characters,
    4: bot_modules.no_discord_invites
};

function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}
// function made by @ZenTheDev on twitter || https://twitter.com/ZenTheDev
function getAfterSpace(str) {
    return str.split(' ')[1];
}
   
// function made by @ZenTheDev on twitter || https://twitter.com/ZenTheDev
function hasUpperCase(str) {
    return (/[A-Z]/.test(str));
}

client.once('ready', async () => {
    console.log('crayonbox-assist has started up successfully.');
  client.user.setActivity('with the crayons', { type: 'PLAYING' });
    /*while (1 === 1) {
        //dev();
        await sleep(10000);
    }*/
});

client.on('guildUpdate', (oldGuild, newGuild) => {
    oldGuild.fetchInvites()
        .then(invites => console.log(`Fetched ${invites.size} invites`))
        .catch(console.error);
    newGuild.fetchInvites()
        .then(invites => console.log(`Fetched ${invites.size} invites`))
        .catch(console.error);
    console.log('guildUpdate');
});

client.on('messageUpdate', (oldMessage, newMessage) => {

    if (!oldMessage.author.bot) {
        const channel = oldMessage.channel;
        const channelID = oldMessage.channel.id.toString();
        if (channel.type !== "dm") {
            try {
                const guildID = oldMessage.guild.id.toString();
                if (jsonData[guildID]["specialchannels"].includes(channelID)) {
                    modules[jsonData[guildID][channelID]["use"].toString()](newMessage, jsonData, client);
                }
            } catch (e) {

            }
        }
    }
});

client.on('message', (message) => {

    let old_data = JSON.stringify(jsonData, null, 2);

    const member = message.member;
    const channel = message.channel;
    const content = message.content;

    const channelID = message.channel.id.toString();

    let guildID;
    let guild;
    let prefix = "c!";

    if (channel.type !== "dm") {
        guild = message.guild;
        guildID = guild.id.toString();
        prefix = jsonData[guildID]["prefix"];
    }

    if (content.toLowerCase() === "creeper") {
        if (channel.id !== "561997180638986242") {
            channel.send("this again? Just go to <#561997180638986242>...").then();
        }
    }

    if (!message.author.bot) {
        if (message.content.toLowerCase().startsWith(prefix)) {

            const args = message.content.slice(prefix.length).split(/ +/);
            const command = args.shift().toLowerCase();

            if (channel.type !== "dm") {
                if (jsonData[guildID]["commands"].hasOwnProperty(command)) {
                    jsonActions[jsonData[guildID]["commands"][command]["action"].toString()](message, client);
                } else {
                    channel.send("Uh oh! I don't think that command exists...").then();
                }
            }

        } else {

            // solve everything over JSON Configuration
            if (channel.type !== "dm") {
                try {
                    if (jsonData[guildID]["specialchannels"].includes(channelID)) {
                        modules[jsonData[guildID][channelID]["use"].toString()](message, jsonData, client);
                    }
                } catch (e) {

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
                    modules[4](message, jsonData, client);
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
            } else if (content.toLowerCase().includes("mick") && content.toLowerCase().includes("retard")) {
                channel.send("", {
                    file: "https://i.imgur.com/IDrWOXx.png" // Or replace with FileOptions object
                });
            } else if (message.channel.id === "665351863847092245") {
                if (message.content.length > 10) {
                    message.delete()
                    channel.send("too long")
                        .then(newMessage => newMessage.delete(2000));
                }
                if (hasUpperCase(content) == true) {
                    message.delete()
                    channel.send("No ^case")
                        .then(newMessage => newMessage.delete(2000));
                } 
            } else if (message.guild.id == "664918431040012328" && content.toLowerCase().includes("nigger")) {
                message.delete();
                channel.send(`<@!${message.author.id}> You aren't allowed to say the n word, sorry man`)
                    .then(newMessage => newMessage.delete(2000));
            } else if (message.guild.id == "664918431040012328" && content.toLowerCase().includes("cl!say "))
                channel.send(`${static_functions.getAfterSpace(content)}!`)
            }
        }
    }
    if (old_data !== JSON.stringify(jsonData, null, 2)) {
        fs.writeFileSync("./data.json", JSON.stringify(jsonData, null, 2));
    }
});

client.on('guildMemberAdd', (guildMember) => {
    guildMember.send(static_embed.WelcomeMessage());
});

client.login(token);
