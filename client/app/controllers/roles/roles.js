angular.module('dgs').controller('RolesCtrl',function($scope,$state,roleService,$http){

	$scope.showIndex = true;
	$scope.currentRole = {name:""};
	$scope.page = {current:1,total_items:20,items_per_page:2};
	$scope.isEditing = false;

	roleService.query(function(data){
		$scope.roles = data;
		$scope.page.total_items = $scope.roles.length;
	});

	$scope.pageChanged = function(page){
      	roleService.query({page:page},function(data){
      		$scope.roles = data;
    	});
  	};

	$scope.newRoleForm = function(){
		$scope.showIndex = false;
	};

	$scope.createRole = function(role){
		//console.log(user);
		$scope.showIndex = true;
		$scope.isEditing = false;
		roleService.save(role,function(res){
			$scope.currentRole = {name:""};
			console.log("success");
			console.log(res);
		},function(res){
			console.log("error");
			console.log(res);
		});
		$scope.roles.push(role);
	};
	$scope.updateRole = function(role){
		//user.role_id=1;
		roleService.update({id:role.id},role);
		$scope.currentRole = {name:""};
		$scope.showIndex = true;
		$scope.isEditing = false;
	};

	$scope.editRoleForm = function(role){
		$scope.showIndex = false;
		$scope.isEditing = true;
		$scope.currentRole = role;
		//$state.go();	
	};

	$scope.cancelRoleForm = function(){
		$scope.showIndex = true;
		$scope.currentRole = {name:""};
	};

});