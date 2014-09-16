angular.module('dgs').controller('RegisterCtrl',function($scope,$rootScope,$state,$http,AUTH_EVENTS,authService){

  $scope.credentials = {name:'',email: '',password: ''};

  $scope.register = function(credentials){
  		authService.register(credentials).then(function(user_id){
  			console.log("User registered with user_id="+user_id);
  			$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
      		
      		var user = {};
      		user.user_id = user_id;

      		$scope.setCurrentUser(user);
      		$state.go("home");
  		});
  };

});