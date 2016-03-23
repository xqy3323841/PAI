/**
 * Created by xqy on 2016/3/18.
 */
var Time  = {
   getTime:function (year,month,day,hour,min) {
     var now = new Date();
     var endDate = new Date(year, month-1, day,hour,min);
     var leftTime=endDate.getTime()-now.getTime();
     var leftsecond = parseInt(leftTime/1000);
//var day1=parseInt(leftsecond/(24*60*60*6));
     var day1=Math.floor(leftsecond/(60*60*24));
     var hour=Math.floor((leftsecond-day1*24*60*60)/3600);
     var hour1 = hour+day1*24
     var minute=Math.floor((leftsecond-day1*24*60*60-hour*3600)/60);
     var second=Math.floor(leftsecond-day1*24*60*60-hour*3600-minute*60);
     var times = [day1,hour1,minute,second]
     return times;
}

}
