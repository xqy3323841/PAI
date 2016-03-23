angular.module('app.controllers')
  .controller('SecKillCtrl', function ($scope, $ionicSlideBoxDelegate, $state, HttpService, MessageBox) {
    $scope.vm = {};
    $scope.vm.slides = [
      {id: '0'},
      {id: '1'}
    ];
    var pageIndex = 1;
    var hasInitData = false;
    $scope.slideIndex = 0;
    $scope.vm.moredata = false;
    $scope.vm.button = "加价";
    $scope.vm.button1 = "提醒";
    $scope.doSomeThing = function (index, $event) {
      $event.stopPropagation();
      if ($scope.slideIndex == 0) {
        $state.go('secKill-detail', {
          data: {
            contents: $scope.vm.slides[0].items[index]
          }
        });
      } else if ($scope.slideIndex == 1) {
        var token = localStorage.getItem("Access_Token");
        if (token) {
          MessageBox.showLoading("正在关注...")
          HttpService.put(GlobalConfig.serverUrl + "api/Product/Favorite/" + $scope.vm.slides[1].items[index].Id, {}, function (response) {
            if (response.data.Data) {
              MessageBox.hide();
              MessageBox.showToast("关注成功");
            } else {
              MessageBox.hide();
              MessageBox.showToast("您已关注")
            }
          }, function (error) {
            MessageBox.hide();
            console.log(error);
          });
        } else {
          $state.go("login");
        }

      }
    }
    $scope.goDetail = function (index) {
      if ($scope.slideIndex == 0) {
        $state.go('secKill-detail', {
          data: {
            contents: $scope.vm.slides[0].items[index]
          }
        });
      } else if ($scope.slideIndex == 1) {
        $state.go('secKill-soon-detail', {
          data: {
            contents: $scope.vm.slides[1].items[index]
          }
        });
      }
    }
    $scope.doRefresh = function () {
      if ($scope.slideIndex == 0) {
        pageIndex = 1;
        loadInData(false, 0);
      } else if ($scope.slideIndex == 1) {
        pageIndex = 1;
        loadSoonData(false, 0);
      }
    }
    $scope.loadMore = function () {
      if ($scope.slideIndex == 0) {
        pageIndex++;
        loadInData(false, 1);
      } else if ($scope.slideIndex == 1) {
        pageIndex++;
        loadSoonData(false, 1);
      }
    }
    $scope.goRule = function () {
      $state.go("rule");
    }
    $scope.checkFirst = function () {
      $(".seckill-title div").removeClass("active");
      $(".seckill-title div:first-child").addClass("active");
      $(".contentIn").show();
      $(".contentSoon").hide();
      $scope.slideIndex = 0;
    }
    $scope.checkLast = function () {
      $(".seckill-title div").removeClass("active");
      $(".seckill-title div:nth-child(2)").addClass("active");
      $(".contentSoon").show();
      $(".contentIn").hide();
      $scope.slideIndex = 1;
    }
    //flag 判断是否显示MessageBox   index 0 刷新 1 加载
    var loadInData = function (flag, index) {
      $scope.$broadcast('mloading.show');
      if (flag) {
        MessageBox.showLoading();
      }
      HttpService.get(GlobalConfig.serverUrl + "api/Product/Now/10/" + pageIndex, {}, function (response) {
        MessageBox.hide();
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
            var dateData = response.data.Data.Data[i].EndTime.split("T")[0].split("-");
            var timeData = response.data.Data.Data[i].EndTime.split("T")[1].split(":");
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
            $scope.vm.slides[0].items = [];
          }
          $scope.vm.slides[0].items = $.merge($scope.vm.slides[0].items, response.data.Data.Data);
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
    var loadSoonData = function (flag, index) {

      $scope.$broadcast('mloading.show');

      if (flag) {
        MessageBox.showLoading();
      }
      HttpService.get(GlobalConfig.serverUrl + "api/Product/WillBegin/10/" + pageIndex, {}, function (response) {
        MessageBox.hide();
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
            var dateData = response.data.Data.Data[i].BeginTime.split("T")[0].split("-");
            var timeData = response.data.Data.Data[i].BeginTime.split("T")[1].split(":");
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
            $scope.vm.slides[1].items = [];
          }
          $scope.vm.slides[1].items = $.merge($scope.vm.slides[1].items, response.data.Data.Data);
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

    $scope.$on('$ionicView.afterEnter', function () {

      if (hasInitData) {
        loadInData(false, 0);
        loadSoonData(false, 0);
      } else {
        loadInData(true, 0);
        loadSoonData(true, 0);
      }

    });

  });

