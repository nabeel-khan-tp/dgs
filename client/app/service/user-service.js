angular.module('dgs').factory('userService',function($resource,authService) {
	return $resource(authService.API_URL+"/users/:id",{},{
    update: {method: 'PUT'},
    query:  {method:'GET', isArray:false}
  });
});