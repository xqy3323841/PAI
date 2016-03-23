/**
 * Created by Administrator on 2016/3/7.
 */
angular.module('app.controllers')
  .controller('setAddressCtrl', function ($scope, games, $state,HttpService,$stateParams,$ionicHistory,MessageBox) {
    $scope.vm = {};
    $scope.vm.address = $stateParams.data.address;
    $scope.save = function () {
      var address = $scope.vm.address;
      MessageBox.showLoading("正在修改...");
      HttpService.put(GlobalConfig.serverUrl+"api/Member/ChangeAddress/"+address,{}, function (response) {
        MessageBox.hide();
        if(response.data.Code == 0){
          $state.go("set");
        }else{
          MessageBox.showToast(response.data.Data);
        }
      }, function (error) {
        MessageBox.hide();
        console.log(error);
      });
    }
    $scope.back = function () {
      $ionicHistory.goBack();
    }
  });
