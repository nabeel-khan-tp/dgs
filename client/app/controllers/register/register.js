angular.module('dgs').controller('RegisterCtrl',function($scope,$rootScope,$state,$http,AUTH_EVENTS,authService){

  $scope.credentials = {first_name:'',last_name:'',email: '',password: ''};

  $scope.register = function(){
  		authService.register($scope.credentials).then(function(res){
  			
        //console.log(user_id);
        console.log("User registered with user_id="+res.data.user.id);
  			$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
      		
      	$scope.setCurrentUser(res.data.user);
        $scope.setAuthToken(res.data.auth_key.access_token);
      	$state.go("home");
  		});
  };

});