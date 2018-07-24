require('es6-promise').polyfill();
require('isomorphic-fetch');


//var intervalID = setInterval(function(){alert("Interval reached");}, 5000);


    fetch("registroapps.uniandes.edu.co/oferta_cursos/api/get_courses.php?prefix=ADMI&term=201820&ptrm=1&campus=&attr=&attrs=", {
      method: "get",
        headers: {
            'Referer': 'https://registroapps.uniandes.edu.co/oferta_cursos/index.php/courses?prefix=ADMI&programName=ADMINISTRACION&term=201820&offer=SEGUNDO%20SEMESTRE%202018%20PERIODO%20DE%2016%20SEMANA'
        }
    })
    .then((resp) => resp.json())
      .then(function(data) {
          let dataMessage= data.answers[0].answer
          console.log(dataMessage)
          newMessageBot(dataMessage)
      })
