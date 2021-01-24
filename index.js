const Discord = require('discord.js');
const bot = new Discord.Client();
//const TOKEN = process.env.BOT_TOKEN;
const TOKEN = "Nzk0NzEyMjkwMTU4NzA2Njg5.X--zfw.5N8gNPDDJXLsHERFa6U81takVHI"

var cmds = ['alien, !alien', 'awk', 'blob, !blob', 'blobtrain, !blobtrain', 'boogie, !boogie', '!broken', '!dev', 'kappa', '!leab']

bot.login(TOKEN);

bot.on('ready', () => {
	console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', message => { //commands in alphabetical order

	let messageLower = message.content.toLowerCase();

	if (messageLower === 'alien' || messageLower === '!alien') {
	  	
	    message.channel.send('<a:alienpls:801563358997512232>');

	}

	else if (messageLower === 'awk') {

		message.channel.send('<:awk:801684378353664061>');
	}

	else if (messageLower === 'blob' || messageLower === '!blob') {
	  	
	    message.channel.send('<a:blob:743847987150848080>');

	}

	else if (messageLower === 'blobtrain' || messageLower === '!blobtrain') {
		for (var i = 0; i < 10; i++) {
			message.channel.send('<a:blob:743847987150848080>');
		}
	}

	else if (messageLower === 'boogie' || messageLower === '!boogie') {
	  	
	    message.channel.send('<a:boogie:799348432962846720>');

	}

	else if (messageLower === '!broken') {
		message.channel.send('heart :heart: been broke :broken_heart: so many times :alarm_clock: i i don’t :woman_shrugging: know what to believe :thought_balloon: yeah :thumbsup: mama :woman: said it’s my fault :thumbsdown:');
	}

	else if (messageLower === '!cmds') {

		var cmdsList = '';
		var title = '__**List of commands for botbot2k19: **__';

		for (var i = 0; i < cmds.length; i++) {
			cmdsList += cmds[i] + '\n'
		}
		message.channel.send(title);
		message.channel.send('```'+ cmdsList + '```');
	}

	else if (messageLower === '!dev') {

		message.channel.send('the most awesoem person to ever live on this planet <:hypers:801579010668757042> <:Kappa:743846227619217523>');

	}

	else if (messageLower === '!drew') {
		message.channel.send('Sister Drew :heart:')
	}

	else if (messageLower === '!imaani') {
		message.channel.send("Dev's Everything <:devdev2Love:750418834288017448>");
	}

	else if (messageLower === 'kappa') {
		message.channel.send('<:kappa:743846227619217523>');
	}

	else if (messageLower === 'leab' || messageLower === '!leab') {
		message.channel.send('gtfo');
	}

	else if (messageLower === 'ppJedi' || messageLower === '!ppJedi') {
		message.channel.send('<a:ppJedi:802762707752189992>');
	}

	else if (messageLower === 'ppHop' || messageLower === '!ppHop') {
		message.channel.send('<a:ppHop:802763193972949022>');
	}

	else if (messageLower === '!queen') {
		message.channel.send('Brother Queen <:CarlSmile:775435711876300861>');
	}

});