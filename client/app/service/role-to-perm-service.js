angular.module('dgs').factory('roleToPermService',function($resource,authService) {
	return $resource(authService.API_URL+"/roles_to_permissions/:id",{},{
    	update: {method: 'PUT'},
    	query:  {method:'GET', isArray:false}
  	});
});