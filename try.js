require('es6-promise').polyfill();
require('isomorphic-fetch');
var fs = require('fs');
var updatetime=require('./verion.json');
var intervalID = setInterval(function(){}, 5000);
var percentColors = [
    { pct: 0.0, color: { r: 0xff, g: 0x00, b: 0 } },
    { pct: 0.5, color: { r: 0xff, g: 0xff, b: 0 } },
    { pct: 1.0, color: { r: 0x00, g: 0xff, b: 0 } } ];

fetch("https://registroapps.uniandes.edu.co/oferta_cursos/api/get_courses.php?term=201820&ptrm=1&prefix=&campus=&attr=&attrs=", {
    method: "get",
      headers: {
          'Referer': 'https://registroapps.uniandes.edu.co/oferta_cursos/index.php/courses?prefix=ANTR&programName=ANTROPOLOGIA&term=201820&offer=SEGUNDO%20SEMESTRE%202018%20PERIODO%20DE%2016%20SEMANAS&ptrm=1'
      }
  })
  .then(function(response) {
      console.log(response)
      return response.json()
    }).then(function(json) {
        database=json;
        var d = new Date();
   
        updatetime.updated= d.toString();
        console.log('parsed json', json)

      fs.writeFile('cursos.json',JSON.stringify(json), function (err) {
          if (err) throw err;
          console.log('Saved! update at: '+  updatetime.updated);
        });
      

    }).catch(function(ex) {
      console.log('parsing failed', ex)
    })


    
    var getColorForPercentage = function(pct) {
        for (var i = 1; i <= percentColors.length - 1; i++) {
            if (pct <= percentColors[i].pct) {
                break;
            }
        }
        var lower = percentColors[i - 1];
        var upper = percentColors[i];
        var range = upper.pct - lower.pct;
        var rangePct = (pct - lower.pct) / range;
        var pctLower = 1 - rangePct;
        var pctUpper = rangePct;
        var color = {
            r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
            g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
            b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
        };
        return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
        // or output as hex if preferred
    }  

    


