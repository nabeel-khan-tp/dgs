angular.module('dgs').controller('RolesCtrl',function($scope,$state,roleService,permissionsService,$http){

	$scope.showIndex = true;
	$scope.currentRole = {name:""};
	$scope.page = {current:1,total_items:0,items_per_page:10};
	$scope.isEditing = false;
	$scope.isRoleForm = false;
	$scope.isPermissionsForm = false;
	$scope.selectedPermissions = {};

	roleService.query(function(data){
		$scope.roles = data.roles;
		$scope.page.total_items = data.count;
	});

	permissionsService.query(function(data){
		$scope.permissions = data.permissions;
	});

	$scope.pageChanged = function(page){
      	roleService.query({page:page},function(data){
      		$scope.roles = data.roles;
    	});
  	};

	$scope.newRoleForm = function(){
		$scope.showIndex = false;
		$scope.isRoleForm = true;
	};

	$scope.showPermissionsFor = function(role){
		$scope.showIndex = false;
		$scope.isPermissionsForm = true;
	};

	$scope.savePermissions = function(selectedPermissions){
		//console.log(selectedPermissions);
		for(permission_id in selectedPermissions){
			var currentPermission = 0;
			//console.log("permission_id: "+permission_id);
			for(permissionBit in selectedPermissions[permission_id]){
				//console.log(ind);
				currentPermission = currentPermission | permissionBit;
			};

			//console.log(currentPermission);
		};
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