'use strict';

var controllers = angular.module('apiClientExampleApp.controllers', [
       'apiClientExampleApp.services'
]);

controllers.controller('Main', ['$scope', '$location','$q', 'ApiService',
function ($scope,$location,$q,apiService) {


  /* in case the user changes their mind and does not wish to edit,
   * this will return to the list instead
   */
  $scope.cancelToList = function() {
    $location.path('/list');
  }



  /* User has submitted changes to the address data
   *    1. create a new UpdateAddress object
   *    2. set the session, client, employee id as needed by
   *       the API call, and also set the three address objects
   *    3. call the updateAddress API. If successful, take the
   *       user back to the list of employees
   */
  $scope.updateAddressInfo = function() {
    $scope.ApiSession.error = '';
    // construct a new object to perform the update
    var updateAddress = {
      sessionId: $scope.ApiSession.sessionId,
      clientId: $scope.ApiSession.clientId,
      employeeId: $scope.EmployeeData.detail[0].id,
      checksum: $scope.EmployeeData.addressInfo.checksum,
      homeAddress: $scope.EmployeeData.addressInfo.homeAddress,
      w2Address: $scope.EmployeeData.addressInfo.w2Address,
      altAddress: $scope.EmployeeData.addressInfo.altAddress
    };
    apiService.updateAddress($scope.ApiSession,updateAddress)
     .then(function(resultObject) {
       if (resultObject.errorMessage.length > 0)  {
         $scope.ApiSession.error = resultObject.errorMessage;
       } else {
         $location.path('/list')
       }
     });
  };



  /* User pushed the edit address button for an employee
   *    1. get the address info object which contains
   *       home, work, alternate address objects
   *    2. set the location so that the edit view will
   *       be used in the router
   */
  $scope.editEmployee = function(empId) {
    $scope.ApiSession.error = '';
    apiService.getAddressInfo($scope.ApiSession,empId)
      .then(function(resultObject) {
        if (resultObject.errorMessage.length > 0)  {
          $scope.ApiSession.error = resultObject.errorMessage;
        } else {
          $scope.EmployeeData.addressInfo = resultObject.addressInfo;
          $location.path('/edit');
        }
      });
  };



  /* User picked an employee id from a list
   *    1. get the employee detail information
   *       to be rendered in table.
   */
  $scope.selectEmployees = function() {
    $scope.ApiSession.error = '';
    apiService.getEmployeeDetail($scope.ApiSession,$scope.EmployeeData)
      .then(function(resultObject) {
        if (resultObject.errorMessage.length > 0)  {
          $scope.ApiSession.error = resultObject.errorMessage;
        } else {
          $scope.EmployeeData.detail = resultObject.employee;
        }
      });
  };


  /* User has specified a client id.
         1. set the auth level in the ApiSession scope object
         2. set the location to list employees
  */
  $scope.setClientId = function() {
    $scope.ApiSession.error = '';
    apiService.getAllEmployees($scope.ApiSession)
      .then(function(resultObject) {
        if (resultObject.errorMessage.length > 0)  {
          $scope.ApiSession.error = resultObject.errorMessage;
        } else {
          $scope.EmployeeData = { employeeIdList : resultObject.employeeList.employeeId };
          $scope.ApiSession.auth='client';
          $location.path('/list');
        }
      });
  };



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
