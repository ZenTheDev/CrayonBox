/*
 * Copyright (c) 2020.
 * All rights lies to "VukAnd12#4407" and "Gravity Assist#0852"
 */


const static_embed = require("./static_embed.js");
const static_functions = require("./static_functions.js");

module.exports = {
    one_letter,
    verification,
    banned_characters,
    no_discord_invites
};


async function verification(message, data, client){
    const member = message.member;
    const content = message.content;
    const guild = message.guild;
    const channel = message.channel;

    const memberID = member.id.toString();
    const guildID = guild.id.toString();
    const channelID = channel.id.toString();

    if (!data[guildID][channelID]["nodelete"].includes(memberID)) {
        if (data[guildID]["verification"][channelID].includes(content)) {
            if (guildID === '665195766247325708') {
              await member.addRole(data[guildID]["verification"]["role"][channelID], 'Correct message');
            } else {
              await member.removeRole(data[guildID]["verification"]["role"][channelID], 'Correct message');
            }
            client.channels.get(data[guildID]["verificationlog"]).send(`[cba verification] <@${member.id}> has verified ✨✨`);
        } else {
            await static_functions.temp_message(static_embed.WrongVerifyMessage(member), channel, 7000);
            client.channels.get(data[guildID]["verificationlog"]).send(`[cba verification] <@${member.id}> failed, they sent:\n${content}`);
        }

        message.delete();
    }
}

async function one_letter(message, data, client) {
    const content = message.content;
    if (content.length !== 1) {
        message.delete();
    }
}

async function banned_characters(message, data, client) {
    const member = message.member;
    const content = message.content;
    const guild = message.guild;
    const channel = message.channel;

    const guildID = guild.id.toString();
    const channelID = channel.id.toString();

    let excluded = content.toLowerCase();
    data[guildID][channelID]["ignore"].forEach(function (item, index) {
        excluded = excluded.replace(item, "");
    });

    let passing = true;

    data[guildID][channelID]["forbidden"].forEach(function (item, index) {
        if (excluded.includes(item)){
            passing = false;
        }
    });

    if (!passing){
        message.delete();
        await static_functions.temp_message(static_embed.NotAllowedCharacter(member, "B"), channel, 5000);
    }
}

async function no_discord_invites(message, data, client) {
    const content = message.content;
    const guild = message.guild;
    const member = message.member;
    const channel = message.channel;


    if (await static_functions.ContainsNoGuildDiscordInvite(content, guild)) {
        if (message.member.permissions.has('ADMINISTRATOR') == false && static_functions.is_higher_then_me(message, client) == false) {
            message.delete();
            await static_functions.temp_message(static_embed.NoDiscordInvite(member), channel, 5000);
        }
    }
}

