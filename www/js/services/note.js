/**
 * http://www.myideaway.com
 * Created by Tommy Chen on 1/26/16.
 */
angular.module('app.services')
  .factory('note', function ($q, HttpService) {
    var note = [
      {id: '0', p: '三关总鸽王149名  保证金级  拍卖', img: 'img/test.jpg', price: '6000', state: '交易中'},
      {id: '1', p: '三关总鸽王149名  保证金级  拍卖', img: 'img/test.jpg', price: '6000', state: '交易完成'},
      {id: '2', p: '三关总鸽王149名  保证金级  拍卖', img: 'img/test.jpg', price: '6000', state: '交易完成'},
      {id: '3', p: '三关总鸽王149名  保证金级  拍卖', img: 'img/test.jpg', price: '6000', state: '交易关闭'}
    ];

    return {
      all: function () {
        return note;
      }
    }
  });
