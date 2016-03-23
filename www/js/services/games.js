/**
 * http://www.myideaway.com
 * Created by Tommy Chen on 1/26/16.
 */
angular.module('app.services')
  .factory('games', function ($q, HttpService) {
    var games = [
      {id: '0', p: '三关总鸽王149名  保证金级  拍卖', img: 'img/test.jpg', price: '6000'},
      {id: '1', p: '三关总鸽王149名  保证金级  拍卖', img: 'img/test.jpg', price: '6000'},
      {id: '2', p: '三关总鸽王149名  保证金级  拍卖', img: 'img/test.jpg', price: '6000'},
      {id: '3', p: '三关总鸽王149名  保证金级  拍卖', img: 'img/test.jpg', price: '6000'},
      {id: '4', p: '三关总鸽王149名  保证金级  拍卖', img: 'img/test.jpg', price: '6000'},
      {id: '5', p: '三关总鸽王149名  保证金级  拍卖', img: 'img/test.jpg', price: '6000'},
      {id: '6', p: '三关总鸽王149名  保证金级  拍卖', img: 'img/test.jpg', price: '6000'}
    ];

    return {
      all: function () {
        return games;
      }
    }
  });
