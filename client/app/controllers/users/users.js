angular.module('dgs').controller('UsersCtrl',function($scope,$state,userService,$http){

	$scope.showIndex = true;
	$scope.currentUser = {first_name:"",last_name:"",email:"",password:""};
	$scope.page = {current:1,total_items:20,items_per_page:2}
	$scope.isEditing = false;

	userService.query(function(data){
		$scope.users = data;
		$scope.page.total_items = $scope.users.length;
	});

	$scope.newUserForm = function(){
		$scope.showIndex = false;
		//$state.go("home.users.new");
	};

	$scope.createUser = function(user){
		//console.log(user);
		$scope.showIndex = true;
		$scope.isEditing = false;
		userService.save(user);
		$scope.users.push(user);
	};
	$scope.updateUser = function(user){
		//userService.$save(user);
		//user.$save();
		//userService.update({_id: $scope.post._id}, $scope.post);
		console.log("Saving user with id="+user.id);

		user.role_id=1;
		console.log(user);

		$http({method: 'PUT', url: 'http://localhost:3000/users/1'},user).
			  success(function(data, status, headers, config) {
			    console.log("success");
			    console.log(data);
			    // this callback will be called asynchronously
			    // when the response is available
			  }).
			  error(function(data, status, headers, config) {
			    console.log("error");
			    console.log(data);

			    // called asynchronously if an error occurs
			    // or server returns response with an error status.
			  });
		/*userService.save({ id: user.id },user,function(res){
			console.log(res);
		},function(res){
			console.log("request failed");
			console.log(res);
		});*/
	};

	$scope.editUserForm = function(user){
		$scope.showIndex = false;
		$scope.isEditing = true;
		$scope.currentUser = user;
		//$state.go();	
	}

	$scope.cancelUserForm = function(){
		$scope.showIndex = true;
		$scope.newuser = {first_name:"",last_name:"",email:"",password:""};
	}

});