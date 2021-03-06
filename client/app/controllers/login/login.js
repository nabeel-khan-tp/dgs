angular.module('dgs').controller('LoginCtrl',function($q,$scope,$rootScope,$state,$http,AUTH_EVENTS,authService){

  $scope.credentials = {email: '',password: ''};
  $scope.errorOnLogin = false;
  $scope.errorMessage = "";

  $scope.login = function(){
    var deferred = $q.defer();
    authService.login($scope.credentials).then(function(res){
      if(res.status===200)
      {
        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        
        console.log(res);

        console.log(res.data.user.id + " "+ res.data.user.email + " " + res.data.auth_key.access_token);
        $scope.setCurrentUser(res.data.user);
        $scope.setAuthToken(res.data.auth_key.access_token);
        $state.go("home");
      }else
      {
        $scope.errorOnLogin = true;
        $scope.errorMessage = "Sorry either email does not exists or wrong password"; //res.data.message;
      }

      deferred.resolve('ok');
      //return deferred.promise;
  	},
  	function(){
  		$rootScope.$broadcast(AUTH_EVENTS.loginFailed);
      deferred.reject('sorry');
  	});

    return deferred.promise;
	
  };

/*  $scope.login().then(function(res){
    console.log(res);
    console.log("login success");
  },function(res){
    console.log(res);
    console.log("login failed");
  });*/

});