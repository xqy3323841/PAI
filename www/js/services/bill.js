/**
 * http://www.myideaway.com
 * Created by Tommy Chen on 1/26/16.
 */
angular.module('app.services')
  .factory('bill', function ($q, HttpService) {
    var bill = [
      {name: '购买鸽子', or: '-', num: '600.00'},
      {name: '充值', or: '+', num: '600.00'},
      {name: '拍鸽子', or: '-', num: '600.00'}
    ];

    return {
      all: function () {
        return bill;
      }
    }
  });
