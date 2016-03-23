/**
 * http://www.myideaway.com
 * Created by Tommy Chen on 1/26/16.
 */
angular.module('app.services')
  .factory('attention', function ($q, HttpService) {
    var attention = [
      {id:'0',p:'三关总鸽王149名  保证金级  拍卖',img:'img/test.jpg',price:'6000',attention:'移除关注'},
      {id:'1',p:'三关总鸽王149名  保证金级  拍卖',img:'img/test.jpg',price:'6000',attention:'移除关注'},
      {id:'2',p:'三关总鸽王149名  保证金级  拍卖',img:'img/test.jpg',price:'6000',attention:'移除关注'},
      {id:'3',p:'三关总鸽王149名  保证金级  拍卖',img:'img/test.jpg',price:'6000',attention:'移除关注'}
    ];

    return {
      all: function() {
        return attention;
      }
    }
  });
