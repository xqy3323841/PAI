angular.module('app.controllers')
  .controller('loginCtrl', function ($scope, $state, $http, $ionicLoading, $ionicHistory, Userinfo, HttpService, MessageBox,$rootScope) {
    /*  $scope.regData = {};
     var validCode = true;*/
    $scope.vm = {};

    $scope.login_check = function () {
      var username = $scope.vm.username;
      var password = $scope.vm.password;
      var md5Password = CryptoJS.MD5(password).toString();
      if (angular.isUndefined(username)) {
        MessageBox.showToast('请输入用户名');
        return;
      }
      if (angular.isUndefined(password)) {
        MessageBox.showToast('请输入密码');
        return;
      }
      MessageBox.showLoading("正在登陆...");
      HttpService.get(GlobalConfig.serverUrl + "api/Member/Login/1/" + username + "/" + md5Password, {}, function (response) {
        console.log(response);
        MessageBox.hide();
        if (response.data.Code == 0) {
          localStorage.setItem("Access_Token", response.data.Data.Access_Token);
          localStorage.setItem("MemberID", response.data.Data.MemberID);

          // 设置jpush别名
          if(window.plugins && window.plugins.jPushPlugin){
            window.plugins.jPushPlugin.setAlias(response.data.Data.MemberID);
          }

          $ionicHistory.currentView($ionicHistory.backView());
          $rootScope.$broadcast("login");
          $state.go('person');
        } else {
          MessageBox.showToast("用户名或密码错误");
        }
      }, function (error) {
        MessageBox.hide();
        console.log(error);
      });
    }
    $scope.register = function () {
      $state.go('register')
    }
    $scope.password = function () {
      $state.go('password')
    };


    /*   $ionicLoading.show({
     template: '注册中...'
     });*/

    /* var sendData = {
     Type: 1,
     Title: $scope.regData.phone,
     Code: $scope.regData.reCode,
     Secret: hex_md5($scope.regData.pwd),
     Nick:$scope.regData.nick
     };*/


  });
