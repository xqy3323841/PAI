/**
 * http://www.myideaway.com
 * Created by Tommy Chen on 11/25/15.
 */
var HttpUtils = {
  post: function ($http, url, params, successHandler, errorHandler) {
    var Authorization = localStorage.getItem("Access_Token");
    if(Authorization){
      var headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization':'base '+Authorization
      };
    }else{
      var headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
      };
    }

    $http({
      method: 'POST',
      url: url,
      data: HttpUtils.obj2params(params),
      headers: headers,
      responseType: 'json',
      timeout: 30000
    }).then(successHandler, errorHandler);
  },
  put: function ($http, url, params, successHandler, errorHandler) {
    var Authorization = localStorage.getItem("Access_Token");
    if(Authorization){
      var headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization':'base '+Authorization
      };
    }else{
      var headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
      };
    }
    $http({
      method: 'PUT',
      url: url,
      data: HttpUtils.obj2params(params),
      headers: headers,
      responseType: 'json',
      timeout: 30000
    }).then(successHandler, errorHandler);
  },
  delete: function ($http, url, params, successHandler, errorHandler) {
    var Authorization = localStorage.getItem("Access_Token");
    if(Authorization){
      var headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization':'base '+Authorization
      };
    }else{
      var headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
      };
    }
    $http({
      method: 'DELETE',
      url: url + "?" + HttpUtils.obj2params(params),
      headers: headers,
      responseType: 'json',
      timeout: 30000
    }).then(successHandler, errorHandler);
  },
  get: function ($http, url, params, successHandler, errorHandler) {
    var Authorization = localStorage.getItem("Access_Token");
    if(Authorization){
      var headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization':'base '+Authorization
      };
    }else{
      var headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
      };
    }
    $http({
      method: 'GET',
      url: url + "?" + HttpUtils.obj2params(params),
      headers: headers,
      responseType: 'json',
      timeout: 30000
    }).then(successHandler, errorHandler);
  },
  obj2params: function (obj) {
    var p = [];
    for (var key in obj) {
      p.push(key + '=' + encodeURIComponent(obj[key]));
    }
    return p.join('&');
  }
};
