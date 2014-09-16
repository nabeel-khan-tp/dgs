angular.module('dgs').factory('session',function($cookieStore) {

	var session = {};

	session.create = function(userId,token){
		console.log("Creating session for "+userId+":"+token);
		$cookieStore.put('userId',userId);
		$cookieStore.put('token',token);
		this.userId = userId;
		this.token = token;
		//this.userRole = userRole;
	};

	session.hasUserId = function(){
		if(typeof(this.userId)!='undefined' && this.userId)
			return this.userId;
		else
		{
			this.userId = $cookieStore.get("userId");
			//this.userRole = $cookieStore.get("userRole");
			this.token = $cookieStore.get("token");

			if(this.userId)
			{
				console.log("Reading user_id from cookies and found it");
				return true;
			}
			else
				return false;
		} 
	};

	session.destroy = function(){
		$cookieStore.remove("userId");
		$cookieStore.remove("token");
		//$cookieStore.remove("userRole");
		this.userId = null;
		this.token = null;
		//this.userRole = null;
	};
	return session;
});