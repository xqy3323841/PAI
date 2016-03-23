/**
 * Created by xqy on 2016/3/18.
 */
angular.module('app.controllers')
  .controller('secKillSoonDetailCtrl', function ($log, $scope, $ionicHistory, Person, $ionicPopup, $state, picture, $stateParams, HttpService, MessageBox) {
    $scope.vm = {};
    $scope.vm.type = 'remind';

    if ($stateParams.data.type) {
      $scope.vm.type = $stateParams.data.type;
    }

    var contents;
    if ($stateParams.data.contents) {
      contents = $stateParams.data.contents;
      localStorage.setItem("detailData", JSON.stringify(contents));
    } else {
      contents = JSON.parse(localStorage.getItem("detailData"));
    }

    $scope.vm.item = contents;
    $scope.vm.item.BeginTime = $scope.vm.item.BeginTime.replace("T", "   ");
    $scope.vm.item.EndTime = $scope.vm.item.EndTime.replace("T", "   ");
    $scope.vm.item.MinStepPrice = $scope.vm.item.MinStepPrice / 100;
    $scope.vm.item.MaxStepPrice = $scope.vm.item.MaxStepPrice / 100;
    HttpService.get(GlobalConfig.serverUrl + "api/Product/Data/" + $scope.vm.item.Id, {}, function (response) {
      $scope.vm.Data = response.data.Data;
    }, function (error) {
      console.log(error);
    });

    $scope.remind = function () {
      var token = localStorage.getItem("Access_Token");
      if (token) {
        MessageBox.showLoading("正在关注...")
        HttpService.put(GlobalConfig.serverUrl + "api/Product/Favorite/" + $scope.vm.item.Id, {}, function (response) {
          if (response.data.Data) {
            MessageBox.hide();
            MessageBox.showToast("关注成功");
          } else {
            MessageBox.hide();
            MessageBox.showToast("您已关注")
          }
        }, function (error) {
          MessageBox.hide();
          console.log(error);
        });
      } else {
        $state.go("login");
      }
    };

    $scope.removeRemind = function () {
      MessageBox.showLoading("正在处理...");
      HttpService.delete(GlobalConfig.serverUrl + "api/Product/Favorite/" + $scope.vm.item.Auction.Id, {}, function (response) {
        if (response.data.Code == 0) {
          MessageBox.hide();
          if ($stateParams.event.removeRemind) {
            $stateParams.event.removeRemind();
          }
        }else{
          MessageBox.showToast(response.data.Data);
        }

      }, function (error) {
        MessageBox.hide();
        console.log(error);
      });
    }

    $scope.pic = function () {
      $state.go('picture', {
        data: {
          pictures: $scope.vm.item.Pictures
        }
      });
    }
  })
