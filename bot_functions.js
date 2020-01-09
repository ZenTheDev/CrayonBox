/*
 * Copyright (c) 2020.
 * All rights lies to "VukAnd12#4407" and "Gravity Assist#0852"
 */
const static_embed = require("./static_embed.js");
const static_functions = require("./static_functions.js");


module.exports = {
    test,
    acceptTrialMod,
    feature_request,
    giveaway_drop
};


async function test(message, client) {
    const channel = message.channel;

    channel.send("Don't even try you actual fucking shit.");
}


async function feature_request(message, client) {
    const content = message.content;
    const requested_feature = content.substring(content.search(" ") + 1);

    client.channels.get(`644544776753905670`).send(static_embed.FeatureRequest(message.author, requested_feature, parseInt(message.id).toString(16)));
    await message.channel.send(static_embed.FeatureRequestResponse(message.author, requested_feature, parseInt(message.id).toString(16)));
}

async function acceptTrialMod(message, client) {
    const guild = message.guild;
    const mentions = message.mentions;
    const member = message.member;
    const channel = message.channel;
    if (member.hasPermission("ADMINISTRATOR")) {

        const role = static_functions.get_role(guild, 'Trial Mod');
        const trial_member = mentions.members.first(); // Gets the user mentioned!(role add)

        if (!trial_member) {
            channel.send(`The correct usage is \`${prefix}accept @user\``); // Triggers if the user donsn't tag a user in the message
        } else {
            client.channels.get("607218116937908256").send(static_embed.TrialModAccept(member, trial_member.user, guild));

            trial_member.addRole(role).catch(console.error);
            message.delete();
            channel.send(static_embed.TrialModAddWarn(trial_member));
        }
    } else {
        channel.send("Don't even try you actual fucking shit.");
    }
}

async function giveaway_drop(message, data, client) {
    const filter = (reaction, user) => {
        return ['🎉'].includes(reaction.emoji.name) && user.bot === false && user.id !== message.member.id;
    };
    if (message.member.permissions.has('ADMINISTRATOR')) {
        if (message.mentions.channels.size !== 0) {
            if ((message.content.substring(message.content.search(' ') + 1).search(' ') + 1) !== 0) {
                const prize = message.content.substring(message.content.search(' ') + 1).substring(message.content.substring(message.content.search(' ') + 1).search(' ') + 1);
                message.mentions.channels.first().send(static_embed.GiveawayDrop(prize, message.author))
                    .then(gmessage => {
                        gmessage.react('🎉');
                        try {
                            gmessage.awaitReactions(filter, {max: 1, time: 600000, errors: ['time']})
                                .then(collected => {
                                    const reaction = collected.first();
                                    const winner = collected.first().users.last();
                                    if (reaction.emoji.name === '🎉') {
                                        gmessage.clearReactions();
                                        gmessage.edit(static_embed.GiveawayWinner(prize, message.author, '<@!' + winner.id + '>'));
                                        gmessage.channel.send('<@!' + winner.id + '>' + ' has won the giveaway prize ' + prize);
                                        winner.send(`🎉 __**You are the the Giveaway Drop winner**__ 🎉\n*Your prize is:* \`${prize}\` \nContact <@!${message.member.id}> to collect your prize.`);
                                    }
                                }).catch(collected => {
                                    gmessage.clearReactions();
                                    gmessage.edit(static_embed.GiveawayInvalid(prize, message.author));
                                    gmessage.channel.send(`Oh no! ${prize} expired!\n${prize} can no longer be claimed. 😢`)
                            });
                        } catch (e) {}
                    });
            } else {
                message.channel.send('I didn\'t see any prize.');
            }
        } else {
         message.channel.send('I didn\'t see any channel.');
        }
    } 
}
