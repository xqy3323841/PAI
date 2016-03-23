/**
 * Created by Administrator on 2016/3/11.
 */
angular.module('app.controllers')
  .controller('FocusCtrl', function ($log, $scope, games, $state, HttpService, $stateParams, $ionicHistory, MessageBox, $rootScope) {
    $scope.vm = {};
    $scope.vm.moredata = false;
    var pageIndex = 1;
    var hasInitData = false;

    $scope.doRefresh = function () {
      pageIndex = 1;
      loadData(false, 0);
    }
    $scope.loadMore = function () {
      pageIndex++;
      loadData(false, 1);
    }

    var loadData = function (flag, index) {
      if (flag) {
        MessageBox.showLoading();
      }

      $scope.$broadcast('mloading.show');

      HttpService.get(GlobalConfig.serverUrl + "api/Product/Favorite/10/" + pageIndex, {}, function (response) {
        if (response.data.Data.PageCount > response.data.Data.PageIndex) {
          $scope.vm.moredata = true;
        } else {
          $scope.vm.moredata = false;
        }
        MessageBox.hide();

        hasInitData = true;

        if (response.data.Code == 0) {
          for (var i = 0; i < response.data.Data.Data.length; i++) {
            response.data.Data.Data[i].Price = response.data.Data.Data[i].Price / 100;
            response.data.Data.Data[i].Preview_Img = GlobalConfig.serverUrl + response.data.Data.Data[i].Preview_Img;
            var dateData = response.data.Data.Data[i].Auction.EndTime.split("T")[0].split("-");
            var timeData = response.data.Data.Data[i].Auction.EndTime.split("T")[1].split(":");
            var endYear = dateData[0];
            var endMonth = dateData[1];
            var endDay = dateData[2];
            var endHour = timeData[0];
            var endMin = timeData[1];
            var res = Time.getTime(endYear, endMonth, endDay, endHour, endMin);
            response.data.Data.Data[i].hour = res[1];
            response.data.Data.Data[i].minute = res[2];
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
    }
    $scope.removeFollow = function (index) {
      MessageBox.showLoading();
      HttpService.delete(GlobalConfig.serverUrl + "api/Product/Favorite/" + $scope.vm.items[index].Id, {}, function (response) {
        if (response.data.Code == 0) {
          MessageBox.hide();
          $scope.doRefresh();
        }
      }, function (error) {
        console.log(error);
      });
    }
    $rootScope.$on('addFavor', function () {
      // refresh
      loadData(false, 0);
    })
    $scope.goDetail = function (index) {
      $log.debug('> $scope.vm.items[index]');
      var item = $scope.vm.items[index];
      item.MinStepPrice = item.Auction.MinStepPrice;
      item.MaxStepPrice = item.Auction.MaxStepPrice;
      item.BeginTime = item.Auction.BeginTime;
      item.EndTime = item.Auction.EndTime;
      $state.go('secKill-soon-detail', {
        data: {
          contents: item,
          type: 'removeRemind'
        },
        event: {
          removeRemind: function () {
            $ionicHistory.goBack();
            loadData(false, 0);
          }
        }
      });
    }
    $scope.customGoBack = function () {
      $ionicHistory.goBack();
    }
    $scope.vm.items = [];
    loadData(true, 0);
  });
