/**
 * http://www.myideaway.com
 * Created by Tommy Chen on 11/26/15.
 */
angular.module('app.controllers', []);

/**
 * http://www.myideaway.com
 * Created by Tommy Chen on 3/19/16.
 */
angular.module('app.controllers')
  .controller('AboutUsCtrl', function ($scope, games, $state,HttpService,MessageBox,picture,$stateParams) {
    $scope.vm = {};

  });

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

/**
 * Created by Administrator on 2016/3/5.
 */
angular.module('app.controllers')
  .controller('GoBuyCtrl', function ($scope, games, $state, $ionicHistory, HttpService, $stateParams, MessageBox, $rootScope) {
    $scope.vm = {};
    var contents;
    if ($stateParams.data.contents) {
      contents = $stateParams.data.contents;
      localStorage.setItem("detailData", JSON.stringify(contents));
    } else {
      contents = JSON.parse(localStorage.getItem("detailData"));
    }
    $scope.vm.item = contents;
    HttpService.get(GlobalConfig.serverUrl + "api/Product/Data/" + $scope.vm.item.Id, {}, function (response) {
      $scope.vm.Data = response.data.Data;
    }, function (error) {
      console.log(error);
    });

    $scope.pic = function () {
      $state.go('picture', {
        data: {
          pictures: $scope.vm.item.Pictures
        }
      });
    }
    $scope.buy = function () {
      var token = localStorage.getItem("Access_Token");
      if (token) {
        MessageBox.confirm('确认购买?').then(function (result) {
          if (result) {
            MessageBox.showLoading("正在购买...");
            HttpService.put(GlobalConfig.serverUrl + "api/Product/Buy/" + contents.Id, {}, function (response) {
              MessageBox.hide();
              console.log(response);
              if (response.data.Data == true) {
                MessageBox.showToast("购买成功...");
                $rootScope.$broadcast('addBuy');
                setTimeout(function () {
                  $ionicHistory.goBack();
                }, 1000);
              } else{
                MessageBox.showToast(response.data.Data);
              }
            }, function (error) {
              MessageBox.hide();
              console.log(error);
            });
          }
        });
      } else {
        $state.go("login");
      }

    }
  });

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

/**
 * Created by Administrator on 2016/3/17.
 */
angular.module('app.controllers')
  .controller('pictureCtrl', function ($scope, games, $state,HttpService,MessageBox,picture,$stateParams) {
    $scope.vm = {};
    $scope.vm.pictures = $stateParams.data.pictures;
    for(var i=0;i<$scope.vm.pictures.length;i++){
      $scope.vm.pictures[i] = GlobalConfig.serverUrl+$scope.vm.pictures[i];
    }

  });

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

/**
 * Created by Administrator on 2016/3/19.
 */
angular.module('app.controllers')
  .controller('ruleCtrl', function ($scope,$ionicHistory) {
    $scope.vm = {};
    $scope.back = function () {
      $ionicHistory.goBack();
    }
  });

/**
 * Created by a on 2016/2/20.
 */
