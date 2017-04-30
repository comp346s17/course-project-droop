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
      },
      saveDrawing: function(drawingId, imageUrl) {
        return drawingsApi.save({drawingId: drawingId, text: imageUrl});
      }
    };

  })

// services.service('SaveImageService', function($resource) {
//     var saveImageApi = $resource('/api/saveImage/:dataUrl', {});
//
//     return {
//         saveImage: function(dataUrl) {
//             saveImageApi.save(dataUrl);
//         }
//     }
// })

}());
