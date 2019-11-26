/*
 * Copyright (c) 2019.
 * All rights lies to "VukAnd12#4407" and "Gravity Assist#0852"
 */


const static_embed = require("./static_embed.js");
const static_functions = require("./static_functions.js");
const bot_funcitions = require("./bot_functions.js");
const bot_modules = require("./module_functions.js");

module.exports = {
    one_letter,
    verification
};


async function verification(message, data, client){
    const member = message.member;
    const content = message.content;
    const guild = message.guild;
    const channel = message.channel;

    const memberID = member.id.toString();
    const guildID = guild.id.toString();
    const channelID = channel.id.toString();

    if (data[guildID][channelID]["nodelete"].includes(memberID)) {
        if (data[guildID]["verification"][channelID].includes(content)) {
            await member.removeRole(data[guildID]["verification"]["role"][channelID], 'Correct message');
            client.channels.get(data[guildID]["verificationlog"]).send(`[cba verification] <@${member.id}> has verified ✨✨`);
        } else {
            static_functions.temp_message(static_embed.WrongVerifyMessage(member), channel, 7000);
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