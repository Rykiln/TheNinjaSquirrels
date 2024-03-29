const Discord = require("discord.js");
module.exports = {
	name: 'archive',													// Name of this command. Required for all commands.
	description: 'ADMIN: Moves inactive channels to archive.',			// [Optional] Description of this command for the help command
	// aliases: ['alternate_names', ``], 								// [Optional] Permits additional command names to be used for this command 
	// usage: '<required_args> [optional_args]',						// [Optional] Displays how to use this command in the help command.
    permissions: `MANAGE_ROLES`,										// [Optional] Checks for default discord.js permissions. See https://discord.js.org/#/docs/main/stable/class/Permissions?scrollTo=s-FLAGS
    args: false, 														// [Optional] When True - Requires Arguments Be Provided In Message Object
	guildOnly: true, 													// [Optional] When True - Prevents Command from being used in a Direct Message With The Bot Account
	cooldown: 5, 														// [Optional] See https://discordjs.guide/command-handling/adding-features.html#cooldowns
	execute(msgObject, args, client) {
		msgObject.channel.setParent(`840030769644699669`).then(async m=> {
			await m.lockPermissions();
			msgObject.reply(`This channel has been archived`);
		})
	},
};