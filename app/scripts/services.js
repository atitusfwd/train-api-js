'use strict';

var services = angular.module('apiClientExampleApp.services',[]);

services.factory('ApiService', ['$http', '$q', function($http,$q) {
  var newobj = {};


  // factory method to perform a POST update, where the message body is JSON
  newobj.updateAddress = function(apiSessionObj,updateAddress) {
    var deferred = $q.defer();
    apiPostJson(
      apiSessionObj.apiUrlBase+'/services/rest/employee/updateAddressInfo', updateAddress
      )
      .success(function(data){
        deferred.resolve(data);
      })
      .error(function(msg,code){
        deferred.reject("Unable to update employee address objects");
      });
    return deferred.promise;
  };



  // factory method to get the address info object, with checksum
  newobj.getAddressInfo = function(apiSessionObj, id) {
    var deferred = $q.defer();
    var _params = {
      sessionId: apiSessionObj.sessionId,
      clientId: apiSessionObj.clientId,
      employeeId: id
    };
    apiGet(
      apiSessionObj.apiUrlBase+'/services/rest/employee/getAddressInfo', _params
    ).success(function(data){
      deferred.resolve(data);
    }).error(function(msg,code){
      deferred.reject('Error occurred');
    });
    return deferred.promise;
  };


  // factory method to retrieve a detailed employee object
  newobj.getEmployeeDetail = function(apiSessionObj,employeeData) {
    var deferred = $q.defer();
    var _params = {
      sessionId: apiSessionObj.sessionId,
      clientId: apiSessionObj.clientId,
      employeeId: employeeData.selectedEmployees
    };
    apiGet(
      apiSessionObj.apiUrlBase+'/services/rest/employee/getEmployee', _params
    ).success(function(data){
      deferred.resolve(data);
    }).error(function(msg,code){
      deferred.reject('Error occurred');
    });
    return deferred.promise;

  };



    // factory method used to retrieve a list of the employee ids.
    newobj.getAllEmployees = function(apiSessionObj) {
      var deferred = $q.defer();
      var _params = {
        sessionId: apiSessionObj.sessionId,
        clientId: apiSessionObj.clientId
      };
      apiGet(
        apiSessionObj.apiUrlBase+'/services/rest/employee/getEmployeeList', _params
         )
         .success(function(data) {
           deferred.resolve(data);
         })
         .error(function(msg,code) {
           deferred.reject('Unable to retrieve employee list');
         });
         return deferred.promise;
    };


  /* A factory which returns a function that will perform the POST call to the
   * API, and return a session id. Note that this is an asynchronous function,
   * and so in the controller we will need to resolve (wait) for its output
   */
  newobj.getSession = function(apiSessionObj) {
    var myData = {
      username: apiSessionObj.username,
      password: apiSessionObj.password,
      peoId: apiSessionObj.peoId
    };
    return apiPostEncoded(apiSessionObj.apiUrlBase+'/services/rest/login/createPeoSession',myData);
  };


  /* Utility POST function to call the HRPyramid Services API which takes a JSON
     message body and returns a promise */
  var apiPostJson = function(url, dataObj) {
    var _config = {
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
      timeout: 10000
    };
    return $http.post(url,dataObj,_config);
  };


  /* Utility GET function to call the HRPyramid Services API and returns a promise */
  var apiGet = function(url, paramsObj) {
    var _config = {
      params: paramsObj,
      headers: {'Accept': 'application/json'},
      timeout: 10000
    };
    return $http.get(url,_config);
  };


  /* Utility POST function to call the HRPyramid Services API which handles parameters
   * that are form-urlencoded. This is asynchronous and returns a promise.
   */
  var apiPostEncoded = function(url, dataObj) {
    return $http.post(url, dataObj,
      {
        headers: {'Content-Type': 'application/x-www-form-urlencoded',
                  'Accept': 'application/json'},
        transformRequest: function(obj) {
          var str = [];
          for (var p in obj) {
              str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          }
          return str.join("&");
        },
        timeout: 10000
      }
    );
  };

  return  newobj;

}]);
