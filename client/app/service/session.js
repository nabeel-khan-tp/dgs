angular.module('dgs').factory('session',function($cookieStore) {

	var session = {};
	session.token = null;
	session.user = null;
	session.userId = null;

	session.create = function(userId,user,token){
		console.log("Creating session for "+userId+":"+token);
		$cookieStore.put('userId',userId);
		$cookieStore.put('user',user);
		$cookieStore.put('token',token);
		this.userId = userId;
		this.user = user;
		this.token = token;
		//this.userRole = userRole;
	};

	session.hasUserId = function(){
		if(typeof(this.userId)!=='undefined' && this.userId){
			return this.userId;
		}
		else
		{
			
			if(typeof($cookieStore.get("userId"))!=='undefined')
			{
				this.userId = $cookieStore.get("userId");
			}
			
			if(typeof($cookieStore.get("user"))!=='undefined'){
				this.user = $cookieStore.get("user");
			}
			
			//this.userRole = $cookieStore.get("userRole");
			if(typeof($cookieStore.get("token"))!=='undefined')
			{
				console.log("found token thus setting: "+$cookieStore.get("token"));
				this.token = $cookieStore.get("token");
			}

			if(this.userId)
			{
				console.log("Reading user_id from cookies and found it");
				return true;
			}
			else{
				return false;
			}
			
		}
	};

	session.currentUser = function(){
		if(this.hasUserId()){
			return this.user;
		}
		else{
			return false;
		}
	};

	session.authToken = function(){
		if(this.hasUserId()){
			return this.token;
		}
		else{
			return '';
		}
	};

	session.destroy = function(){
		$cookieStore.remove("userId");
		$cookieStore.remove("token");
		$cookieStore.remove("user");
		//$cookieStore.remove("userRole");
		this.userId = null;
		this.user = null;
		this.token = null;
		//this.userRole = null;
	};
	return session;
});