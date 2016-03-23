angular.module('app.controllers')
  .controller('PersonCtrl', function ($scope, $state, $ionicHistory, sets, bill, note, attention, HttpService, MessageBox, $rootScope) {
    $scope.vm = {};
    $scope.sets = sets.all();
    $scope.bill = bill.all();
    $scope.note = note.all();
    $scope.attention = attention.all();
    var hasInitData = false;

    $scope.loadData = function (showLoading) {
      var memberId = localStorage.getItem("MemberID");
      if (showLoading) {
        MessageBox.showLoading();
      }
      $scope.$broadcast('mloading.show');
      HttpService.get(GlobalConfig.serverUrl + "api/Product/MemberView/" + memberId, {}, function (response) {
        if (showLoading) {
          MessageBox.hide();
        }
        if (response.data.Code == 0) {
          hasInitData = true;
          $scope.vm.Avatar = GlobalConfig.serverUrl + response.data.Data.Avatar;
          $scope.vm.nick = response.data.Data.Nick;
          $scope.vm.surplus = response.data.Data.Surplus / 100;
          $scope.vm.Deposit = response.data.Data.Deposit;
          console.log($scope.vm.Deposit);
          if ($scope.vm.Deposit) {
            $scope.vm.qualifications = "具备";
          } else {
            $scope.vm.qualifications = "不具备";
          }
          $scope.$broadcast('scroll.refreshComplete');
          $scope.$broadcast('mloading.hide');
        } else {
          MessageBox.showToast(response.data.Data);
        }
      }, function (error) {
        if (showLoading) {
          MessageBox.hide();
        }
        console.log(error);
      });
    }
    $scope.qualifications = function () {
      if ($scope.vm.Deposit == false) {
        MessageBox.alert('请支付2000拍卖保证金至xx账户，支付后联系客服提供汇款单号，客服将在24小时内为您开通竞拍权限');
      }
    }
    $rootScope.$on('addSet', function () {
      // refresh
      $scope.loadData(true);
    });
    $rootScope.$on('login', function () {
      // refresh
      $scope.loadData(true);
    });
    $scope.goset = function () {
      $state.go('set');
    };
    $scope.wallet = function () {
      $state.go('wallet', {
        data: {
          surplus: $scope.vm.surplus
        }
      });
    };
    $scope.aboutUs = function () {
      $state.go('aboutUs');
    };

    $scope.notes = function () {
      $state.go('notes');
    };
    $scope.focus = function () {
      $state.go('focus');
    };
    $scope.login = function () {
      $state.go('login');
    };
    $scope.logout = function () {
      MessageBox.confirm('确认退出?').then(function (result) {
        if (result) {
          localStorage.clear();
          $ionicHistory.clearHistory();
          $ionicHistory.clearCache();

          // 设置jpush别名为空
          if (window.plugins && window.plugins.jPushPlugin) {
            window.plugins.jPushPlugin.setAlias('');
          }


          $state.go("SecKill");
        }
      });
    };
    $scope.$on('$ionicView.afterEnter', function () {
      if (!hasInitData) {
        $scope.loadData(true);
      } else {
        $scope.loadData(false);
      }
    });

  });
