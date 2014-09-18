angular.module('dgs').factory('roleService',function($resource,authService) {
	return $resource(authService.API_URL+"/roles/:id",{},{
    update: {method: 'PUT'},
    query:  {method:'GET', isArray:false}
  });
});