/**
 * http://www.myideaway.com
 * Created by Tommy Chen on 1/26/16.
 */
angular.module('app.services')
  .factory('picture', function ($q, HttpService) {
    var picture = [
      {num:'img/test.jpg'},
      {num:'img/test.jpg'},
      {num:'img/test.jpg'},
      {num:'img/test.jpg'},
      {num:'img/test.jpg'},
      {num:'img/test.jpg'},
      {num:'img/test.jpg'}
    ];

    return {
      all: function() {
        return picture;
      }
    }
  });
