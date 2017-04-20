(function() {

  angular.module('droopApp.controllers', [])

  .component('home', {
    templateUrl: 'static/main/templates/home.template.html',
    controller: function($scope, DrawingsService) {
      var allDrawings = DrawingsService.getDrawings();

      $scope.featuredDrawings = allDrawings.filter(function(elem, index) {
        return index < 6;
      });

    }
  })

  .component('drawingCanvas', {
    templateUrl: 'static/main/templates/canvas.template.html',
    controller: function($scope) {
    }
  })

  .component('drawingDetail', {
    templateUrl: 'static/main/templates/drawing-detail.template.html',
    controller: function($scope) {

    }
  })

  .component('drawingGallery', {
    templateUrl: 'static/main/templates/gallery.template.html',
    controller: function($scope, DrawingsService) {

      $scope.drawings = DrawingsService.getDrawings();

      $scope.likeDrawing = function(drawing) {
        drawing.liked = true;
        drawing.likes += 1;
      };

      $scope.unlikeDrawing = function(drawing) {
        drawing.liked = false;
        drawing.likes -= 1;
      };

    }
  })

  .component('droopNavbar', {
    templateUrl: 'static/main/templates/navbar.template.html',
    controller: function($scope) {
      }
  });

}());
