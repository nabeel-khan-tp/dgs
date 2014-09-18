angular.module('dgs').factory('permissionsService',function($resource,authService) {
	return $resource(authService.API_URL+"/permissions/:id",{},{
    update: {method: 'PUT'},
    query:  {method:'GET', isArray:false}
  });
});