var droopApp = angular.module('droopApp', ['ngRoute', 'ngResource']);

droopApp.config(function($routeProvider, $httpProvider, $resourceProvider) {
  $routeProvider.
    when('/', {
      template: '<home></home>'
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
