angular.module('app.controllers')
  .controller('BuyCtrl', function ($scope, games, $state, HttpService, MessageBox) {
    $scope.vm = {};

    $scope.vm.items = [];
    $scope.vm.moredata = false;
    var count = 10;
    var pageIndex = 1;
    var hasInitData = false;

    $scope.doRefresh = function () {
      pageIndex = 1;
      loadData(false, 0);
    };

    $scope.loadMore = function () {
      pageIndex++;
      loadData(false, 1);
    };

    //flag 判断是否显示MessageBox   index 0 刷新 1 加载
    var loadData = function (flag, index) {
      if (flag) {
        MessageBox.showLoading();
      }
      $scope.$broadcast('mloading.show');
      HttpService.get(GlobalConfig.serverUrl + "api/Product/BaseView/" + count + "/" + pageIndex, {}, function (response) {
        if (flag) {
          MessageBox.hide();
        }
        hasInitData = true;
        if (response.data.Code == 0) {
            if (response.data.Data.PageCount > response.data.Data.PageIndex) {
              $scope.vm.moredata = true;
            } else {
              $scope.vm.moredata = false;
            }
            for (var i = 0; i < response.data.Data.Data.length; i++) {
              response.data.Data.Data[i].Price = response.data.Data.Data[i].Price / 100;
              response.data.Data.Data[i].Preview_Img = GlobalConfig.serverUrl + response.data.Data.Data[i].Preview_Img;
            }
            if (index == 0) {
              $scope.vm.items = [];
            }
            $scope.vm.items = $.merge($scope.vm.items, response.data.Data.Data);
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.refreshComplete');
            $scope.$broadcast('mloading.hide');
        }else{
          MessageBox.showToast(response.data.Data);
        }
      }, function (error) {
        MessageBox.hide();
        console.log(error);
      });
    };

    $scope.goBuy = function (index) {
      console.log(index);
      $state.go('gobuy', {
        data: {
          contents: $scope.vm.items[index]
        }
      });
    };

    $scope.$on('$ionicView.afterEnter', function () {
      if (!hasInitData) {
        loadData(true, 0);
      } else {
        loadData(false, 0);
      }

    });

  });
