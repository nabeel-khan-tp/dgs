angular.module('dgs').factory('userService',function($resource,authService) {
	return $resource(authService.API_URL+"/users/:id",{},{
    update: {
      method: 'PUT' // this method issues a PUT request
    }
  });
});