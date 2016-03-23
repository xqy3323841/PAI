/**
 * http://www.myideaway.com
 * Created by Tommy Chen on 1/25/16.
 */
angular.module('app.services')
  .factory('MessageBox', function ($http, $ionicLoading, $ionicPopup) {
    return {
      showToast: function (message) {
        $ionicLoading.show({
          template: message,
          duration: 1000
        });
      },

      showLoading: function (message) {
        if(message){
          $ionicLoading.show({
            template: message
          });
        } else{
          $ionicLoading.show();
        }

      },

      showDelayLoading: function (message) {

        if(message){
          $ionicLoading.show({
            template: message,
            delay: 2000
          });
        } else{
          $ionicLoading.show({
            delay: 2000
          });
        }
      },

      hide: function () {
        $ionicLoading.hide();
      },

      confirm: function (message) {
        return $ionicPopup.confirm({
          title: message,
          okText:"确定",
          cancelText:"取消"
        });
      },
      alert: function (message) {
        return $ionicPopup.alert({
          title: message,
          okText:"确定"
        });
      }
    }
  });
