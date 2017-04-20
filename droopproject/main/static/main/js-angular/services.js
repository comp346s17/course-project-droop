(function() {

var services = angular.module('droopApp.services', [])

.service('DrawingsService', function() {


    var drawings = [];

    var dateNow = new Date();

    for (var i = 0; i < 20; i++) {
      var drawing = {
        id: i,
        title: 'Emerald Dream',
        createdAt: dateNow,
        likes: 420,
        views: 5091,
        imageUrl: 'static/main/assets/example-drawing.png',
        artists: [
          'John Cena',
          'Kyle Rosenberg',
          'Brian Rosenberg',
          'Donkey Kong'
        ],
        collection: 'Nature',
        liked: false
      };
      drawings.push(drawing);
    }

    return {

      getDrawings: function() {
        return drawings;
      },
      getDrawing: function(id) {
        return drawings[id];
      }

    };

  });

services.service('PromptService', function() {
    var prompts = []
    prompts.push("Draw a Beach")
    prompts.push("Draw a downtown cityscape")
    prompts.push("Draw an elephant")
    prompts.push("Draw the moon")
    prompts.push("Draw the technological singularity")
    prompts.push("Draw Beric Dondarrion: The Lightning Lord")
    prompts.push("Draw Kyle Rosenberg, the handsome devil")

    function randomIntFromInterval(min,max){
        return Math.floor(Math.random()*(max-min+1)+min);
    }

    var promptToServe = prompts[randomIntFromInterval(0,prompts.length)]

    return {
        getPrompt: function() {
            return promptToServe
        }
    }
})

}());
