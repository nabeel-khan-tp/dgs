angular.module('dgs').factory('authService',function($http,session) {

	var authService = {};

	//authService.API_URL = 'http://localhost:8080/api';
	authService.API_URL = 'http://localhost:3000';

	authService.login = function(credentials){
		return $http
				.post(authService.API_URL+'/login',credentials)
				.then(function(res){
					//if()
					//console.log(res);
					/*var user = Object();
					user.user_id=1;
					user.email=res.email;
					return user;*/
					session.create(res.data.user.user_id,res.data.user.role);
					return res;
					//session.create(res.user.id,res.user.role);
					//return res.data.user;
				});
		//return {user_id:2};
	};

	authService.register = function(credentials){
	//console.log("about to register"+credentials.email);
	return $http
      .post(authService.API_URL+'/users', credentials)
      .then(function (res) {
        session.create(res.data.user_id,res.data.role);
        /*Session.create(res.data.id, res.data.user.id,
                       res.data.user.role);
        return res.data.user;*/
        //console.log(res);
        return res.data.user_id;
		});
  	};

  	authService.logout = function(){
  		session.destroy();
  	}


	authService.isAuthenticated = function(){
		return session.hasUserId();
	};

	authService.isAuthorized = function(authorizedRoles){
		if(!angular.isArray(authorizedRoles)){
			authorizedRoles = [authorizedRoles];
		}

		return (authService.isAuthenticated() && authorizedRoles.indexOf(session.userRole) !== -1);
		
		//return authService.isAuthenticated();
	};

	return authService;

});