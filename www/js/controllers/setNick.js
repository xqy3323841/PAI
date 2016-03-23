/**
 * Created by Administrator on 2016/3/7.
 */
angular.module('app.controllers')
  .controller('setNickCtrl', function ($scope, games, $state,HttpService,$stateParams,$ionicHistory,$rootScope,MessageBox) {
    $scope.vm = {};
    $scope.vm.nick = $stateParams.data.nick;
    $scope.save = function () {
      var nick = $scope.vm.nick;
      MessageBox.showLoading("正在修改...");
      HttpService.put(GlobalConfig.serverUrl+"api/Member/nick/"+nick,{}, function (response) {
        MessageBox.hide();
        if(response.data.Code == 0){
          $rootScope.$broadcast("addSet");
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
