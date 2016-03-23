/**
 * http://www.myideaway.com
 * Created by Tommy Chen on 1/26/16.
 */
angular.module('app.services')
  .factory('sets', function ($q, HttpService) {
    var sets = [
      {span: '昵称', p: 'Mars'},
      {span: '地址', p: '陕西省西安市未央区201号天水大厦2层709室'},
      {span: '电话', p: '19289675678'}
    ];

    return {
      all: function () {
        return sets;
      }
    }
  });
