/**
 * Created by Administrator on 2016/3/4.
 */
angular.module('app.controllers')
  .controller('tabCtrl', function ($log, $scope, games, $state, $ionicHistory) {

    $scope.goPerson = function () {
      var Access_Token = localStorage.getItem("Access_Token");
      if (Access_Token) {
        $ionicHistory.currentView($ionicHistory.backView());
        $state.go("person");
      } else {
        $state.go("login");
      }
    };

    $scope.goBuy = function () {
      $ionicHistory.currentView($ionicHistory.backView());
      $state.go("buy");
    };

    $scope.goSecKill = function () {
      $ionicHistory.currentView($ionicHistory.backView());
      $state.go("SecKill");
    };

  });
