/*
 * Copyright (c) 2019.
 * All rights lies to "VukAnd12#4407" and "Gravity Assist#0852"
 */

export default class static_functions{

    static has_user_role(user, role_name) {
        return user.roles.find(r => r.name === role_name);
    }

    static get_role(guild, role_name) {
        return guild.roles.find(r => r.name === role_name);
    }

    async temp_message(content, channel, lifetime) {
        channel.send(content).then(msg => {
            msg.delete(lifetime)
        });
        return 9;
    }

    static ContainsNoGuildDiscordInvite(content, guild){
        let search_text = content.toLowerCase();
        let contains_no_guild_invite = true;
        let n = 0;

        const invites = guild.fetchInvites();
        const guild_invites = [];

        let message_invite = "";

        for (const invite_code in invites) {
            guild_invites.push(("discord.gg/" + invite_code).toLowerCase());
            guild_invites.push(("discordapp.com/invite/" + invite_code).toLowerCase());
        }

        while (search_text.includes("discord.gg/") && contains_no_guild_invite) {
            n = search_text.search("discord.gg/");

            message_invite = search_text.substring(n, search_text.substring(n).search(" "));
            if (!guild_invites.includes(message_invite)) {
                contains_no_guild_invite = false;
            }
            search_text = search_text.substring(n + message_invite.length);
        }

        search_text = content.toLowerCase();

        while (search_text.includes("discordapp.com/invite/") && contains_no_guild_invite) {
            n = search_text.search("discordapp.com/invite/");

            message_invite = search_text.substring(n, search_text.substring(n).search(" "));
            if (!guild_invites.includes(message_invite)) {
                contains_no_guild_invite = false;
            }
            search_text = search_text.substring(n + message_invite.length);
        }

        return contains_no_guild_invite;
    }
}

