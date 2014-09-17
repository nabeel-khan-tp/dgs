angular.module('dgs', ['ui.bootstrap','ui.utils','ui.router','ngAnimate','ngCookies','ngResource']);

angular.module('dgs').constant('AUTH_EVENTS', {
  loginSuccess: 'auth-login-success',
  loginFailed: 'auth-login-failed',
  logoutSuccess: 'auth-logout-success',
  sessionTimeout: 'auth-session-timeout',
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
}).constant('USER_ROLES', {
  all: '*',
  admin: 'admin',
  editor: 'editor',
  guest: 'guest'
});

angular.module('dgs').config(function($stateProvider, $urlRouterProvider,$httpProvider,USER_ROLES) {

    //delete $httpProvider.defaults.headers.common['X-Requested-With'];
    //$httpProvider.defaults.useXDomain = true

    $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'app/controllers/home/home.html'
        /*data:{
          authorizedRoles:[USER_ROLES.admin,USER_ROLES.editor]
        }*/
    });
    $stateProvider.state('home.users', {
        url: '/users',
        templateUrl: 'app/controllers/users/users.html'
    });
    $stateProvider.state('home.users.new', {
        url: '/new',
        templateUrl: 'app/controllers/users/new/user-new.html'
    });

    $stateProvider.state('register', {
        url: '/register',
        templateUrl: 'app/controllers/register/register.html',
        isPublic:true
    });
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'app/controllers/login/login.html',
        isPublic:true
    });
    /* Add New States Above */
    $urlRouterProvider.otherwise('/home');

});

angular.module('dgs').controller('applicationController', function ($scope,$rootScope,$state,$cookieStore,
                                               USER_ROLES,AUTH_EVENTS,
                                               authService) {
  
    /*$cookieStore.remove("userId");
    $cookieStore.remove("token");
    $cookieStore.remove("user");
*/
  $scope.currentUser = authService.currentUser();
  $rootScope.authToken = authService.authToken();
  $scope.userRoles = USER_ROLES;
  $scope.isAuthorized = authService.isAuthorized();
  $scope.isAuthenticated = authService.isAuthenticated();

  $scope.setCurrentUser = function (user) {
    $scope.currentUser = user;
  };

  $scope.setAuthToken = function(token){
    $scope.authToken = token;
  };

  $scope.logout = function(){
    $scope.isAuthorized = false;
    $scope.isAuthenticated = false;
    authService.logout();
    $state.go("login");
  };

  $rootScope.$on(AUTH_EVENTS.loginSuccess,function(){
    $scope.isAuthorized = authService.isAuthorized();
    $scope.isAuthenticated = authService.isAuthenticated();
    console.log("Login successful event fired");
    //alert("event triggered");
  });
})

angular.module('dgs').run(function($rootScope) {

    $rootScope.safeApply = function(fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

});

angular.module('dgs').run(function ($rootScope,$injector, AUTH_EVENTS, authService,$state,USER_ROLES) {
  
  $injector.get("$http").defaults.transformRequest = function(data, headersGetter) {
        console.log("sending token with http" + $rootScope.authToken);
            
        if ($rootScope.authToken) 
        {
            console.log("sending token with http" + $rootScope.authToken);
            headersGetter()['Authorization'] = $rootScope.authToken;
        }
        if (data) {
            return angular.toJson(data);
        }
    };

  $rootScope.$on('$stateChangeStart', function (event, next) {
    
    /*var authorizedRoles = null;

    if (typeof(next.data) !== 'undefined' && typeof(next.data.authorizedRoles) !== 'undefined')
    {
      authorizedRoles = next.data.authorizedRoles;
    }
    else
      return;

    if (!authService.isAuthorized(authorizedRoles)) {
      event.preventDefault();
      if (authService.isAuthenticated()) {
        // user is not allowed
        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
        console.log("Not allowed to view this page "+next.url);
      } else {
        // user is not logged in
        $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
        console.log("User not logged in so show him the login page");
        $state.go("login");
      }
    }*/

    if(typeof(next.isPublic)!=='undefined' && next.isPublic==true)
      return;

    if (!authService.isAuthenticated()) {
      event.preventDefault();
      // user is not logged in
      $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
      console.log("User not logged in so show him the login page");
      $state.go("login");
    }


  });
});