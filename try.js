require('es6-promise').polyfill();
require('isomorphic-fetch');
var fs = require('fs');
var updatetime=require('./verion.json');


var intervalID = setInterval(function(){fetch("https://registroapps.uniandes.edu.co/oferta_cursos/api/get_courses.php?prefix=ADMI&term=201820&ptrm=1&campus=&attr=&attrs=", {
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



    


