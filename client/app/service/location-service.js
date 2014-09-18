angular.module('dgs').factory('locationService',function($resource,authService) {
  return $resource(authService.API_URL+"/locations/:id",{page:1},{
    update: {method: 'PUT'},
    query:  {method:'GET', isArray:false}
  });
});