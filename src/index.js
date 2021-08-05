require("dotenv").config();

const Discord = require('discord.js');
const client = new Discord.Client();
const PREFIX = "!"

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong');
  };

  if (msg.content === 'Hello bot') {
    msg.reply(`Hello ${msg.author.username}! How are you today?`);
  };

  if(msg.content.startsWith(PREFIX)) {
    const [COMMAND_NAME, ...args] = msg.content
      .trim()
      .substring(PREFIX.length) //get message after prefix
      .split(/\s+/); //regex to remove whitespaces

    if(COMMAND_NAME === 'kick') {
      if(args.length === 0) {
        return msg.reply("Please provide an user ID");
      }

      const member = msg.guild.members.cache.get(args[0]);

      if(member) {
        member
          .kick()
          .then((member) => {
            msg.channel.send(`${member} was kicked`);
          })
          .catch((err) => msg.channel.send("I don't have permissions :("));
      }

      else {
        msg.channel.send("That member was not found");
      }
    }
  }
});

client.login(process.env.DISCORD_KEY);