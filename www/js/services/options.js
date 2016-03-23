/**
 * http://www.myideaway.com
 * Created by Tommy Chen on 1/26/16.
 */
angular.module('app.services')
  .factory('options', function ($q, HttpService) {
    var options = [
      /*{name:'我的钱包',img:'img/adam.jpg'},*/
      {name: '购买记录', click: 'notes'},
      {name: '我的关注', click: 'focus'}
    ];

    return {
      all: function () {
        return options;
      }
    }
  });
