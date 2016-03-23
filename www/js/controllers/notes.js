/**
 * Created by xqy on 2016/3/15.
 */
angular.module('app.controllers')
  .controller('NotesCtrl', function ($scope, games, $state,HttpService,MessageBox,$rootScope) {
    $scope.vm = {};
    $scope.vm.moredata = false ;
    var pageIndex = 1;
    $scope.doRefresh = function () {
      pageIndex = 1;
      loadData(false,0);
    }
    $scope.loadMore = function () {
      pageIndex++;
      loadData(false,1);
    }
    var loadData = function (flag,index) {
      if(flag){
        MessageBox.showLoading();
      }
      HttpService.get(GlobalConfig.serverUrl+"api/Product/BuyedView/10/"+pageIndex,{}, function (response) {
        if (response.data.Code == 0) {
          if(response.data.Data.PageCount>response.data.Data.PageIndex){
            $scope.vm.moredata = true;
          }else{
            $scope.vm.moredata = false;
          }
          MessageBox.hide();
          for(var i = 0; i< response.data.Data.Data.length;i++){
            response.data.Data.Data[i].Price =  response.data.Data.Data[i].Price/100;
            response.data.Data.Data[i].Preview_Img = GlobalConfig.serverUrl+response.data.Data.Data[i].Preview_Img;
          }
          if(index==0){
            $scope.vm.items = []
          }
          $scope.vm.items = $.merge($scope.vm.items,response.data.Data.Data);
          $scope.$broadcast('scroll.infiniteScrollComplete');
          $scope.$broadcast('scroll.refreshComplete');
        }else{
          MessageBox.showToast(response.data.Data);
        }
      }, function (error) {
        MessageBox.hide();
        console.log(error);
      });
    }

    $rootScope.$on('addBuy', function(){
      // refresh
      $scope.doRefresh();
    })
    $scope.$on('$ionicView.afterEnter', function () {
      $scope.vm.items = [];
      loadData(true,0);
    });
  });
