/**
 * http://www.myideaway.com
 * Created by Tommy Chen on 1/26/16.
 */
angular.module('app.services')
  .factory('Person', function ($q, HttpService) {
    var Person = [
      {name: '老王', price: '6000', state: '领先'},
      {name: '老开', price: '6000', state: '出局'}
    ];

    return {
      all: function () {
        return Person;
      }
    }
  });
