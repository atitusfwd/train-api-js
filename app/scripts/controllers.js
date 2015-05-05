'use strict';

var controllers = angular.module('apiClientExampleApp.controllers', [
       'apiClientExampleApp.services'
]);

controllers.controller('Main', ['$scope', '$location','$q', 'ApiService',
function ($scope,$location,$q,apiService) {

   /* User has specified create session credentials
          1. call the REST api to authenticate
          2. if success, update the session id
          3. if error, reset all but peo and user
   */
   $scope.createSession = function() {
       $scope.ApiSession.error = '';
       apiService.getSession($scope.ApiSession)
         .success( function(data, status) {
             // check and see if an error occurred
             if (data.errorMessage.length > 0)  {
               $scope.ApiSession.error = data.errorMessage;
             } else {
               $scope.ApiSession.sessionId = data.sessionId;
               $scope.ApiSession.auth='session';
             }
         })
         .error( function(data,status) {
             $scope.ApiSession.sessionId = '';
             $scope.ApiSession.password = '';
             $scope.ApiSession.clientId = '';
             $scope.ApiSession.auth = '';
         });
   };


}]);
