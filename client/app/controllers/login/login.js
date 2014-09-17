angular.module('dgs').controller('LoginCtrl',function($scope,$rootScope,$state,$http,AUTH_EVENTS,authService){

  $scope.credentials = {email: '',password: ''};
  $scope.errorOnLogin = false;
  $scope.errorMessage = "";

  $scope.login = function(credentials){
  
    authService.login(credentials).then(function(res){
      
      //console.log(res);
      if(res.status===200)
      {
        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        
        console.log(res.data.user.id + " "+ res.data.user.email);
        $scope.setCurrentUser(res.data.user);
        $scope.setAuthToken(res.data.auth_key.access_token);
        $state.go("home");
      }else
      {
        $scope.errorOnLogin = true;
        $scope.errorMessage = "Sorry either email does not exists or wrong password"; //res.data.message;
      }
  	},
  	function(){
  		$rootScope.$broadcast(AUTH_EVENTS.loginFailed);
  	});
	
  };

});