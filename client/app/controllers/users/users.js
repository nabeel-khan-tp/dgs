angular.module('dgs').controller('UsersCtrl',function($scope,$state,userService){

	userService.query(function(data){
		$scope.users = data;
	});

	$scope.showIndex = true;
	$scope.newuser = {first_name:"",last_name:"",email:"",password:""};
	$scope.newUserForm = function(){
		$scope.showIndex = false;
		$state.go("home.users.new");
	};

	$scope.createUser = function(user){
		//console.log(user);
		$scope.showIndex = true;
		userService.save(user);
		$scope.users.push(user);
	};

	$scope.cancelUserForm = function(){
		$scope.showIndex = true;
		$scope.newuser = {first_name:"",last_name:"",email:"",password:""};
	}

});