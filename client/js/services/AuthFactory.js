myApp.factory('Auth', function($http, $q, AuthToken){
  var authFactory = {};

  authFactory.login = function(username, password){
    return $http.post('/api/login', {
      username: username,
      password: password
    })
    .success(function(data){
      AuthToken.setToken(data.token);
      return data;
    })
  }

  authFactory.logout = function(){
    AuthToken.setToken();
  }

  authFactory.isLoggedIn = function(){
    if(AuthToken.getToken())
      return true;
    else
      return false;
  }

  authFactory.getUser = function(){
    if(AuthToken.getToken())
      return $http.get('/api/me');
    else
      return $q.reject({message: 'User doesnt have a token'});
  }
});
