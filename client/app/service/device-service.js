angular.module('dgs').factory('deviceService',function($resource,authService) {
  return $resource(authService.API_URL+"/devices/:id",{},{
    update: {method: 'PUT'},
    query:  {method:'GET', isArray:false}
  });
});