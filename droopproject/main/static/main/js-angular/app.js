var droopApp = angular.module('droopApp', ['droopApp.controllers', 'droopApp.services', 'ngRoute', 'ngResource']);

droopApp.config(function($routeProvider, $httpProvider, $resourceProvider, $sceDelegateProvider) {
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

    $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    // Allow loading from our assets domain.
    'https://droop-static-media.s3.amazonaws.com/**'
  ]);
});
