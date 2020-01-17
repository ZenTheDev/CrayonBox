/*
 * Copyright (c) 2019.
 * All rights lies to "VukAnd12#4407" and "Gravity Assist#0852"
 */

module.exports = {
    has_user_role,
    get_role,
    getAfterSpace,
    ContainsNoGuildDiscordInvite,
    temp_message
};


function has_user_role(user, role_name) {
    return user.roles.find(r => r.name === role_name);
}

function get_role(guild, role_name) {
    return guild.roles.find(r => r.name === role_name);
}

// function made by @ZenTheDev on twitter || https://twitter.com/ZenTheDev
function getAfterSpace(str) {
    return str.split(' ')[1];
}

async function temp_message(content, channel, lifetime) {
    channel.send(content).then(msg => {
        msg.delete(lifetime);
    });
    return 9;
}

/**
 * @return {boolean}
 */
async function ContainsNoGuildDiscordInvite(content, guild) {
    let search_text = content.toLowerCase();
    let contains_no_guild_invite = false;
    let n = 0;

    const invites = await guild.fetchInvites();
    const guild_invites = [];

    let message_invite = "";

    for (const invite_code in invites.array()) {
        guild_invites.push(("discord.gg/" + (invites.array()[invite_code].code)).toLowerCase());
        guild_invites.push(("discordapp.com/invite/" + (invites.array()[invite_code].code)).toLowerCase());
    }

    while (search_text.includes("discord.gg/") && !contains_no_guild_invite) {
        n = search_text.search("discord.gg/");

        if (search_text.substring(n).search(" ") === -1) {
            message_invite = search_text.substring(n);
        } else {
            message_invite = search_text.substring(n, search_text.substring(n).search(" "));
        }
        if (!guild_invites.includes(message_invite)) {
            contains_no_guild_invite = true;
        }
        search_text = search_text.substring(n + message_invite.length);
    }

    search_text = content.toLowerCase();

    while (search_text.includes("discordapp.com/invite/") && !contains_no_guild_invite) {
        n = search_text.search("discordapp.com/invite/");

        if (search_text.substring(n).search(" ") === -1) {
            message_invite = search_text.substring(n);
        } else {
            message_invite = search_text.substring(n, search_text.substring(n).search(" "));
        }
        if (!guild_invites.includes(message_invite)) {
            contains_no_guild_invite = true;
        }
        search_text = search_text.substring(n + message_invite.length);
    }

    return contains_no_guild_invite;
}


