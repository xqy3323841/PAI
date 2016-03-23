/**
 * Created by Administrator on 2016/3/7.
 */
angular.module('app.controllers')
  .controller('setPhoneCtrl', function ($scope, games, $state,HttpService,$stateParams,$ionicHistory,MessageBox) {
    $scope.vm = {};
    $scope.vm.phone = $stateParams.data.TelPhone;
    $scope.save = function () {
      var phone = $scope.vm.phone;
      MessageBox.showLoading("正在修改...");
      HttpService.put(GlobalConfig.serverUrl+"api/Member/ChangeTelPhone/"+phone,{}, function (response) {
        MessageBox.hide();
        if(response.data.Code == 0){
          $state.go("set");
        }else{
          MessageBox.showToast("手机格式不正确...")
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
