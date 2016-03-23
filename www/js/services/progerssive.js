/**
 * http://www.myideaway.com
 * Created by Tommy Chen on 1/26/16.
 */
angular.module('app.services')
  .factory('progerssive', function ($q, HttpService) {
    var progerssive = [
      {id: '0', state: '进行中'},
      {id: '1', state: '即将开始'},
    ];

    return {
      all: function () {
        return progerssive;
      }
    }
  });
