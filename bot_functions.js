/*
 * Copyright (c) 2020.
 * All rights lies to "VukAnd12#4407" and "Gravity Assist#0852"
 */
const static_embed = require("./static_embed.js");
const static_functions = require("./static_functions.js");
const constant = require("./constant.js");
var fs = require('fs');

module.exports = {
    dev,
    acceptTrialMod,
    giveaway_drop,
    export_channel,
    feature
};

async function acceptTrialMod(message, client) {

    const guild = message.guild;
    const mentions = message.mentions;
    const member = message.member;
    const channel = message.channel;
    if (member.hasPermission("ADMINISTRATOR")) {
        let prefix = "c!";
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

function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function feature(message, client) {
    const action = message.content.substring(message.content.search(' ') + 1).substring(0, message.content.substring(message.content.search(' ') + 1).search(' '));
    const params = message.content.substring(message.content.search(' ') + 1).substring(message.content.substring(message.content.search(' ') + 1).search(' ') + 1);
    if (action.length !== 0) {
        if (action === 'request') {
            requestFeature(message, params, client);
        } else {
            if (constant.developerIDs.includes(message.member.id.toString())) {
                if (action === 'accept') {
                    acceptFeature(message, params, client);
                } else if (action === 'reject') {
                    rejectFeature(message, params, client);
                } else if (action === 'close') {
                    closeFeature(message, params, client);
                }
            }
        }
    } else {
        message.channel.send('Please declare a feature action.')
    }
}

async function requestFeature(message, params, client) {
    client.channels.get('665213985863499816').send('processing ... ').then(frmessage => {
        // request message
        const feature_id = frmessage.id;
        message.channel.send(static_embed.FeatureRequestResponse(message.author, params, feature_id.toString(), message.author, 'Requested')).then(fmessage => {
            // response message
            const request_id = fmessage.id;
            frmessage.edit(static_embed.FeatureRequest(message.author, params, feature_id.toString(), request_id.toString(), message.channel.id.toString(), 'Requested'));
            message.delete();
        });
    });
}

async function acceptFeature(message, params, client) {
    message.guild.channels.get('665213985863499816').fetchMessage(params).then(emessage => {
        const embed = emessage.embeds[0];

        const feature_id = embed.fields[1].value;
        const request_id = embed.fields[2].value;
        const channel_id = embed.fields[3].value;
        const request_user = client.users.get(embed.fields[4].value);

        emessage.edit(static_embed.FeatureRequest(request_user, embed.fields[0].value, feature_id, request_id, channel_id, 'Accepted'));

        client.channels.get(channel_id).fetchMessage(request_id).then(rmessage => {
            const rembed = rmessage.embeds[0];
            rmessage.edit(static_embed.FeatureRequestResponse(request_user, rembed.fields[0].value, feature_id, message.author, 'Accepted'));
            message.delete();
        });
    });
}

async function rejectFeature(message, params, client) {
    message.guild.channels.get('665213985863499816').fetchMessage(params).then(emessage => {
        const embed = emessage.embeds[0];

        const feature_id = embed.fields[1].value;
        const request_id = embed.fields[2].value;
        const channel_id = embed.fields[3].value;
        const request_user = client.users.get(embed.fields[4].value);

        emessage.edit(static_embed.FeatureRequest(request_user, embed.fields[0].value, feature_id, request_id, channel_id, 'Rejected'));

        client.channels.get(channel_id).fetchMessage(request_id).then(rmessage => {
            const rembed = rmessage.embeds[0];
            rmessage.edit(static_embed.FeatureRequestResponse(request_user, rembed.fields[0].value, feature_id, message.author, 'Rejected'));
            message.delete();
        });
    });
}

async function closeFeature(message, params, client) {
    message.guild.channels.get('665213985863499816').fetchMessage(params).then(emessage => {
        const embed = emessage.embeds[0];

        const feature_id = embed.fields[1].value;
        const request_id = embed.fields[2].value;
        const channel_id = embed.fields[3].value;
        const request_user = client.users.get(embed.fields[4].value);

        emessage.edit(static_embed.FeatureRequest(request_user, embed.fields[0].value, feature_id, request_id, channel_id, 'Closed'));

        client.channels.get(channel_id).fetchMessage(request_id).then(rmessage => {
            const rembed = rmessage.embeds[0];
            rmessage.edit(static_embed.FeatureRequestResponse(request_user, rembed.fields[0].value, feature_id, message.author, 'Closed'));
            message.delete();
        });
    });
}

async function is_higher_then_me(message, client) {
  const guild = message.guild;
  
  var higest_user_role = 0;
  var higest_bot_role = 0;
  
  const user_roles = message.guild.members.get(message.member.id).roles;
  const bot_roles = message.guild.members.get(client.user.id).roles;
  
  for (let i = 0; i < user_roles.size; i++){
    if (user_roles.array()[i].calculatedPosition > higest_user_role) {
      higest_user_role = user_roles.array()[i].calculatedPosition;
    }
  }
  
  for (let i = 0; i < bot_roles.size; i++){
    if (bot_roles.array()[i].calculatedPosition > higest_bot_role) {
      higest_bot_role = bot_roles.array()[i].calculatedPosition;
    }
  }
  
  if (higest_bot_role < higest_user_role) {
    return true;
  } else {
    return false;
    
  }
}


// accept
async function dev(message, client) {
  giveaway_drop(message, client);
    //is_higher_then_me(message, client);

// accept
async function dev(message, client) {
    feature(message, client);
}

async function save_delete(message) {
    await message.delete();
}

async function export_channel(message, client) {
    var stream = undefined;
    var lines = undefined;
    let channel = message.channel;// <-- your pre-filled channel variable
    let messagecontents = [];
    while ((await channel.fetchMessages({limit: 1}).then(messages => {
        if (messages.size === 1) {
            let lastMessage = messages.first();
            //console.log(lastMessage.content);
            messagecontents.push(lastMessage.content);
            //save_delete(lastMessage);
            lastMessage.delete();
            return true;
        } else {
            return undefined;
        }
    })) !== undefined) {
        await sleep(1000);
    }
    let content = '';
    for (let i in messagecontents) {
        content = messagecontents[i] + "\n" + content;

    }
    fs.writeFileSync("./export/" + message.channel.id + ".txt", content);
    message.member.send({
        files: ['./export/' + message.channel.id + ".txt"]
    });
}

async function giveaway_drop(message, client) {
    const errorEmoji = client.emojis.get("665989257197912115");
    const giftEmoji = client.emojis.get("665989945868943380");
    const dropEmoji = client.emojis.get("665990890438918174");
    const filter = (reaction, user) => {
        return ["665990890438918174"].includes(reaction.emoji.id) && user.bot === false;
    };

    if (message.member.permissions.has('ADMINISTRATOR') == true || is_higher_then_me(message, client)) {
        if (message.mentions.channels.size !== 0) {
            if ((message.content.substring(message.content.search(' ') + 1).search(' ') + 1) !== 0) {
                const prize = message.content.substring(message.content.search(' ') + 1).substring(message.content.substring(message.content.search(' ') + 1).search(' ') + 1);
                message.channel.send(`${dropEmoji.toString()} **Dropping now...**\nSure! Dropping ${prize} now, **${message.member.user.tag}**...`)
                message.mentions.channels.first().send(static_embed.GiveawayDrop(prize, message.author))
                    .then(gmessage => {
                        gmessage.react('665990890438918174');
                        try {
                            gmessage.awaitReactions(filter, {max: 1, time: 600000, errors: ['time']})
                                .then(collected => {
                                    const reaction = collected.first();
                                    const winner = collected.first().users.last();
                                    if (reaction.emoji.id === '665990890438918174') {
                                        gmessage.clearReactions();
                                        gmessage.edit(static_embed.GiveawayWinner(prize, message.author, '<@!' + winner.id + '>'));
                                        gmessage.channel.send(`${giftEmoji.toString()} **Winner!**\n<@!${winner.id}> won ${prize}!`);
                                        winner.send(`${giftEmoji.toString()} __**You won the giveaway drop!**__ ${giftEmoji.toString()}\n*Your prize is:* \`${prize}\` \nContact <@!${message.member.id}> to collect your prize.`);
                                        if (prize.toLowerCase().includes("steam")) {
                                            winner.send("**EXTRA INFO**\nIt looks like you won a Steam game code! Here's how to claim it: https://gyazo.com/e2ab5637224bece69f65328fc58409c5");
                                        }
                                    }
                                }).catch(collected => {
                                gmessage.clearReactions();
                                gmessage.edit(static_embed.GiveawayInvalid(prize, message.author));
                                gmessage.channel.send(`**Expired!**\nOh no! ${prize} expired!\n${prize} can no longer be claimed. 😢\nPrizes expire after 10 minutes.`);
                            });
                        } catch (e) {
                        }
                    });
            } else {
                message.channel.send(`${errorEmoji.toString()} **No prize**\nI can\'t really know what I\'m supposed to drop if you don\'t tell me... I think you forgot to mention what you want to drop.`);
            }
        } else {
         message.channel.send(`${errorEmoji.toString()} **Invalid/no channel**\nYes, that\'s a cool drop you got there, but where am I supposed to drop? I think you forgot to mention the channel...`);
        }
    } else {
        message.channel.send(`${errorEmoji.toString()} Sorry to say but uh, you need administrator permissions on this server to make drops.`)   
    }
}
