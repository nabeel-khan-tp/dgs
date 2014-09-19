angular.module('dgs').controller('RolesCtrl',function($scope,$state,roleService,permissionsService,roleToPermService,$http){

	$scope.showIndex = false;
	$scope.currentRole = {name:""};
	$scope.page = {current:1,total_items:0,items_per_page:10};
	$scope.isEditing = false;
	$scope.isRoleForm = false;
	$scope.isPermissionsForm = false;
	$scope.selectedPermissions = [];
	$scope.currentSelectedRoleId = 0;

	
	$scope.loadRoles = function(){
		roleService.query(function(data){
			console.log("roles are being loaded now");
			console.log(data.roles);
			$scope.roles = data.roles;
			$scope.page.total_items = data.count;
			$scope.showIndex = true;
		});
	};

	$scope.loadRoles();

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
	
		//console.log("showPermissionsFor: "+role.id);
		//console.log(role.roles_to_permissions);
		if(role.roles_to_permissions.length>0)
		{
			for(x in role.roles_to_permissions)
			{
				var permission_id = role.roles_to_permissions[x].permission.id;
				var rights = parseInt(role.roles_to_permissions[x].rights);
				$scope.selectedPermissions[permission_id] = {};
				
				//console.log("P:"+permission_id + " - r:" +rights + " & 1 = "+ (rights & 1));
				if((rights & 1) == 1){
					$scope.selectedPermissions[permission_id][1] = true;
				}
				if((rights & 2) == 2){
					$scope.selectedPermissions[permission_id][2] = true;
				}
				if((rights & 4) == 4){
					$scope.selectedPermissions[permission_id][4] = true;
				}

			}
		}
		/*$scope.selectedPermissions[1] = {};
		$scope.selectedPermissions[1][1] = true;
		$scope.selectedPermissions[1][2] = true;
		*/
	};

	$scope.goBack = function(){
		$scope.currentSelectedRoleId = 0;
		$scope.isPermissionsForm = false;
		$scope.showIndex = true;
		$scope.selectedPermissions = {};
	};

	$scope.savePermissions = function(){
		//console.log(selectedPermissions);
		var selectedPermissions=$scope.selectedPermissions;
		roleToPermService.delete({role_id:$scope.currentSelectedRoleId},
			function(res){
				//console.log("deleted record");
				//console.log(res);
			
				for(permission_id in selectedPermissions){
					var rights = 0;
					
					for(permissionBit in selectedPermissions[permission_id]){
						//console.log(ind);
						if(selectedPermissions[permission_id][permissionBit]===true)
						{
							rights = rights | permissionBit;
							//console.log("Assigning: p:"+permission_id+" - r:"+rights)
						}
					};

					if(rights>0)
					{
						roleToPermService.save({role_id:$scope.currentSelectedRoleId,
												permission_id:permission_id,
												rights:rights},function(res){

													$scope.loadRoles();
													$scope.goBack();
												});
					}
				};
				//$scope.roles.
				//$scope.roles=[];
				//$scope.loadRoles();
				//$scope.goBack();

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