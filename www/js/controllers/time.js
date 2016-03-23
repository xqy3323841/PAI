/**
 * Created by a on 2016/2/20.
 */
angular.module('app.controllers')
  .controller('timeCtrl', function ($interval, $scope) {

    $scope.gettime = function () {
      var EndTime = new Date('2016/2/21 15:10');
      var NowTime = new Date();
      var t = EndTime.getTime() - NowTime.getTime();
      return t;
    }

    var runTiming = function () {
      timePromise = $interval(function () {
        var h = Math.floor($scope.gettime() / 1000 / 60 / 60 % 24);
        if (h < 10)
          $scope.h = "0" + h;
        else
          $scope.h = h;
        var m = Math.floor($scope.gettime() / 1000 / 60 % 60);
        if (m < 10)
          $scope.m = "0" + m;
        else
          $scope.m = m;
        var s = Math.floor($scope.gettime() / 1000 % 60);
        if (s < 10)
          $scope.s = "0" + s;
        else
          $scope.s = s;
        if (s < 0) {
          $scope.h = "00";
          $scope.m = "00";
        }
      }, 1000, 100);
    }
    runTiming();
  });
