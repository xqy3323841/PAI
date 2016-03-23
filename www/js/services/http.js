/**
 * http://www.myideaway.com
 * Created by Tommy Chen on 11/26/15.
 */
angular.module('app.services')
  .factory('HttpService', function ($http, $ionicLoading) {
    return {
      post: function (url, params, successHandler, faultHandler) {
        HttpUtils.post($http, url, params,successHandler,faultHandler);
      },
      get: function (url, params, successHandler, faultHandler) {
        HttpUtils.get($http, url, params,successHandler,faultHandler);
      },
      put:function (url, params, successHandler, faultHandler) {
        HttpUtils.put($http, url, params,successHandler,faultHandler);
      },
      delete:function (url, params, successHandler, faultHandler) {
        HttpUtils.delete($http, url, params,successHandler,faultHandler);
      }
    }
  });
