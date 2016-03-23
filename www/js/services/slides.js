/**
 * http://www.myideaway.com
 * Created by Tommy Chen on 1/26/16.
 */
angular.module('app.services')
  .factory('slides', function ($q, HttpService) {
    var slides = [
      {id: '0'},
      {id: '1'}
    ];

    return {
      all: function () {
        return slides;
      }
    }
  });
