angular.module('dgs').factory('roleService',function($resource,authService) {
	return $resource(authService.API_URL+"/roles/:id",{},{
    update: {
      method: 'PUT' // this method issues a PUT request
    }
  });
});