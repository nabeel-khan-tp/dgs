angular.module('dgs').controller('LocationsCtrl',function($scope,$state,locationService,$http){

  $scope.showIndex = true;
  $scope.currentLocation = {name:"",lat:"",lng:""};
  $scope.page = {current:1,total_items:20,items_per_page:2};
  $scope.isEditing = false;

  locationService.query(function(data){
    $scope.locations = data;
    $scope.page.total_items = $scope.locations.length;
  });

  $scope.newLocationForm = function(){
    $scope.showIndex = false;
    //$state.go("home.locations.new");
  };

  $scope.createLocation = function(location){
    //console.log(location);
    $scope.showIndex = true;
    $scope.isEditing = false;
    locationService.save(location,function(res){
      console.log("success");
      console.log(res);
    },function(res){
      console.log("error");
      console.log(res);
    });
    $scope.locations.push(location);
  };
  $scope.updateLocation = function(location){
    locationService.update({id:location.id},location);
    $scope.showIndex = true;
    $scope.isEditing = false;
  };

  $scope.editLocationForm = function(location){
    $scope.showIndex = false;
    $scope.isEditing = true;
    $scope.currentLocation = location;
    //$state.go();  
  };

  $scope.cancelLocationForm = function(){
    $scope.showIndex = true;
    $scope.newlocation = {name:"",lat:"",lng:""};
  };

});