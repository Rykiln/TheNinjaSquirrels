const Discord = require("discord.js");
module.exports = {
	name: 'edit',						// Name of this command. Required for all commands.
	description: 'ADMIN: Edits existing embed messages sent by the bot.',			// [Optional] Description of this command for the help command
	aliases: [`eembed`], 			// [Optional] Permits additional command names to be used for this command 
	usage: '<#channel>',		// [Optional] Displays how to use this command in the help command.
    permissions: `MANAGE_MESSAGES`,				// [Optional] Checks for default discord.js permissions. See https://discord.js.org/#/docs/main/stable/class/Permissions?scrollTo=s-FLAGS
    args: false, 								// [Optional] When True - Requires Arguments Be Provided In Message Object
	guildOnly: true, 							// [Optional] When True - Prevents Command from being used in a Direct Message With The Bot Account
	cooldown: 5, 								// [Optional] See https://discordjs.guide/command-handling/adding-features.html#cooldowns
	execute(msgObject, args, client) {
		const embedChannel = msgObject.mentions.channels.first() || msgObject.channel;
		embedChannel.messages.fetch({ limit:1 }).then(async msgs => {
			let lastMessage = msgs.first();
			// await console.log(lastMessage.embeds[0])
			// await console.log(lastMessage.embeds[0].fields[1])
			const embed = lastMessage.embeds[0]
			await console.log(embed.fields)
			embed.fields[1] = {name: `The Samurai Squirrels`, value: `The Samurai Squirrels (TSS) is the smaller of our two guilds. TSS does have a weekly quota of 50,000 Gold (or 200K Monthly) that members are required to meet once they have been a member for more than 7 days.This quota can be met 1 of 3 ways:\n\n1) Sell/Purchase 50,000 Gold a week (200,000 Gold a month) through our trader.\n2) Deposit 12,500 Gold a week directly into our Guild Bank for Raffle Tickets. (or 50k once a month).\n3) Join and Participate in our weekly Guild Farm Runs.\n\nTSS members can participate in a weekly raffle.\nFor More Information, [Click Here](https://discord.com/channels/345025304395513867/815628139110989855/816116362501554187)`, inline: false}
			// await console.log(lastMessage.embeds[0].fields[1])
			await lastMessage.edit(embed)
		})
	},
};