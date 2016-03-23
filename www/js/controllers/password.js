/**
 * Created by Administrator on 2016/3/4.
 */
angular.module('app.controllers')
  .controller('passwordCtrl', function ($scope, games, $state,MessageBox,HttpService) {
        $scope.vm = {}
        $scope.getReCode = function () {
           var phoneNumber = $scope.vm.phoneNumber;
           if(angular.isUndefined(phoneNumber)){
             MessageBox.showToast("请输入电话号码");
           }else{
              HttpService.get(GlobalConfig.serverUrl+"api/Member/FindPassword/"+phoneNumber,{}, function (response) {
                console.log(response);
                MessageBox.showToast("验证码已发送，请稍等...");
                if(response.data.Code == 0){
                  MessageBox.showToast("您的验证码为："+response.data.Data);
                  $scope.vm.reCode = response.data.Data
                  // $("#reCode").val(response.data.Data);
                }else{
                  MessageBox.showToast(response.data.Data);
                }
              }, function (error) {
                  console.log(error);
              });
           }
        }
        $scope.changePsd = function () {
            var phoneNumber = $scope.vm.phoneNumber;
            var reCode = $scope.vm.reCode;
            var newPsd = $scope.vm.newPsd;
            var md5Psd = CryptoJS.MD5(newPsd).toString();
            if(angular.isUndefined(phoneNumber)){
              MessageBox.showToast('请输入电话');
              return;
            }
            if(angular.isUndefined(reCode)){
              MessageBox.showToast('请获取验证码');
              return;
            }
            if(angular.isUndefined(newPsd)){
              MessageBox.showToast('请输入新密码');
              return;
            }
            MessageBox.showLoading("正在修改...");
            HttpService.put(GlobalConfig.serverUrl+"api/Member/ChangePassword/"+phoneNumber+"/"+md5Psd+"/"+reCode,{}, function (response) {
              console.log(response);
                  MessageBox.hide();
                  if(response.data.Code == 0){
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
