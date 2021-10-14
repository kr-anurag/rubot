const Discord = require('discord.js')
const keepAlive = require('./server')
const axios = require('axios').default;
const { MessageEmbed } = require('discord.js');

const client = new Discord.Client({
  allowedMentions: {
    parse: ['users', 'roles'],
    repliedUser: true,

  },
  intents: [
    "GUILDS",
    "GUILD_MESSAGES",
    "GUILD_PRESENCES",
    "GUILD_MEMBERS",
    "GUILD_MESSAGE_REACTIONS",
  ]
})

client.on('ready', () => {
  console.log("Tada, I'm ready")
})

client.on("messageCreate", async message => {
  if (message.content === '$help') {
  
  message.channel.send("commands: \n `$help`: *help me out!* \n `$ping`: *replies with pong!* \n `$gm`: *replies with gm!* \n `$hey`: *replies with hey, but in a funny way* \n `$wassup`: *pings user* \n `$user`: *replies with the user(s) name* \n `$pic`: *replies with the avatar of the user* \n `$cat`: *replies with a random cat picture* \n `$dog`: *replies with a random doggo pic* ")

  }

  else if (message.content === '$ping') {
    message.channel.send("pong!")
  }

  else if (message.content === '$gm') {
    message.channel.send('gm!')
  }

  else if (message.content === '$hey') {
    message.channel.send('hey sussy baka')
  }

  else if (message.content === '$wassup') {
    message.channel.send(`wassup, ${message.author.toString()}`)
  }

  else if (message.content === '$user') {
    message.channel.send(message.author.username)
  }

  else if (message.content === '$pic') {
    message.channel.send(message.author.avatarURL())
  }

  else if (message.content === '$cat') {
    message.channel.send('meow')
    axios.get('https://aws.random.cat/meow')
      .then(function(res) {
        message.channel.send(res.data.file)
      })
  }

  else if (message.content === '$dog') {
    axios.get('https://random.dog/woof.json')
      .then(function(res) {
        message.channel.send(res.data.url)
      })
  }

  else if(message.content === '$chuck-joke'){
    axios.get('https://geek-jokes.sameerkumar.website/api?format=json')
    .then(function(res){
      message.channel.send(res.data.joke)
    })
  }


  let prefix = '$'
  
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'movie') {
    if (!args.length) {
      return message.channel.send(`you didn't provided any arguements ${message.author}, the syntax is \`$movie <name>\` `);
    } else if (args[0] === 'foo') {
      return message.channel.send('bar');
    }

    else (
      axios.get(`http://www.omdbapi.com/?apikey=5c401357&t=${args.join("+")}`)
        .then(function(res) {
          
          const movieEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(res.data.Title)
            .setURL('https://discord.js.org/')
            .setAuthor('Anurag')
            .setDescription(res.data.Plot)
            .setThumbnail(res.data.Poster)
            .addFields(
              { name: 'Actors', value: `${res.data.Actors}` },
              { name: 'Awards', value: `${res.data.Awards}`},
              { name: 'BoxOffice', value: `${res.data.BoxOffice}` },
              { name: 'Rating', value: `ImDb: ${res.data.Ratings[0].Value} stars`, inline: true },
              { name: 'Released', value: `${res.data.Year}`, inline: true }
            )
            .setImage(res.data.Poster)
            .setTimestamp()
            .setFooter('okay, am i geeting paid or what');

          message.channel.send({ embeds: [movieEmbed] });
        })
        .catch(err => console.log(err))
    )
  }
})

keepAlive()
client.login(process.env['TOKEN'])