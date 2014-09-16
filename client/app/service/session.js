angular.module('dgs').factory('session',function($cookieStore) {

	var session = {};

	session.create = function(userId,userRole){
		console.log("Creating session for "+userId+":"+userRole);
		$cookieStore.put('userId',userId);
		$cookieStore.put('userRole',userRole);
		this.userId = userId;
		this.userRole = userRole;
	};

	session.hasUserId = function(){
		if(typeof(this.userId)!='undefined' && this.userId)
			return this.userId;
		else
		{
			this.userId = $cookieStore.get("userId");
			this.userRole = $cookieStore.get("userRole");

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
		$cookieStore.remove("userRole");
		this.userId = null;
		this.userRole = null;
	};
	return session;
});