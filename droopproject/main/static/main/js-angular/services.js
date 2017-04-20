(function() {

angular.module('droopApp.services', [])

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

}());
