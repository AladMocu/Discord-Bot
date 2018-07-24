require('es6-promise').polyfill();
require('isomorphic-fetch');
var updatetime=require('./verion.json');
var auth = require('./auth.json');
const music = require('discord.js-music-v11');
const Discord = require('discord.js');
const client = new Discord.Client();
var fs = require('fs');


var comm='!';
var updatetime;


var intervalID = setInterval(function(){fetch("https://registroapps.uniandes.edu.co/oferta_cursos/api/get_courses.php?term=201820&ptrm=1&campus=&attr=&attrs=", {
    method: "get",
      headers: {
          'Referer': 'https://registroapps.uniandes.edu.co/oferta_cursos/index.php/courses?prefix=ADMI&programName=ADMINISTRACION&term=201820&offer=SEGUNDO%20SEMESTRE%202018%20PERIODO%20DE%2016%20SEMANA'
      }
  })
  .then(function(response) {
      return response.json()
    }).then(function(json) {
        database=json;
        var d = new Date();
   
        updatetime.updated= d.toString();
       // console.log('parsed json', json)

      fs.writeFile('cursos.json',JSON.stringify(json), function (err) {
          if (err) throw err;
          console.log('Saved! update at: '+  updatetime.updated);
        });
      

    }).catch(function(ex) {
      console.log('parsing failed', ex)
    })}, 5000);



client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async message => {
  if (message.content == comm+'ping') {
    message.reply('pong');
  }
  if (message.content == comm+'who') {
    // Send the user's avatar URL
    message.reply(message.author.avatarURL);
  }
  if(message.content == comm+'join')
  {
    if (message.member.voiceChannel) {
        const connection = await message.member.voiceChannel.join();
       
      } else {
        message.reply('You need to join a voice channel first!');
      }
  }
  if(message.content == 'commandHelp')
  {
    message.reply('The command set rigth now is "'+comm+'"');
  }
  if(message.content.startsWith(comm+'changeComm'))
  {
    var args = message.content.substring(1).split(' ');
    var cmd =args[0];

    if(args[1].length==1)
    {
    comm=args[1]
    console.log('Comm changed for :'+comm);
    }
    else{
      message.reply('Usage:   '+comm+'changeComm'+' [character]'
    );
    }
  }
  if(message.content.startsWith(comm+'cupos'))
  {
    var args = message.content.substring(1).split(' ');
    var cmd =args[0];
    if(!args.length==2)
    {
      message.reply("uso del commando: "+comm+"cupos [NRC]")
    }

    var searchField = "nrc";
    var searchVal = args[1];
    var cursos = require('./cursos.json')
    var cupos;
    var found=false;
    var nombre;
    var totales;

    for (var i=0 ; i < cursos.records.length ; i++)
    {
    if (cursos.records[i][searchField] == searchVal) {
  
        cupos=cursos.records[i]["empty"]
        nombre= cursos.records[i]["title"]
        totales= cursos.records[i]["limit"]
        seccion= cursos.records[i]["section"]
        code = cursos.records[i]["class"]+cursos.records[i]["course"]
        found=true;
    }
    }
    if(found){message.channel.send({embed: {
      color: 3447003,
      author: {
        name: client.user.username,
        icon_url: client.user.avatarURL
      },
      title: nombre,
      url: "",
      description: "Seccion "+seccion,
      fields: [
        {
          name: code,
          value: "La materia con nrc: "+args[1]+" tiene "+cupos+" cupos disponibles  de "+totales
        },
      ],
      timestamp: new Date(),
      footer: {
        icon_url: client.user.avatarURL,
        text: "© AladMocuBots updated : "+updatetime.updated
      }
      }
      });
    
      }
    }

    
    /*
    var request= 'https://donde-estan-mis-cupos-uniandes.herokuapp.com/?prefix='+args[1]+'&nrc='+args[2];
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    console.log('requesting data from :'+request);
  
      var xhr = new XMLHttpRequest();
      xhr.open('GET',request,true);
      xhr.send();
      xhr.onreadystatechange = processRequest;
    
        function processRequest(e) {
          if (xhr.readyState == 4 && xhr.status == 200) {
            console.log(xhr.responseText);
if(xhr.responseText.split(",").length==1)
{
  if(xhr.responseText=='"prefijo incorrecto"')
  {
    message.reply("se presento un error: ```"+xhr.responseText+"```");
  }
  else
  {
  message.reply('Usage:   '+comm+'cupos [sufix] + [nrc]');
  }
}
else{
        var cupos = (xhr.responseText).split(",")[2].split('"')[1];
}
   */


  
  if(message.content.startsWith(comm+'summoner'))
  {
    var args = message.content.substring(1).split(' ');
    var cmd =args[0];

    if(true)
    {
      
  //  https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/RiotSchmick?api_key=RGAPI-8461ff2d-113a-470d-86c1-3d9871cd84ac
  https://la1.api.riotgames.com/lol/summoner/v3/summoners/by-name/AladMocu?api_key=RGAPI-2197d7c1-987e-497c-b28d-cecc8a174cf6
  var request= 'https://la1.api.riotgames.com/lol/summoner/v3/summoners/by-name/'+args[1]+'?api_key=RGAPI-2197d7c1-987e-497c-b28d-cecc8a174cf6';
  console.log('requesting data from :'+request);

    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var xhr = new XMLHttpRequest();
    xhr.open('GET',request,true);
    hxr.setRequestHeader();
    xhr.send();
    xhr.onreadystatechange = processRequest;



    function processRequest(e) {
      if (xhr.readyState == 4 && xhr.status == 200) {
        console.log(xhr.responseText);
          var response = JSON.parse(xhr.responseText);
    message.channel.send({embed: {
      color: 3447003,
      author: {
        name: client.user.username,
        icon_url: client.user.avatarURL
      },
      title: args[1],
      url: "",
      description: "Consulta de Estado de invocador",
      fields: [
        {
          name: "Nivel",
          value: "El invocador "+args[1]+" tiene nivel "+response.summonerLevel
        },
      ],
      timestamp: new Date(),
      footer: {
        icon_url: client.user.avatarURL,
        text: "© AladMocuBots"
      }
    }
  });

      }
    }
    }
    else{
      message.reply('Usage:   '+comm+'summoner'+' [name]'
    );
    }
  }
});
music(client);

client.login(auth.token);