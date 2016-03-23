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
