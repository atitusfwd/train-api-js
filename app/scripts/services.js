'use strict';

var services = angular.module('apiClientExampleApp.services',[]);

services.factory('ApiService', ['$http', '$q', function($http,$q) {
  var newobj = {};

  /* A factory which returns a function that will perform the POST call to the
   * API, and return a session id. Note that this is an asynchronous function,
   * and so in the controller we will need to resolve (wait) for its output
   */
  newobj.getSession = function(apiSessionObj) {
    console.log("createsession has been called for peoId="+apiSessionObj.peoId);
    var myData = {
      username: apiSessionObj.username,
      password: apiSessionObj.password,
      peoId: apiSessionObj.peoId
    };
    return apiPostEncoded(apiSessionObj.apiUrlBase+'/services/rest/login/createPeoSession',myData);
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
