// Copyright © 2021 @Rykiln All Rights Reserved

// Environment Variables and API Calls
require(`dotenv`).config();
const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require(`fs`);
const BotStatusLive = false;
if (BotStatusLive) {
    // If True - Use The Ninja Squirrels Token and Guild ID
    Token = process.env.TNS_TOKEN
    GuildID = process.env.TNS_GUILDID
} else {
    // If False - Use AJ_TestBot Token and AJ_TestServer Guild ID
    Token = process.env.TEST_TOKEN
    GuildID = process.env.TEST_GUILDID
}
client.cooldowns = new Discord.Collection();

// Guild Specific Global Variables
const Prefix = process.env.PREFIX_DEFAULT;

// Client Command List From Commands Folder Recursively
client.commands = new Discord.Collection();
const commandFolders = fs.readdirSync(`./commands`);
for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith(`.js`));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
        // console.log(client.commands) // Write Full List of Known Commands To Console
    }
}

// Confirmation of Client Initialization
client.once(`ready`, () => {
    console.log(`${client.user.username} Bot Is Now Online!`);
    console.log(`This bot is a Tier ${client.guilds.resolve(GuildID).premiumTier} server with ${client.guilds.resolve(GuildID).premiumSubscriptionCount} boosts!`);
    client.user.setActivity(`${client.user.username} | .help`, { type: "PLAYING" });
});

// Client Guild Member Join
client.on(`guildMemberAdd`, member => {
    console.log(`++ [${member.user.username}] has joined [${member.guild.name}].`);
});

// Client Guild Member Leave
client.on(`guildMemberRemove`, member => {
    console.log(`-- [${member.user.username}] has left [${member.guild.name}].`);
});

// Client Message Handler
client.on(`message`, msgObject => {
    if (!msgObject.content.startsWith(Prefix) || msgObject.author.bot) return; // Ignore Messages That Don't Start With The Prefix And Messages That Come From Bots

    const args = msgObject.content.slice(Prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    // Check Command Names and Command Aliases. Ignore Commands That Don't Exist
    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    // Return Error if User does not have the correct permissions
    if (command.permissions) {
        const authorPerms = msgObject.channel.permissionsFor(msgObject.author);
        if (!authorPerms || !authorPerms.has(command.permissions)) {
            return msgObject.reply(`You do not have the permissions to use this command!`);
        }
    }

    // Return Error if GuildOnly command is Used in Direct Message
    if (command.guildOnly && msgObject.channel.type === `dm`) {
        return msgObject.reply(`I can\'t execute that command inside DMs!`);
    }

    // Return Error if no args are given for commands that require args
    if (command.args && !args.length) {
        return msgObject.channel.send(`You didn't provide any arguments!`);
    }

    // Return Error if command has a cooldown set and has been used too recently
    const { cooldowns } = client;

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(msgObject.author.id)) {
        const expirationTime = timestamps.get(msgObject.author.id) + cooldownAmount;

        if (now < expirationTime){
            const timeLeft = (expirationTime - now) / 1000;
            return msgObject.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
        }
    }

    // Execute Command. Give Error Message For Unknown Errors
    try {
        command.execute(msgObject, args, client);
    } catch (error) {
        console.error(error);
        msgObject.reply(`ERROR: An Unknown Error Has Occurred`);
    }
});

// Initialize Client
client.login(Token);