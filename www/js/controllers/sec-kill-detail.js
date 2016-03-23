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
