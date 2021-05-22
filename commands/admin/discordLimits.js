const Discord = require("discord.js");
module.exports = {
	name: 'discordlimits',																							// Name of this command. Required for all commands.
	description: 'ADMIN: Displays Server Information In Comparison To The Maximum Discord Limitations.',			// [Optional] Description of this command for the help command
	aliases: ['limitations', `limits`], 																			// [Optional] Permits additional command names to be used for this command 
	// usage: '<required_args> [optional_args]',																	// [Optional] Displays how to use this command in the help command.
    permissions: `MANAGE_CHANNELS`,																					// [Optional] Checks for default discord.js permissions. See https://discord.js.org/#/docs/main/stable/class/Permissions?scrollTo=s-FLAGS
    // args: true, 																									// [Optional] When True - Requires Arguments Be Provided In Message Object
	guildOnly: true, 																								// [Optional] When True - Prevents Command from being used in a Direct Message With The Bot Account
	cooldown: 5, 																									// [Optional] See https://discordjs.guide/command-handling/adding-features.html#cooldowns
	execute(msgObject, args, client) {
		// Get Current Discord Server Data
		const serverBoostStatus = msgObject.guild.premiumTier;
		const serverMembers = msgObject.guild.memberCount;
		const serverRoles = msgObject.guild.roles.cache.size;
		const serverEmojisTotal = msgObject.guild.emojis.cache;
		const serverEmoji = serverEmojisTotal.filter(e => {return e.animated === false}).size
		const serverEmojiAnimated = serverEmojisTotal.filter(e => {return e.animated === true}).size
		const serverChannels = msgObject.guild.channels.cache;
		const serverCategories = serverChannels.filter(c => {return c.type === `category`})
		let serverCategoriesNearFull = 0;
		let serverCategoriesNearFullName = [];
		let serverCategoriesNearFullSize = [];

		// Discord Maximum Limitations
		const limitRoles = 250;
		const limitMembers = 250000;
		const limitChannels = 500;
		const limitCategorySize = 50
		let limitEmoji;
		let limitEmojiAnimated;
		switch (serverBoostStatus){
			case 0:
				limitEmoji = 50
				limitEmojiAnimated = 50
				break;
			case 1:
				limitEmoji = 100
				limitEmojiAnimated = 100
				break;
			case 2:
				limitEmoji = 150
				limitEmojiAnimated = 150
				break;
			case 3:
				limitEmoji = 250
				limitEmojiAnimated = 250
				break;
		}

		// Check Channel Categories To See How Many Are Approaching Maximum Limitations
		serverCategories.forEach(c => {
			if (c.children.size >= 40){
				serverCategoriesNearFullName.push(c.name)
				serverCategoriesNearFullSize.push(`${c.children.size} / ${limitCategorySize}`)
				serverCategoriesNearFull++
			}
		})

		// Create And Send Embed Message To Channel
		const embed = new Discord.MessageEmbed()
			.setTitle(`Discord Limits (Level ${serverBoostStatus} Boost Status)`)
			.setDescription(`Discord has limitations on the total amount of member, roles, channels, etc. that you can have in a discord server. Some limits are fixed for all servers, while some are based on the Server Boost Level. Below is a summary showing how close this server is to reaching those limits.`)
			.setColor(process.env.DISCORD_BLURPLE)
			.setFooter(client.user.username, client.user.displayAvatarURL())
			.setTimestamp()
			.setThumbnail(`https://blog.logomyway.com/wp-content/uploads/2020/12/discord-mascot.png`)
			.addField(`Server Members`, `${serverMembers} / ${limitMembers}`, false)
			.addField(`Server Roles`, `${serverRoles} / ${limitRoles}`, false)
			.addField(`Server Emojis`, `${serverEmoji} / ${limitEmoji}`, false)
			.addField(`Server Animated Emojis`, `${serverEmojiAnimated} / ${limitEmojiAnimated}`, false)
			.addField(`Server Channels`, `${serverChannels.size} / ${limitChannels}`, false)
			.addField(`Categories Near Full`, `${serverCategoriesNearFull}`, false)
			if(serverCategoriesNearFull > 0){
				embed.addField(`Category Name`, serverCategoriesNearFullName, true)
				embed.addField(`Number of Channels`, serverCategoriesNearFullSize, true)
			}
		msgObject.channel.send(embed)
	},
};