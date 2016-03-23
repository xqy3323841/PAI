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
