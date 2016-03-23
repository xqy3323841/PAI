/**
 * Created by xqy on 2016/3/17.
 */
angular.module('app.controllers')
  .controller('WalletCtrl', function ($scope, games, $state,MessageBox,HttpService,$stateParams) {
        $scope.vm = {};
        $scope.vm.surplus = $stateParams.data.surplus;
        $scope.$on("$ionicView.afterEnter",function(){
            MessageBox.showLoading();
            HttpService.get(GlobalConfig.serverUrl+"api/Product/Purchase/10/1",{}, function (response) {
                MessageBox.hide();
                if (response.data.Code == 0) {
                  $scope.vm.items = response.data.Data.Data;
                  for(var i = 0;i<$scope.vm.items.length;i++){
                    if($scope.vm.items[i].ActionType == 1){
                      $scope.vm.items[i].type = "充值";
                      $scope.vm.items[i].or = "+";
                    }else if($scope.vm.items[i].ActionType ==2){
                      $scope.vm.items[i].type = "购买鸽子";
                      $scope.vm.items[i].or = "-";
                    }
                    $scope.vm.items[i].Price = $scope.vm.items[i].Price/100;
                  }
                }else{
                  MessageBox.showToast(response.data.Data);
                }
            }, function (error) {
                  MessageBox.hide();
                 console.log(error);
            });
        });
  });
