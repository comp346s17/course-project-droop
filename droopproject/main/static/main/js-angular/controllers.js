(function() {

  angular.module('droopApp.controllers', [])

  .component('home', {
    templateUrl: 'static/main/templates/home.template.html',
    controller: function($scope, DrawingsService) {
      DrawingsService.getDrawings().$promise
        .then(function(response) {
          var allDrawings = response;
          $scope.featuredDrawings = allDrawings.filter(function(elem, index) {
            return index < 6;
          });

        });
      }
  })

  .component('drawingCanvas', {
    templateUrl: 'static/main/templates/canvas.template.html',
    controller: function($scope, DrawingsService, $http, $location) {

        $http({
          method: 'GET',
          url: '/api/getCanvasDrawing/'
        }).then(function successCallback(response) {
          var drawing = response.data;
          $scope.drawing = drawing;

          $http({
            method: 'GET',
            url: '/api/prompts/' + drawing.collectionId + '/' + drawing.updates
          }).then(function successCallback(response) {

           var prompt = response.data;
           $scope.featuredPrompt = "Add " + prompt.text;
          }, function errorCallback(response) {
            console.log("Error");
          });
        }, function errorCallback(response) {
          console.log("Error");
        });

        $scope.saveImage = function() {

          var img = $("#img")[0];

          var canvas = document.getElementById('canvas');
          var canvas2 = document.getElementById('canvas2');

          var context = $("#canvas").get(0).getContext("2d");
          var context2 = $("#canvas2").get(0).getContext("2d");

          context2.drawImage(canvas, 0, 0); // Draw copy of canvas to canvas 2
          context.clearRect(0,0, canvas.width, canvas.height); // Clear canvas
          context.drawImage(img, 0, 0); // Draw background to canvas
          context.drawImage(canvas2, 0, 0); // Draw original canvas back to canvas
          var dataUrl = canvas.toDataURL();
          DrawingsService.saveDrawing($scope.drawing.id, dataUrl);
          $location.path('/gallery');
        };

    }
  })

  .component('drawingDetail', {
    templateUrl: 'static/main/templates/drawing-detail.template.html',
    controller: function($scope, DrawingsService, CollectionsService, $routeParams, $http) {

      DrawingsService.getDrawing($routeParams.id).$promise
        .then(function(response) {
          $scope.drawing = response;
          CollectionsService.getCollection(response.collectionId).$promise
            .then(function(collectionResponse) {
              $scope.drawing.title = collectionResponse.title;

              console.log($scope.drawing.id);
              $http({
                method: 'GET',
                url: '/api/addView/' + $scope.drawing.id
              }).then(function successCallback(response) {
                $scope.drawing.views = response.data.views;
                }, function errorCallback(response) {
                  console.log("Error");
              });
        });
      });
    }
  })

  .component('drawingGallery', {
    templateUrl: 'static/main/templates/gallery.template.html',
    controller: function($scope, DrawingsService) {
      $scope.drawings = DrawingsService.getDrawings();
    }
  })

  .component('droopNavbar', {
    templateUrl: 'static/main/templates/navbar.template.html',
    controller: function($scope) {


    }
  })

  .filter('collectionIdToTitle', function($filter, CollectionsService) {
  /* Takes a userID and returns the name of the user with that userID.
  Adapted from https://glebbahmutov.com/blog/async-angular-filter/ */
  // We need to cache results to ensure that we don't get a digest cycle error as the call to get a user's name is asynchronous.
  var cached = {};
  function collectionIdToTitleFilter(collectionId) {
    if (collectionId) {
      if (collectionId in cached) {
        // avoid returning a promise!
        return typeof cached[collectionId] === 'string' ? cached[collectionId] : undefined;
      } else {
        CollectionsService.getCollection(collectionId).$promise
        .then(function(collectionResponse) {
          cached[collectionId] = collectionResponse.title;
        });
      }
    }
  }
  collectionIdToTitleFilter.$stateful = true;
  return collectionIdToTitleFilter;
});

}());
