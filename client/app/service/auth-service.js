angular.module('dgs').factory('authService',function($http,session) {

	var authService = {};

	//authService.API_URL = 'http://localhost:8080/api';
	authService.API_URL = 'http://localhost:3000';

	authService.login = function(credentials){
		return $http
				.post(authService.API_URL+'/session',credentials)
				.then(function(res){
					session.create(res.data.user.id,res.data.user,res.data.authentication_key);
					return res;
				});
	};

	authService.register = function(credentials){
	//console.log("about to register"+credentials.email);
	return $http
      .post(authService.API_URL+'/users', credentials)
      .then(function (res) {
        
		console.log(res);
		session.create(res.data.user.id,res.data.user,res.data.authentication_key);
        return res;
		});
  	};

  	authService.logout = function(){
  		session.destroy();
  	}

  	authService.currentUser = function(){
  		return session.currentUser();
  	};

  	authService.authToken = function(){
  		return session.authToken();
  	};

	authService.isAuthenticated = function(){
		return session.hasUserId();
	};

	authService.isAuthorized = function(authorizedRoles){
		/*if(!angular.isArray(authorizedRoles)){
			authorizedRoles = [authorizedRoles];
		}

		return (authService.isAuthenticated() && authorizedRoles.indexOf(session.userRole) !== -1);
		*/
		return authService.isAuthenticated();
	};

	return authService;

});