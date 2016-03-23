/**
 * Created by xqy on 2016/3/18.
 */
angular.module('app.services')
  .factory('Time', function () {
     return{
       getTime:function (year,month,day,hour,min){
         var timeDate =  Time.getTime(year,month,day,hour,min);
          return timeDate;
       }
     }



  });
