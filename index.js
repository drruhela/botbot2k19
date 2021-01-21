const Discord = require('discord.js');
const bot = new Discord.Client();
//const TOKEN = process.env.BOT_TOKEN;
const TOKEN = "Nzk0NzEyMjkwMTU4NzA2Njg5.X--zfw.5N8gNPDDJXLsHERFa6U81takVHI"

var cmds = ['alien, !alien', 'blob, !blob', 'boogie, !boogie', '!broken', '!dev', 'kappa', '!leab']

bot.login(TOKEN);

bot.on('ready', () => {
	console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', message => { //commands in alphabetical order

	let msg = message.content.toLowerCase();

	if (msg.includes('alien') || msg === '!alien') {
	  	
	    message.channel.send('<a:alienpls:801563358997512232>');

	}

	if (msg.includes('awk') || msg === '!awk') {
	  	
	    message.channel.send('<:awk:801684378353664061>');

	}

	else if (msg.includes('blob') || msg === '!blob') {
	  	
	    message.channel.send('<a:blob:743847987150848080>');

	} 

	else if (msg.includes('boogie') || msg === '!boogie') {
	  	
	    message.channel.send('<a:boogie:799348432962846720>');

	}

	else if (msg === '!broken') {
		message.channel.send('heart :heart: been broke :broken_heart: so many times :alarm_clock: i i don’t :woman_shrugging: know what to believe :thought_balloon: yeah :thumbsup: mama :woman: said it’s my fault :thumbsdown:');
	}

	else if (msg === '!cmds') {

		var cmdsList = '';
		var title = '__**List of commands for botbot2k19: **__';

		for (var i = 0; i < cmds.length; i++) {
			cmdsList += cmds[i] + '\n'
		}
		message.channel.send(title);
		message.channel.send('```'+ cmdsList + '```');
	}

	else if (msg === '!dev') {
		message.channel.send('the most awesoem person to ever live on this planet <:hypers:801579010668757042> <:Kappa:743846227619217523>')
	}

	else if (msg === '!drew') {
		message.channel.send('Sister Drew :heart:')
	}

	else if (msg.includes('kappa')) {
		message.channel.send('<:kappa:743846227619217523>')
	}

	else if (msg.includes('leab') || msg === '!leab') {
		message.channel.send('gtfo')
	}

});