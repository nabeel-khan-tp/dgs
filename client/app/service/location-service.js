angular.module('dgs').factory('locationService',function($resource,authService) {
  return $resource(authService.API_URL+"/locations/:id",{},{
    update: {
      method: 'PUT' // this method issues a PUT request
    }
  });
});