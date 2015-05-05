'use strict';

/**
 * @ngdoc overview
 * @name apiClientExampleApp
 * @description
 * # apiClientExampleApp
 *
 * Main module of the application.
 */
angular.module('apiClientExampleApp', [
    'ngRoute',
    'apiClientExampleApp.controllers',
    'apiClientExampleApp.services'
  ])
  .run(function($rootScope) {
    // initialize the ApiSession object and its variables
    $rootScope.ApiSession = { peoId: '', username: '', password: '', clientId: '', auth: '', sessionId: '', error: '' };

    // define the base URL for API operations
    $rootScope.ApiSession.apiUrlBase = 'https://sandbox.fwdco.com/api-dev';
  })
  .config(function($routeProvider) {
    $routeProvider
      .when('/edit', {
        templateUrl: '/views/edit.html'
      })
      .when('/list', {
        templateUrl: '/views/list.html'
      })
      .when('/', {
        templateUrl: '/views/auth.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .directive('apiErrorMessage',[ function() {
    return {
      templateUrl: 'apiErrorMessage.html',
      transclude: true
    };
}]);
