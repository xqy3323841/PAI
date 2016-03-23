/**
 * Created by Administrator on 2016/3/5.
 */
angular.module('app.controllers')
  .controller('GoBuyCtrl', function ($scope, games, $state, $ionicHistory, HttpService, $stateParams, MessageBox, $rootScope) {
    $scope.vm = {};
    var contents;
    if ($stateParams.data.contents) {
      contents = $stateParams.data.contents;
      localStorage.setItem("detailData", JSON.stringify(contents));
    } else {
      contents = JSON.parse(localStorage.getItem("detailData"));
    }
    $scope.vm.item = contents;
    HttpService.get(GlobalConfig.serverUrl + "api/Product/Data/" + $scope.vm.item.Id, {}, function (response) {
      $scope.vm.Data = response.data.Data;
    }, function (error) {
      console.log(error);
    });

    $scope.pic = function () {
      $state.go('picture', {
        data: {
          pictures: $scope.vm.item.Pictures
        }
      });
    }
    $scope.buy = function () {
      var token = localStorage.getItem("Access_Token");
      if (token) {
        MessageBox.confirm('确认购买?').then(function (result) {
          if (result) {
            MessageBox.showLoading("正在购买...");
            HttpService.put(GlobalConfig.serverUrl + "api/Product/Buy/" + contents.Id, {}, function (response) {
              MessageBox.hide();
              console.log(response);
              if (response.data.Data == true) {
                MessageBox.showToast("购买成功...");
                $rootScope.$broadcast('addBuy');
                setTimeout(function () {
                  $ionicHistory.goBack();
                }, 1000);
              } else{
                MessageBox.showToast(response.data.Data);
              }
            }, function (error) {
              MessageBox.hide();
              console.log(error);
            });
          }
        });
      } else {
        $state.go("login");
      }

    }
  });
