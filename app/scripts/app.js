'use strict';

/**
 * @ngdoc overview
 * @name apiClientExampleApp
 * @description
 * # apiClientExampleApp
 *
 * Main module of the application.
 */
angular
  .module('apiClientExampleApp', [
    'ngRoute',
    'apiClientExampleApp.controllers',
    'apiClientExampleApp.services'
  ]);