angular.module('app.controllers')
  .controller('secKillDetailCtrl', function ($scope, Person, $ionicPopup, $state, picture, $stateParams, HttpService, MessageBox) {
    $scope.vm = {};
    $scope.Person = Person.all();
    $scope.vm.topPrice = 0;
    var contents;
    if ($stateParams.data.contents) {
      contents = $stateParams.data.contents;
      localStorage.setItem("detailData", JSON.stringify(contents));
    } else {
      contents = JSON.parse(localStorage.getItem("detailData"));
    }
    $scope.vm.item = contents;
    $scope.vm.item.BeginTime = $scope.vm.item.BeginTime.replace("T", "   ");
    $scope.vm.item.EndTime = $scope.vm.item.EndTime.replace("T", "   ");
    $scope.vm.item.MinStepPrice = $scope.vm.item.MinStepPrice / 100;
    $scope.vm.item.MaxStepPrice = $scope.vm.item.MaxStepPrice / 100;
    console.log(contents);
    MessageBox.showLoading();
    HttpService.get(GlobalConfig.serverUrl + "api/Product/Auction/" + $scope.vm.item.Id, {}, function (response) {
      MessageBox.hide();
      if (response.data.Code == 0) {
        console.log(response);
        $scope.vm.persons = response.data.Data.Logs;
        for (var i = 0; i < $scope.vm.persons.length; i++) {
          $scope.vm.persons[i].Price = $scope.vm.persons[i].Price / 100;
          if (i == 0) {
            $scope.vm.persons[i].State = "领先"
          } else {
            $scope.vm.persons[i].State = "出局"
          }
        }
        if ($scope.vm.persons.length > 0) {
          $scope.vm.topPrice = $scope.vm.persons[0].Price;
          $scope.vm.Price = "￥" + ($scope.vm.item.MinStepPrice + $scope.vm.topPrice);
          $scope.vm.NowPrice = ($scope.vm.item.MinStepPrice + $scope.vm.topPrice);
        }else{
          $scope.vm.Price = "￥" + $scope.vm.item.Price;
          $scope.vm.NowPrice =  $scope.vm.item.Price;
        }
      }else{
        MessageBox.showToast(response.data.Data);
      }
    }, function (error) {
      MessageBox.hide();
      console.log(error);
    });
    HttpService.get(GlobalConfig.serverUrl + "api/Product/Data/" + $scope.vm.item.Id, {}, function (response) {
      $scope.vm.Data = response.data.Data;

    }, function (error) {
      console.log(error);
    });

    $scope.price = function () {
      if($scope.vm.persons.length > 0){
        var myPopup = $ionicPopup.show({
          template: '<input type="text" placeholder="最低出价￥{{vm.NowPrice}}" ng-model="vm.itemPrice">',
          title: '出价',
          subTitle: '最低出价￥' +  $scope.vm.NowPrice+ '&nbsp;&#65307;&nbsp;最高出价￥' + (parseInt($scope.vm.item.MaxStepPrice) + parseInt($scope.vm.NowPrice)),
          scope: $scope,
          buttons: [
            {text: '取消'},
            {
              text: '<b>出价</b>',
              type: 'button-positive',
              onTap: function (e) {
                if (!$scope.vm.itemPrice) {
                  var token = localStorage.getItem("Access_Token");
                  if (token) {
                    MessageBox.showToast("请输入金额");
                  } else {
                    $state.go("login");
                  }
                } else {
                  return $scope.vm.itemPrice;
                }

              }
            }
          ]
        });
        myPopup.then(function (res) {
          var token = localStorage.getItem("Access_Token");
          if (token) {
            if (res) {
              MessageBox.showLoading("正在处理...");
              HttpService.put(GlobalConfig.serverUrl + "api/Product/Auction/" + $scope.vm.item.Id + "/" + $scope.vm.itemPrice * 100, {}, function (response) {
                console.log(response)
                if (response.data.Code == 0) {
                  MessageBox.showLoading();
                  HttpService.get(GlobalConfig.serverUrl + "api/Product/Auction/" + $scope.vm.item.Id, {}, function (response) {
                    MessageBox.hide();
                    $scope.vm.persons = response.data.Data.Logs;
                    for (var i = 0; i < $scope.vm.persons.length; i++) {
                      $scope.vm.persons[i].Price = $scope.vm.persons[i].Price / 100;
                      if (i == 0) {
                        $scope.vm.persons[i].State = "领先"
                      } else {
                        $scope.vm.persons[i].State = "出局"
                      }
                    }
                    if ($scope.vm.persons.length > 0) {
                      $scope.vm.topPrice = $scope.vm.persons[0].Price;
                      $scope.vm.Price = "￥" + ($scope.vm.item.MinStepPrice + $scope.vm.topPrice);
                      $scope.vm.NowPrice = ($scope.vm.item.MinStepPrice + $scope.vm.topPrice);
                    }else{
                      $scope.vm.Price = "￥" + $scope.vm.item.Price;
                      $scope.vm.NowPrice =  $scope.vm.item.Price;
                    }
                  }, function (error) {
                    MessageBox.hide();
                    console.log(error);
                  });
                } else {
                  MessageBox.showToast(response.data.Data);
                }
              }, function (error) {
                MessageBox.hide();
                console.log(error);
              });
              console.log(res);
            }
          } else {
            $state.go("login");
          }
        });
      }else{
        var token = localStorage.getItem("Access_Token");
        if (token) {
            MessageBox.showLoading("正在处理...");
            HttpService.put(GlobalConfig.serverUrl + "api/Product/Auction/" + $scope.vm.item.Id + "/" + $scope.vm.NowPrice * 100, {}, function (response) {
              console.log(response);
              if (response.data.Code == 0) {
                MessageBox.showLoading();
                HttpService.get(GlobalConfig.serverUrl + "api/Product/Auction/" + $scope.vm.item.Id, {}, function (response) {
                  MessageBox.hide();
                  $scope.vm.persons = response.data.Data.Logs;
                  for (var i = 0; i < $scope.vm.persons.length; i++) {
                    $scope.vm.persons[i].Price = $scope.vm.persons[i].Price / 100;
                    if (i == 0) {
                      $scope.vm.persons[i].State = "领先"
                    } else {
                      $scope.vm.persons[i].State = "出局"
                    }
                  }
                  if ($scope.vm.persons.length > 0) {
                    $scope.vm.topPrice = $scope.vm.persons[0].Price;
                    $scope.vm.Price = "￥" + ($scope.vm.item.MinStepPrice + $scope.vm.topPrice);
                    $scope.vm.NowPrice = ($scope.vm.item.MinStepPrice + $scope.vm.topPrice);
                  }else{
                    $scope.vm.Price = "￥" + $scope.vm.item.Price;
                    $scope.vm.NowPrice =  $scope.vm.item.Price;
                  }
                }, function (error) {
                  MessageBox.hide();
                  console.log(error);
                });
              } else {
                MessageBox.showToast(response.data.Data);
              }
            }, function (error) {
              MessageBox.hide();
              console.log(error);
            });
        } else {
          $state.go("login");
        }
      }

    };

    $scope.pic = function () {
      $state.go('picture', {
        data: {
          pictures: $scope.vm.item.Pictures
        }
      });
    }
  })

