/**
 * Created by Administrator on 2016/3/4.
 */
angular.module('app.controllers')
  .controller('registerCtrl', function ($scope, games, $state,MessageBox,HttpService) {
        $scope.vm = {};
        $scope.send_regcode = function () {
          var username = $scope.vm.phone;
          if(angular.isUndefined(username)){
               MessageBox.showToast("请输入电话号码");
          }else{
             MessageBox.showLoading();
             HttpService.get(GlobalConfig.serverUrl+"api/Member/RegisterCode/"+username,{}, function (response) {
                      MessageBox.hide();
                      if(response.data.Code == 0){
                        MessageBox.showToast("您的验证码为："+response.data.Data);
                        $scope.vm.reCode = response.data.Data
                      }else{
                        MessageBox.showToast(response.data.Data);
                      }
             }, function (error) {
               MessageBox.hide();
               console.log(error);
             });
          }
        }
        $scope.send_reg = function () {
          var username = $scope.vm.phone;
          var reCode = $scope.vm.reCode;
          var nick = $scope.vm.nick;
          var password = $scope.vm.pwd;
          var md5Password = CryptoJS.MD5(password).toString();
          console.log(reCode);
            if(angular.isUndefined(username)){
              MessageBox.showToast('请输入用户名');
              return;
            }
            if(angular.isUndefined(reCode)){
              MessageBox.showToast('请获取验证码');
              return;
            }
            if(angular.isUndefined(nick)){
              MessageBox.showToast('请输入昵称');
              return;
            }
            if(angular.isUndefined(password)){
              MessageBox.showToast('请输入密码');
              return;
            }
            MessageBox.showLoading("注册中...");
            HttpService.post(GlobalConfig.serverUrl+"api/Member/Register",{
               Type:1,
               Title:username,
               Secret:md5Password,
               Nick:nick,
               Code:reCode
            }, function (response) {
                MessageBox.hide();
              if(response.data.Code == 0){
                localStorage.setItem("Access_Token",response.data.Data.Access_Token);
                localStorage.setItem("MemberID",response.data.Data.MemberID);
                $state.go("login");
              }else{
                MessageBox.showToast(response.data.Data);
              }

            }, function (error) {
              MessageBox.hide();
               console.log(error);
            });

        }
  });
