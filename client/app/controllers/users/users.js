angular.module('dgs').controller('UsersCtrl',function($q,$scope,$state,authService,userService,roleService,$http){

	$scope.showIndex = true;
	$scope.currentUser = {first_name:"",last_name:"",email:"",password:""};
	$scope.page = {current:1,total_items:0,items_per_page:10};
	$scope.isEditing = false;
	$scope.perm = authService.hasPermissions;
	$scope.hasEditingPermission = authService.hasPermissions('home.users',2);

	userService.query(function(data){
		$scope.users = data.users;
		$scope.page.total_items = data.count;
	});

	roleService.query(function(data){
		$scope.roles = data.roles;
	});

	$scope.pageChanged = function(page){
      	userService.query({page:page,per_page:$scope.page.items_per_page},function(data){
      		$scope.users = data.users;
    	});
  	};

	$scope.newUserForm = function(){
		$scope.showIndex = false;
		//$state.go("home.users.new");
	};

	$scope.createUser = function(user){
		//console.log(user);
		var deferred = $q.defer();
		
		userService.save(user,function(res){
			//console.log("success");
			//console.log(res);
			$scope.showIndex = true;
			$scope.isEditing = false;
			
			deferred.resolve("ok");
		},function(res){
			//console.log("error");
			//console.log(res);
			deferred.reject("rejected");
		});
		$scope.users.push(user);

		return deferred.promise;
	};

	$scope.updateUser = function(user){
		//user.role_id=1;
		userService.update({id:user.id},user);
		$scope.showIndex = true;
		$scope.isEditing = false;
	};
	$scope.remove = function(user){
		userService.delete(user);
	//_.remove($scope.users,user);
		for(x in $scope.users)
		{
			if($scope.users[x].id==user.id)
			{
					delete($scope.users[x]);
			}
		}
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