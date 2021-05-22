const Discord = require("discord.js");
module.exports = {
	name: 'newembed',						// Name of this command. Required for all commands.
	description: 'ADMIN: Creates New Embed.',			// [Optional] Description of this command for the help command
	// aliases: [], 			// [Optional] Permits additional command names to be used for this command 
	// usage: '<required_args> [optional_args]',		// [Optional] Displays how to use this command in the help command.
    permissions: `MANAGE_ROLES`,				// [Optional] Checks for default discord.js permissions. See https://discord.js.org/#/docs/main/stable/class/Permissions?scrollTo=s-FLAGS
    // args: true, 								// [Optional] When True - Requires Arguments Be Provided In Message Object
	guildOnly: true, 							// [Optional] When True - Prevents Command from being used in a Direct Message With The Bot Account
	cooldown: 5, 								// [Optional] See https://discordjs.guide/command-handling/adding-features.html#cooldowns
	execute(msgObject, args, client) {
		const embed = new Discord.MessageEmbed()
			.setTitle(`The Samurai Squirrels`)
			// .setDescription(`${msgObject.guild.name} are 2 large active trading guilds, with a trader 99.9% of the time.`)
			.setColor(0x3498db)
			.setThumbnail(`attachment://tns.icon.gif`)
			.setFooter(client.user.username, client.user.displayAvatarURL())
			.setTimestamp()
			.addField(`Weekly Quota`,`Required for all members after being in the guild for seven(7) days.\nThis quota can be met 1 of 3 ways\n\n1) Sell/Purchase 50,000 Gold a week (200,000 Gold a month) through our trader.\n2) Deposit 12,500 Gold a week directly into our Guild Bank for Raffle Tickets. (or 50k once a month).\n3) Join and Participate in our weekly Guild Farm Runs.`)
			.addField(`Weekly Raffle`,`Drawn every Tuesday at 6:00pm PST (8:00pm CST | 9:00pm EST).\nTo enter: Head to any bank, select The Samurai Squirrels, & deposit your gold in incriments of 1,000 gold into the Guild Bank. 1,000 Gold = 1 ticket, 2,000 Gold = 2 tickets, 3,000 Gold = 3 tickets, etc. Buy 10 Tickets = 10,000 Gold and you get 1 Bonus Ticket FREE!`)
			.addField(`Guild Farm Runs`,`We group up, and you can head to any zone of your choice, & we pick up anything & everything we can. Most people farm nodes, some do their surveys, some farm chests, etc. This lasts for 2 hours & every 30 min. I giveaway some sort of awesome prize. You do NOT have to stay the full 2 hrs. Some come for 30 min, some for an hr., it's all up to YOU! At the end of the run, you hand over everything you've collected & THIS COUNTS TOWARDS YOUR QUOTA!`)
		msgObject.channel.send({embed, files: [{
			attachment: `./images/tns.icon.gif`,
			name: `tns.icon.gif`
		}]})
	},
};