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

let jsonData = JSON.parse(fs.readFileSync('./data.json', 'utf8'));


const jsonActions = {
    0: bot_functions.test,
    1: bot_functions.acceptTrialMod,
    2: bot_functions.feature_request
};
const modules = {
    1: bot_modules.one_letter,
    2: bot_modules.banned_characters,
};

async function dev() {

    const anarchy = client.guilds.get("652458385161322496");
    var orginal_invite = jsonData["652458385161322496"]["invite"];

    var orginal_exist = false;
    var invites = await anarchy.fetchInvites();
    var counter = 0;

    if (invites.size === 0) {
        counter = invites.size;
    } else {

        invites.forEach(invite => {
            if (counter !== invites.size) {
                const invite_code = invite.code;
                if (invite_code === orginal_invite) {
                    orginal_exist = true;
                    counter = invites.size;
                } else {
                    counter += 1;
                }
            }
        });
    }

    while (counter !== invites.size) {} // Wait until foreach is finish

    if (!orginal_exist) {
        let invite_channel = null;
        let channel_counter = 0;
        anarchy.channels.forEach(channel => {
            if (channel_counter !== anarchy.channels.size) {
                if (channel.type === "text") {
                    invite_channel = channel;
                    channel_counter = anarchy.channels.size
                } else {
                    channel_counter += 1;

                }
            }
        });

        while (channel_counter !== anarchy.channels.size) {
        } // Wait until foreach is finish

        if (invite_channel === null) {
            invite_channel = await anarchy.createChannel("General", "text", false, "no text channel");
        }
        let newInvite = await invite_channel.createInvite({
            maxUses: false, // After one use it will be void
            unique: true, // That tells the bot not to use an existing invite so that this will be unique
            maxAge: 0 // By default invites last 24 hours. If you want to change that, modify this (0 = lasts forever, time in seconds)
        });

        console.log("https://discord.gg/" + newInvite.code);

        const Aserver = client.guilds.get("542073176729976842");
        const announcements_channel = Aserver.channels.get("575362738365267978");

        announcements_channel.send("https://discord.gg/" + newInvite.code);

        jsonData[anarchy.id.toString()]["invite"] = newInvite.code;

        fs.writeFileSync("./data.json", JSON.stringify(jsonData, null, 2));
    } else {
        // EVERYTHING OK
    }
}

function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}
client.once('ready', async () => {
    console.log('crayonbox-assist has started up successfully.');
    while (1 === 1) {
        dev();
        await sleep(10000);
    }
});

client.on('guildUpdate', (oldGuild, newGuild) => {
    oldGuild.fetchInvites()
        .then(invites => console.log(`Fetched ${invites.size} invites`))
        .catch(console.error);
    newGuild.fetchInvites()
        .then(invites => console.log(`Fetched ${invites.size} invites`))
        .catch(console.error);
});

client.on('message', (message) => {

    /*if (message.content.toLowerCase() === "test") {
        dev();
    }*/
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
                    channel.send("Unknow command").then();
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
