(function() {

  STATIC_URL = 'https://droop-static-media.s3.amazonaws.com/static';

  angular.module('droopApp.controllers', []).config(function($httpProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
  })

  .component('home', {
    templateUrl: STATIC_URL + '/main/templates/home.template.html',
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
    templateUrl: STATIC_URL + '/main/templates/canvas.template.html',
    controller: function($scope, DrawingsService, $http, $location) {

        $http({
          method: 'GET',
          url: '/api/getCanvasDrawing/'
        }).then(function successCallback(response) {
          var drawing = response.data;
          $scope.drawing = drawing;
          
          $("#img")[0].setAttribute('crossOrigin', 'anonymous');
          $("#img")[0].src = drawing.imageUrl;

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
          context.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
          context.drawImage(img, 0, 0); // Draw background to canvas
          context.drawImage(canvas2, 0, 0); // Draw original canvas back to canvas
          var dataUrl = canvas.toDataURL();
          DrawingsService.saveDrawing($scope.drawing.id, $scope.drawing.collectionId, dataUrl);
          $location.path('/gallery');
        };

    }
  })

  .component('drawingDetail', {
    templateUrl: STATIC_URL + '/main/templates/drawing-detail.template.html',
    controller: function($scope, DrawingsService, CollectionsService, $routeParams, $http) {

      DrawingsService.getDrawing($routeParams.id).$promise
        .then(function(response) {
          $scope.drawing = response;
          $http({
            method: 'GET',
            url: '/api/addView/' + $scope.drawing.id
          }).then(function successCallback(response) { // Reupdate views since we just added a view
            $scope.drawing.views = response.data.views;
            }, function errorCallback(response) {
              console.log("Error");
          });
      });
    }
  })

  .component('drawingGallery', {
    templateUrl: STATIC_URL + '/main/templates/gallery.template.html',
    controller: function($scope, DrawingsService) {
      $scope.drawings = DrawingsService.getDrawings();

      $scope.searchKey = "";
      $scope.drawingSort = '-date';

    }
  })

  .component('droopNavbar', {
    templateUrl: STATIC_URL + '/main/templates/navbar.template.html',
    controller: function($scope) {


    }
  });

}());
