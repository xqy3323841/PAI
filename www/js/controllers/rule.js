/**
 * Created by Administrator on 2016/3/19.
 */
angular.module('app.controllers')
  .controller('ruleCtrl', function ($scope,$ionicHistory) {
    $scope.vm = {};
    $scope.back = function () {
      $ionicHistory.goBack();
    }
  });
