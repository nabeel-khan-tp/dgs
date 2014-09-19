angular.module('dgs').factory('authService',function($http,session) {

	var authService = {};

	//authService.API_URL = 'http://localhost:8080/api';
	//authService.API_URL = 'http://localhost:3000';
	authService.API_URL = 'http://safe-reef-1442.herokuapp.com';

	authService.login = function(credentials){
		return $http
				.post(authService.API_URL+'/session',credentials)
				.then(function(res){
					
					//console.log("login status: "+res.status);
					//console.log(res);

					session.create(res.data.user.id,res.data.user,res.data.auth_key.access_token);
					return res;
				},function(res){
					//console.log("*login status: "+res.status);
					return res;
				});
	};

	authService.register = function(credentials){
	//console.log("about to register"+credentials.email);
	return $http
      .post(authService.API_URL+'/users', credentials)
      .then(function (res) {
        
		//console.log(res);
		session.create(res.data.user.id,res.data.user,res.data.auth_key.access_token);
        return res;
		});
  	};

  	authService.logout = function(){
  		session.destroy();
  	};

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

	authService.hasPermissions = function(permission_name,rights){
		permission_name = typeof permission_name !== 'undefined'?permission_name:'';
		rights = typeof rights !== 'undefined'? rights:1;
		rights = parseInt(rights);

		var currentUser = session.currentUser();
		if(currentUser)
		{
			for(x in currentUser.role.permissions){
				if(currentUser.role.permissions[x].name==permission_name)
				{
					console.log("found permissions for "+permission_name+" against "+currentUser.role.permissions[x].name+" - with_rights:"+rights);
					if((currentUser.role.permissions[x].rights & rights) == rights){
						return true;
					}else{
						return false;
					}
					//rights checking here
					//return true;
				}
			}
		}

		return false;
	};

	return authService;

});