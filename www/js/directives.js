/**
 * http://www.myideaway.com
 * Created by Tommy Chen on 11/26/15.
 */
angular.module('app.directives', []);

/**
 * http://www.myideaway.com
 * Created by Tommy Chen on 11/26/15.
 */
angular.module('app.directives')
    .directive('hideTabs', function ($rootScope) {
        return {
            restrict: 'A',
            link: function (scope, element, attributes) {

                scope.$on('$ionicView.beforeEnter', function () {

                    scope.$watch(attributes.hideTabs, function (value) {
                        $rootScope.hideTabs = value;
                    });
                });
            }
        };
    });

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
