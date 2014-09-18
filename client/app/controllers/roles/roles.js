angular.module('dgs').controller('RolesCtrl',function($scope,$state,roleService,permissionsService,roleToPermService,$http){

	$scope.showIndex = true;
	$scope.currentRole = {name:""};
	$scope.page = {current:1,total_items:0,items_per_page:10};
	$scope.isEditing = false;
	$scope.isRoleForm = false;
	$scope.isPermissionsForm = false;
	$scope.selectedPermissions = [];
	$scope.currentSelectedRoleId = 0;

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
		$scope.currentSelectedRoleId = role.id;
	
		$scope.selectedPermissions[1] = {};
		$scope.selectedPermissions[1][1] = true;
		$scope.selectedPermissions[1][2] = true;

	};

	$scope.goBack = function(){
		$scope.currentSelectedRoleId = 0;
		$scope.isPermissionsForm = false;
		$scope.showIndex = true;
		$scope.selectedPermissions = {};
	};

	$scope.savePermissions = function(selectedPermissions){
		//console.log(selectedPermissions);
		roleToPermService.delete({role_id:$scope.currentSelectedRoleId},
			function(res){
				//console.log("deleted record");
				//console.log(res);
			
				for(permission_id in selectedPermissions){
					var rights = 0;
					//console.log("permission_id: "+permission_id);
					for(permissionBit in selectedPermissions[permission_id]){
						//console.log(ind);
						rights = rights | permissionBit;
					};

					
					roleToPermService.save({role_id:$scope.currentSelectedRoleId,
												permission_id:permission_id,
												rights:rights},function(res){
													//console.log(res);
													//console.log("saving rtop");
												});
					//roleToPermService.save();
					//console.log(currentPermission);
				};
			});
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