(function() {

  angular.module('droopApp.controllers', [])

  .component('home', {
    templateUrl: 'static/main/templates/home.template.html',
    controller: function($scope, DrawingsService) {
      $scope.featuredDrawings = DrawingsService.getDrawings();
    }
  })

  .component('drawingCanvas', {
    templateUrl: 'static/main/templates/canvas.template.html',
    controller: function($scope, DrawingsService, $http) {

        $http({
          method: 'GET',
          url: '/api/getCanvasDrawing/'
        }).then(function successCallback(response) {
          var drawing = response.data;
          $scope.drawing = drawing;
          console.log($scope.drawing);

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
          console.log("Saving drawing");
          var canvas = document.getElementById('canvas');
          var dataUrl = canvas.toDataURL();
          DrawingsService.saveDrawing($scope.drawing.id, dataUrl);
        };

    }
  })

  .component('drawingDetail', {
    templateUrl: 'static/main/templates/drawing-detail.template.html',
    controller: function($scope, DrawingsService, $routeParams) {

      $scope.drawing = DrawingsService.getDrawing($routeParams.id);

      $scope.toggleDrawingLike = function(drawing) {
        drawing.liked = !drawing.liked;
        if (drawing.liked) {
          drawing.likes += 1;
        } else {
          drawing.likes -= 1;
        }
      };


    }
  })

  .component('drawingGallery', {
    templateUrl: 'static/main/templates/gallery.template.html',
    controller: function($scope, DrawingsService) {
      $scope.drawings = DrawingsService.getDrawings();

      $scope.toggleDrawingLike = function(drawing) {
        drawing.liked = !drawing.liked;
        if (drawing.liked) {
          drawing.likes += 1;
        } else {
          drawing.likes -= 1;
        }
      };

    }
  })

  .component('droopNavbar', {
    templateUrl: 'static/main/templates/navbar.template.html',
    controller: function($scope) {


    }
  });

}());
