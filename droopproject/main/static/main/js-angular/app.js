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
