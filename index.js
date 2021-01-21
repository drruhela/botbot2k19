const Discord = require('discord.js');
const bot = new Discord.Client();
//const TOKEN = process.env.BOT_TOKEN;
const TOKEN = "Nzk0NzEyMjkwMTU4NzA2Njg5.X--zfw.5N8gNPDDJXLsHERFa6U81takVHI"

var cmds = ['alien, !alien', 'blob, !blob', 'boogie, !boogie', '!broken', '!dev', 'kappa', '!leab']

bot.login(TOKEN);

bot.on('ready', () => {
	console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => { //commands in alphabetical order

	if (msg.content === 'alien' || msg.content === '!alien') {
	  	
	    msg.channel.send('<a:alienpls:801563358997512232>');

	}

	else if (msg.content === 'blob' || msg.content === '!blob') {
	  	
	    msg.channel.send('<a:blob:743847987150848080>');

	} 

	else if (msg.content === 'boogie' || msg.content === '!boogie') {
	  	
	    msg.channel.send('<a:boogie:799348432962846720>');

	}

	else if (msg.content === '!broken') {
		msg.channel.send('heart :heart: been broke :broken_heart: so many times :alarm_clock: i i don’t :woman_shrugging: know what to believe :thought_balloon: yeah :thumbsup: mama :woman: said it’s my fault :thumbsdown:');
	}

	else if (msg.content === '!cmds') {

		var cmdsList = '';
		var title = '__**List of commands for botbot2k19: **__ \n';

		for (var i = 0; i < cmds.length; i++) {
			cmdsList += cmds[i] + '\n'
		}

		msg.channel.send(title + '``` '+ message + '```');
	}

	else if (msg.content === '!dev') {
		msg.channel.send(' the most awesoem person to ever live on this planet <:hypers:801579010668757042> <:Kappa:743846227619217523>')
	}

	else if (msg.content === 'kappa') {
		msg.channel.send('<:kappa:743846227619217523>')
	}

	else if (msg.content === 'leab' || msg.content === '!leab') {
		msg.channel.send('gtfo')
	}

});