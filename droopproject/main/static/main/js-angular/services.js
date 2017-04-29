(function() {

var services = angular.module('droopApp.services', [])

.service('DrawingsService', function($resource) {

    var drawingsApi = $resource('/api/drawings/:id', {});

    return {
      getDrawings: function() {
        return drawingsApi.query();
      },
      getDrawing: function(drawingId) {
        return drawingsApi.get({id: drawingId});
      }
    };

  });

services.service('SaveImageService', function($resource) {
    var saveImageApi = $resource('/api/saveImage/:dataUrl', {});

    return {
        saveImage: function(dataUrl) {
            saveImageApi.save(dataUrl);
        }
    }
})

services.service('PromptService', function() {
    var prompts = [];
    prompts.push("Draw a Beach");
    prompts.push("Draw a downtown cityscape");
    prompts.push("Draw an elephant");
    prompts.push("Draw the moon");
    prompts.push("Draw the technological singularity");
    prompts.push("Draw Beric Dondarrion: The Lightning Lord");
    prompts.push("Draw Kyle Rosenberg, the handsome devil");

    function randomIntFromInterval(min,max){
        return Math.floor(Math.random()*(max-min+1)+min);
    }

    var promptToServe = prompts[randomIntFromInterval(0,prompts.length-1)];

    return {
        getPrompt: function() {
            return promptToServe;
        }
    };
});

}());
