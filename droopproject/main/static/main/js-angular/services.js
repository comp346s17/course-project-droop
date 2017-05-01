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
    saveDrawing: function(drawingId, collectionId, imageUrl) {
      return drawingsApi.save({drawingId: drawingId, collectionId: collectionId, text: imageUrl});
    }
  };

})


.service('CollectionsService', function($resource) {

  var collectionsApi = $resource('/api/collections/:id', {});

  return {
    getCollection: function(collectionId) {
      return collectionsApi.get({id: collectionId});
    }
  };

});


}());
