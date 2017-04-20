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
    controller: function($scope, PromptService) {
        var prompt = PromptService.getPrompt();

        $scope.featuredPrompt = prompt;
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