/**
 * Created by xqy on 2016/3/18.
 */
angular.module('app.controllers')
  .controller('secKillSoonDetailCtrl', function ($log, $scope, $ionicHistory, Person, $ionicPopup, $state, picture, $stateParams, HttpService, MessageBox) {
    $scope.vm = {};
    $scope.vm.type = 'remind';

    if ($stateParams.data.type) {
      $scope.vm.type = $stateParams.data.type;
    }

    var contents;
    if ($stateParams.data.contents) {
      contents = $stateParams.data.contents;
      localStorage.setItem("detailData", JSON.stringify(contents));
    } else {
      contents = JSON.parse(localStorage.getItem("detailData"));
    }

    $scope.vm.item = contents;
    $scope.vm.item.BeginTime = $scope.vm.item.BeginTime.replace("T", "   ");
    $scope.vm.item.EndTime = $scope.vm.item.EndTime.replace("T", "   ");
    $scope.vm.item.MinStepPrice = $scope.vm.item.MinStepPrice / 100;
    $scope.vm.item.MaxStepPrice = $scope.vm.item.MaxStepPrice / 100;
    HttpService.get(GlobalConfig.serverUrl + "api/Product/Data/" + $scope.vm.item.Id, {}, function (response) {
      $scope.vm.Data = response.data.Data;
    }, function (error) {
      console.log(error);
    });

    $scope.remind = function () {
      var token = localStorage.getItem("Access_Token");
      if (token) {
        MessageBox.showLoading("正在关注...")
        HttpService.put(GlobalConfig.serverUrl + "api/Product/Favorite/" + $scope.vm.item.Id, {}, function (response) {
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
    };

    $scope.removeRemind = function () {
      MessageBox.showLoading("正在处理...");
      HttpService.delete(GlobalConfig.serverUrl + "api/Product/Favorite/" + $scope.vm.item.Auction.Id, {}, function (response) {
        if (response.data.Code == 0) {
          MessageBox.hide();
          if ($stateParams.event.removeRemind) {
            $stateParams.event.removeRemind();
          }
        }else{
          MessageBox.showToast(response.data.Data);
        }

      }, function (error) {
        MessageBox.hide();
        console.log(error);
      });
    }

    $scope.pic = function () {
      $state.go('picture', {
        data: {
          pictures: $scope.vm.item.Pictures
        }
      });
    }
  })

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


/**
 * Created by Administrator on 2016/3/7.
 */
angular.module('app.controllers')
  .controller('setCtrl', function ($scope, games, $state, HttpService, $stateParams, MessageBox, $ionicHistory, $ionicActionSheet, $rootScope) {
    $scope.vm = {};
    var memberId;
    var hasInitData = false;

    $scope.$on('$ionicView.afterEnter', function () {
      if (!hasInitData) {
        loadData(true);
      } else {
        loadData(false);
      }

    });
    var loadData = function (showLoading) {
      memberId = localStorage.getItem("MemberID");
      if (showLoading) {
        MessageBox.showLoading();
      }
      $scope.$broadcast('mloading.show');
      HttpService.get(GlobalConfig.serverUrl + "api/Member/BaseView/" + memberId, {}, function (response) {
        hasInitData = true;
        if (response.data.Code == 0) {
          $scope.vm.nick = response.data.Data.Nick;
          $scope.vm.avatar = GlobalConfig.serverUrl + response.data.Data.Avatar;
        }else{
          MessageBox.showToast(response.data.Data);
        }

      }, function (error) {
        MessageBox.hide();
        console.log(error);
      });
      HttpService.get(GlobalConfig.serverUrl + "api/Member/Address", {}, function (response) {
        if (showLoading) {
          MessageBox.hide();
        }
        if (response.data.Code == 0) {
          $scope.$broadcast('mloading.hide');
          $scope.vm.item = response.data.Data;
        }else{
          MessageBox.showToast(response.data.Data);
        }
      }, function (error) {
        MessageBox.hide();
        console.log(error);
      });
    };
    $scope.back = function () {
      $ionicHistory.goBack();
    }
    $scope.goSetAddress = function () {
      $state.go("setAddress", {
        data: {
          address: $scope.vm.item.Address
        }
      });
    }
    $scope.goSetNick = function () {
      $state.go("setNick", {
        data: {
          nick: $scope.vm.nick
        }
      });
    }
    $scope.goSetPhone = function () {
      $state.go("setPhone", {
        data: {
          TelPhone: $scope.vm.item.TelPhone
        }
      });
    }
    $scope.setHeadImg = function () {
      var hideSheet = $ionicActionSheet.show({
        buttons: [{
          text: '<b>拍照</b> 上传'
        }, {
          text: '<b>相册</b> 上传'
        }],
        titleText: '图片上传',
        cancelText: '取 消',
        cancel: function () {
        },
        buttonClicked: function (index) {
          // 相册文件选择上传
          if (index == 1) {
            pic();
          } else if (index == 0) {
            // 拍照上传
            camera();
          }
          return true;
        }
      });
    }
    var camera = function () {
      navigator.camera.getPicture(function (path) {
          releasePic(path);
        }, function (error) {
          console.log(error);
        },
        {
          quality: 50,
          correctOrientation: true,
          sourceType: Camera.PictureSourceType.CAMERA,
          destinationType: Camera.DestinationType.FILE_URI
        });
    }
    var pic = function () {
      navigator.camera.getPicture(function (path) {
          releasePic(path);
        }, function (error) {
          console.log(error);
        },
        {
          quality: 50,
          correctOrientation: true,
          destinationType: Camera.DestinationType.FILE_URI,
          sourceType: Camera.PictureSourceType.PHOTOLIBRARY
        });
    }
    var releasePic = function (fileURL) {
      MessageBox.showLoading("正在上传头像...");
      var win = function (r) {
        MessageBox.showLoading();
        HttpService.get(GlobalConfig.serverUrl + "api/Member/BaseView/" + memberId, {}, function (response) {
          MessageBox.hide();
          $scope.vm.nick = response.data.Data.Nick;
          $scope.vm.avatar = GlobalConfig.serverUrl + response.data.Data.Avatar;
          $rootScope.$broadcast("addSet");
        }, function (error) {
          MessageBox.hide();
          console.log(error);
        });
      }

      var fail = function (error) {
        console.log("An error has occurred: Code = " + error.code);
        console.log("upload error source " + error.source);
        console.log("upload error target " + error.target);
      }

      var options = new FileUploadOptions();
      options.fileKey = "file";
      options.fileName = "image.jpg";
      options.mimeType = "image/jpeg";
      options.httpMethod = "put";

      var accessToken = localStorage.getItem('Access_Token');
      options.headers = {'Authorization': 'base ' + accessToken};
      var ft = new FileTransfer();
      ft.upload(fileURL, encodeURI(GlobalConfig.serverUrl + "api/Member/Avatar"), win, fail, options);
    }
  });

/**
 * Created by Administrator on 2016/3/7.
 */
angular.module('app.controllers')
  .controller('setAddressCtrl', function ($scope, games, $state,HttpService,$stateParams,$ionicHistory,MessageBox) {
    $scope.vm = {};
    $scope.vm.address = $stateParams.data.address;
    $scope.save = function () {
      var address = $scope.vm.address;
      MessageBox.showLoading("正在修改...");
      HttpService.put(GlobalConfig.serverUrl+"api/Member/ChangeAddress/"+address,{}, function (response) {
        MessageBox.hide();
        if(response.data.Code == 0){
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

/**
 * Created by Administrator on 2016/3/7.
 */
angular.module('app.controllers')
  .controller('setPhoneCtrl', function ($scope, games, $state,HttpService,$stateParams,$ionicHistory,MessageBox) {
    $scope.vm = {};
    $scope.vm.phone = $stateParams.data.TelPhone;
    $scope.save = function () {
      var phone = $scope.vm.phone;
      MessageBox.showLoading("正在修改...");
      HttpService.put(GlobalConfig.serverUrl+"api/Member/ChangeTelPhone/"+phone,{}, function (response) {
        MessageBox.hide();
        if(response.data.Code == 0){
          $state.go("set");
        }else{
          MessageBox.showToast("手机格式不正确...")
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

/**
 * Created by Administrator on 2016/3/4.
 */
angular.module('app.controllers')
  .controller('tabCtrl', function ($log, $scope, games, $state, $ionicHistory) {

    $scope.goPerson = function () {
      var Access_Token = localStorage.getItem("Access_Token");
      if (Access_Token) {
        $ionicHistory.currentView($ionicHistory.backView());
        $state.go("person");
      } else {
        $state.go("login");
      }
    };

    $scope.goBuy = function () {
      $ionicHistory.currentView($ionicHistory.backView());
      $state.go("buy");
    };

    $scope.goSecKill = function () {
      $ionicHistory.currentView($ionicHistory.backView());
      $state.go("SecKill");
    };

  });

/**
 * Created by a on 2016/2/20.
 */
angular.module('app.controllers')
  .controller('timeCtrl', function ($interval, $scope) {

    $scope.gettime = function () {
      var EndTime = new Date('2016/2/21 15:10');
      var NowTime = new Date();
      var t = EndTime.getTime() - NowTime.getTime();
      return t;
    }

    var runTiming = function () {
      timePromise = $interval(function () {
        var h = Math.floor($scope.gettime() / 1000 / 60 / 60 % 24);
        if (h < 10)
          $scope.h = "0" + h;
        else
          $scope.h = h;
        var m = Math.floor($scope.gettime() / 1000 / 60 % 60);
        if (m < 10)
          $scope.m = "0" + m;
        else
          $scope.m = m;
        var s = Math.floor($scope.gettime() / 1000 % 60);
        if (s < 10)
          $scope.s = "0" + s;
        else
          $scope.s = s;
        if (s < 0) {
          $scope.h = "00";
          $scope.m = "00";
        }
      }, 1000, 100);
    }
    runTiming();
  });

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
