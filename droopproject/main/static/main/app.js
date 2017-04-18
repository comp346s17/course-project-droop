var droopApp = angular.module('droopApp', ['ngRoute', 'ngResource']);

droopApp.config(function($routeProvider, $httpProvider, $resourceProvider) {
  $routeProvider.
    when('/', {
      template: '<home></home>'
    }).
    when('/canvas', {
      template: '<drawing-canvas></drawing-canvas>'
    }).
    when('/gallery', {
      template: '<drawing-gallery></drawing-gallery>'
    }).
    when('/gallery/:id', {
      template: '<drawing-detail></drawing-detail>'
    }).
    otherwise('/');

    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    $resourceProvider.defaults.stripTrailingSlashes = false;
});

droopApp.component('home', {
  templateUrl: 'static/main/home.template.html',
  controller: function($scope) {
    }
});

droopApp.component('drawingCanvas', {
  templateUrl: 'static/main/canvas.template.html',
  controller: function($scope) {
    }
});

droopApp.component('drawingDetail', {
  templateUrl: 'static/main/drawing-detail.template.html',
  controller: function($scope) {
    }
});

droopApp.component('drawingGallery', {
  templateUrl: 'static/main/gallery.template.html',
  controller: function($scope) {
    }
});

droopApp.component('droopNavbar', {
  templateUrl: 'static/main/navbar.template.html',
  controller: function($scope) {
    }
});
