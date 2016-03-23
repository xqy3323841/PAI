/**
 * http://www.myideaway.com
 * Created by Tommy Chen on 11/26/15.
 */
angular.module('app.services', []);

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

/**
 * http://www.myideaway.com
 * Created by Tommy Chen on 11/26/15.
 */
angular.module('app.services')
  .factory('HttpService', function ($http, $ionicLoading) {
    return {
      post: function (url, params, successHandler, faultHandler) {
        HttpUtils.post($http, url, params,successHandler,faultHandler);
      },
      get: function (url, params, successHandler, faultHandler) {
        HttpUtils.get($http, url, params,successHandler,faultHandler);
      },
      put:function (url, params, successHandler, faultHandler) {
        HttpUtils.put($http, url, params,successHandler,faultHandler);
      },
      delete:function (url, params, successHandler, faultHandler) {
        HttpUtils.delete($http, url, params,successHandler,faultHandler);
      }
    }
  });

/**
 * http://www.myideaway.com
 * Created by Tommy Chen on 1/25/16.
 */
angular.module('app.services')
  .factory('MessageBox', function ($http, $ionicLoading, $ionicPopup) {
    return {
      showToast: function (message) {
        $ionicLoading.show({
          template: message,
          duration: 1000
        });
      },

      showLoading: function (message) {
        if(message){
          $ionicLoading.show({
            template: message
          });
        } else{
          $ionicLoading.show();
        }

      },

      showDelayLoading: function (message) {

        if(message){
          $ionicLoading.show({
            template: message,
            delay: 2000
          });
        } else{
          $ionicLoading.show({
            delay: 2000
          });
        }
      },

      hide: function () {
        $ionicLoading.hide();
      },

      confirm: function (message) {
        return $ionicPopup.confirm({
          title: message,
          okText:"确定",
          cancelText:"取消"
        });
      },
      alert: function (message) {
        return $ionicPopup.alert({
          title: message,
          okText:"确定"
        });
      }
    }
  });

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

/**
 * Created by xqy on 2016/3/18.
 */
angular.module('app.services')
  .factory('Time', function () {
     return{
       getTime:function (year,month,day,hour,min){
         var timeDate =  Time.getTime(year,month,day,hour,min);
          return timeDate;
       }
     }



  });

/**
 * http://www.myideaway.com
 * Created by Tommy Chen on 1/26/16.
 */
angular.module('app.services')
  .factory('Userinfo', function ($q, HttpService) {
    var userinfo = {};
    var User = {};
    return {
      save: function (user) {
        window.localStorage.ui = JSON.stringify(user);
        userinfo = window.localStorage.ui;
        return userinfo;
      },
      saveUser: function (user) {
        window.localStorage.user = JSON.stringify(user);
        User = window.localStorage.user;
        return User;
      },
      remove: function () {
        window.localStorage.removeItem('ui');
      },
      removeUser: function () {
        window.localStorage.removeItem('user');
      },
      get: function () {
        if (window.localStorage.ui != null) {
          var user = JSON.parse(window.localStorage.ui)
          return user;
        }
        return null;
      },
      getUser: function () {
        if (window.localStorage.user != null) {
          var user = JSON.parse(window.localStorage.user)
          return user;
        }
        return null;
      }
    };
  });
