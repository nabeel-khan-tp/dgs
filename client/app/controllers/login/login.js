angular.module('dgs').controller('LoginCtrl',function($scope,$rootScope,$state,$http,AUTH_EVENTS,authService){

  $scope.credentials = {email: '',password: ''};
  $scope.errorOnLogin = false;
  $scope.errorMessage = "";

  $scope.login = function(credentials){
  
  authService.login(credentials).then(function(res){
    
    console.log(res);
    //console.log(res.data.status);
    //console.log(res.data);
    if(res.status==200)
    {
      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
      
      console.log(res.data.user.id + " "+ res.data.user.email);
      $scope.setCurrentUser(res.data.user);
      $scope.setAuthToken(res.data.authentication_key);
      $state.go("home");
    }else
    {
      $scope.errorOnLogin = true;
      $scope.errorMessage = res.data.message;
    }
	},
	function(){
		$rootScope.$broadcast(AUTH_EVENTS.loginFailed);
	});
	/*$http
      .post(authService.API_URL+'/users', credentials)
      .then(function (res) {
        session.create(res.data.user_id);
        /*Session.create(res.data.id, res.data.user.id,
                       res.data.user.role);
        return res.data.user;
        console.log(res);
      });*/
  };

});