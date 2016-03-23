// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'ngCordova', 'app.controllers', 'app.services', 'app.directives', 'app.filters'])

  .run(function ($log, $ionicPlatform, $cordovaLocalNotification) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }

      // 锁定屏幕方向
      if (window.screen && window.screen.lockOrientation) {
        window.screen.lockOrientation('portrait');
      }

      // JPush
      if (window.plugins && window.plugins.jPushPlugin) {
        window.plugins.jPushPlugin.init();
      }

      // Umeng统计分析
      if (UMengAnalytics) {
        UMengAnalytics.initApp('56ef4f1667e58e9f2a000794', '56ef4f3c67e58e33670007a9');
        UMengAnalytics.resume();
      }
      
    });
  })

  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    $ionicConfigProvider.platform.ios.tabs.style('standard');
    $ionicConfigProvider.platform.ios.tabs.position('bottom');
    $ionicConfigProvider.platform.android.tabs.style('standard');
    $ionicConfigProvider.platform.android.tabs.position('bottom');

    $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
    $ionicConfigProvider.platform.android.navBar.alignTitle('center');

    $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
    $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

    $ionicConfigProvider.platform.ios.views.transition('ios');
    $ionicConfigProvider.platform.android.views.transition('android');
    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js

    $ionicConfigProvider.views.forwardCache(false);

    $stateProvider

    // Each tab has its own nav history stack:

      .state('SecKill', {
        url: '/SecKill',
        templateUrl: 'templates/SecKill/SecKill.html',
        controller: 'SecKillCtrl',
        params: {
          data: {},
          event: {}
        }
      }) //秒拍鸽子
      .state('secKill-detail', {
        url: '/secKill-detail',
        templateUrl: 'templates/SecKill/secKill-detail.html',
        controller: 'secKillDetailCtrl',
        params: {
          data: {},
          event: {}
        }
      })//秒拍详情
      .state('secKill-soon-detail', {
        url: '/secKill-soon-detail',
        templateUrl: 'templates/SecKill/secKill-soon-detail.html',
        controller: 'secKillSoonDetailCtrl',
        params: {
          data: {},
          event: {}
        }
      })//即将到来详情
      .state('rule', {
        url: '/rule',
        templateUrl: 'templates/SecKill/rule.html',
        controller: 'ruleCtrl'
      })//规则
      .state('picture', {
        url: '/picture',
        templateUrl: 'templates/SecKill/picture.html',
        controller: 'pictureCtrl',
        params: {
          data: {},
          event: {}
        }
      }) //赛鸽图集

      .state('buy', {
        url: '/buy',
        templateUrl: 'templates/Buy/buy.html',
        controller: 'BuyCtrl',
        params: {
          data: {},
          event: {}
        }
      }) //赛鸽购买
      .state('gobuy', {
        url: '/gobuy',
        templateUrl: 'templates/Buy/gobuy.html',
        controller: 'GoBuyCtrl',
        params: {
          data: {},
          event: {}
        }
      }) //立即购买

      .state('person', {
        url: '/person',
        templateUrl: 'templates/Person/person.html',
        controller: 'PersonCtrl'
      })//个人中心
      .state('set', {
        url: '/set',
        templateUrl: 'templates/Person/set.html',
        controller: 'setCtrl'
      }) //设置;
      .state('wallet', {
        url: '/wallet',
        templateUrl: 'templates/Person/wallet.html',
        controller: 'WalletCtrl',
        params: {
          data: {},
          event: {}
        }
      }) //我的钱包;
      .state('notes', {
        url: '/notes',
        templateUrl: 'templates/Person/notes.html',
        controller: 'NotesCtrl'
      }) //购买记录;
      .state('focus', {
        url: '/focus',
        templateUrl: 'templates/Person/focus.html',
        controller: 'FocusCtrl',
      }) //我的关注;
      .state('aboutUs', {
        url: '/aboutUs',
        templateUrl: 'templates/Person/aboutUs.html',
        controller: 'AboutUsCtrl'
      }) //关于我们;
      .state('login', {
        url: '/login',
        templateUrl: 'templates/Person/login.html',
        controller: 'loginCtrl'
      }) //登录;
      .state('register', {
        url: '/register',
        templateUrl: 'templates/Person/register.html',
        controller: 'registerCtrl'
      }) //注册;
      .state('password', {
        url: '/password',
        templateUrl: 'templates/Person/GetPassword.html',
        controller: 'passwordCtrl'
      }) //找回密码;
      .state('setAddress', {
        url: '/setAddress',
        templateUrl: 'templates/Person/setAddress.html',
        controller: 'setAddressCtrl',
        params: {
          data: {},
          event: {}
        }
      }) //设置地址;
      .state('setNick', {
        url: '/setNick',
        templateUrl: 'templates/Person/setNick.html',
        controller: 'setNickCtrl',
        params: {
          data: {},
          event: {}
        }
      }) //设置昵称;
      .state('setPhone', {
        url: '/setPhone',
        templateUrl: 'templates/Person/setPhone.html',
        controller: 'setPhoneCtrl',
        params: {
          data: {},
          event: {}
        }
      }) //设置电话;
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/SecKill');

  });
