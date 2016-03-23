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
