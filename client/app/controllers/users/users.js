angular.module('dgs').controller('UsersCtrl',function($scope,$state,userService,roleService,$http){

	$scope.showIndex = true;
	$scope.currentUser = {first_name:"",last_name:"",email:"",password:""};
	$scope.page = {current:1,total_items:20,items_per_page:2};
	$scope.isEditing = false;

	userService.query(function(data){
		$scope.users = data;
		$scope.page.total_items = $scope.users.length;
	});

	roleService.query(function(data){
		$scope.roles = data;
	});

	$scope.pageChanged = function(page){
      	userService.query({page:page},function(data){
      		$scope.users = data;
    	});
  	};

	$scope.newUserForm = function(){
		$scope.showIndex = false;
		//$state.go("home.users.new");
	};

	$scope.createUser = function(user){
		//console.log(user);
		$scope.showIndex = true;
		$scope.isEditing = false;
		userService.save(user,function(res){
			console.log("success");
			console.log(res);
		},function(res){
			console.log("error");
			console.log(res);
		});
		$scope.users.push(user);
	};
	$scope.updateUser = function(user){
		user.role_id=1;
		userService.update({id:user.id},user);
		$scope.showIndex = true;
		$scope.isEditing = false;
	};

	$scope.editUserForm = function(user){
		$scope.showIndex = false;
		$scope.isEditing = true;
		$scope.currentUser = user;
		//$state.go();	
	};

	$scope.cancelUserForm = function(){
		$scope.showIndex = true;
		$scope.newuser = {first_name:"",last_name:"",email:"",password:""};
	};

	$scope.submitForm = function() {
	};

});