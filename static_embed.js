/*
 * Copyright (c) 2019.
 * All rights lies to "VukAnd12#4407" and "Gravity Assist#0852"
 */

const Discord = require('discord.js');

module.exports = {
    NoDiscordInvite,
    WelcomeMessage,
    NotAllowedCharacter,
    WrongVerifyMessage,
    TrialModAddWarn,
    TrialModAccept,
    FeatureRequest,
    FeatureRequestResponse
};


const TrialModColor = "#c8d5ee";
const wrongVerifyColor = "#ff0000";
const NotAllowedCharacterColor = "#ff0000";
const NoDiscordInviteColor = "#ff0000";
const WelcomeMessageColor = "#00ff00";
const featuremessagecolor = "#00FFFF";

function TrialModAccept(accepter, trialmod, guild) {
    return new Discord.RichEmbed()
        .setColor(TrialModColor)
        .setAuthor(accepter.username, accepter.avatarURL)
        .setTitle(`Hi, your mod application in ${guild.name} has been accepted!`)
        .setTimestamp()
        .setFooter(`For ${trialmod.username}, made by VukAnd12 and Gravity Assist`);
}

function TrialModAddWarn(trialmod) {
    return new Discord.RichEmbed() // Creates the embed thats returned to the person warning if its sent.
        .setColor(TrialModColor)
        .setTitle(`${trialmod.user.tag} has been given Trial Mod!`)
        .setTimestamp();
}

function WrongVerifyMessage(member) {
    return new Discord.RichEmbed()
        .setColor(wrongVerifyColor)
        .setTitle('You do not have permission to access discord://AAA')
        .setAuthor('Verification System', 'https://b.thumbs.redditmedia.com/OIDktcKCqI8n4CnTj2SNZAQtXjBWxo9Qah6ku96YsME.png')
        .setDescription('That\'s the wrong password. Please try again.')
        .setTimestamp()
        .setFooter(`For ${member.user.username}, made by VukAnd12 and Gravity Assist`)
        .setImage("https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/facebook/11/cross-mark_274c.png");
}

function NotAllowedCharacter(member, character) {
    return new Discord.RichEmbed()
        .setColor(NotAllowedCharacterColor)
        .setTitle('Really funny.')
        .setDescription(`${character} is not allowed here, for obvious reasons.`)
        .setImage('https://media.tenor.com/images/002ad9767dabb97d0dfcc0300ad95da7/tenor.gif')
        .setTimestamp()
        .setFooter(`For ${member.user.username}, made by VukAnd12 and Gravity Assist`);
}

function NoDiscordInvite(member) {
    return new Discord.RichEmbed()
        .setColor(NoDiscordInviteColor)
        .setTitle('Rule 6!')
        .setDescription('Per rule 6, it is not allowed to send invites to other Discord servers.')
        .setImage('https://steamuserimages-a.akamaihd.net/ugc/961973556167374789/672A76928C54C3E57E081E0EB9E9A752B18B1778/')
        .setTimestamp()
        .setFooter(`For ${member.user.username}, made by VukAnd12 and Gravity Assist`);
}

function WelcomeMessage() {
    return new Discord.RichEmbed()
        .setColor(WelcomeMessageColor)
        .setTitle('Welcome to the server!')
        .setAuthor('Join Message', 'https://b.thumbs.redditmedia.com/OIDktcKCqI8n4CnTj2SNZAQtXjBWxo9Qah6ku96YsME.png')
        .setDescription('Please read the rules and thanks for joining!')
        .setTimestamp()
        .setFooter(`Made by VukAnd12 and Gravity Assist`);
}

function FeatureRequest(requested_by, requested_feature, featureID) {
    return new Discord.RichEmbed()
        .setColor(featuremessagecolor)
        .setTitle('Feature Request')
        .addField("Requested Feature", requested_feature, false)
        .addField("Feature ID", featureID, false)
        .setAuthor(requested_by.username + "#" + requested_by.discriminator, requested_by.avatarURL)
        .setTimestamp()
        .setFooter(`Made by Gravity Assist#0852`);
}

function FeatureRequestResponse(requested_by, requested_feature, featureID) {
    return new Discord.RichEmbed()
        .setColor(featuremessagecolor)
        .setTitle('Feature Request')
        .addField("Requested Feature", requested_feature, false)
        .addField("Feature ID", featureID, false)
        .setAuthor(requested_by.username + "#" + requested_by.discriminator, requested_by.avatarURL)
        .setTimestamp()
        .setFooter(`Made by Gravity Assist#0852`);
}

