/**
 * http://www.myideaway.com
 * Created by Tommy Chen on 11/26/15.
 */
angular.module('app.directives')
  .directive('mLoading', function ($rootScope) {
    return {
      restrict: 'E',
      templateUrl: 'templates/loading.html',
      link: function (scope) {
        scope.mloading = {};

        scope.mloading.show = false;

        scope.$on('mloading.show', function () {
          scope.mloading.show = true;
        });

        scope.$on('mloading.hide', function () {
          scope.mloading.show = false;
        });
      }
    };
  });
