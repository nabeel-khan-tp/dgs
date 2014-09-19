angular.module('dgs').controller('DevicesCtrl',function($scope,$state,deviceService,locationService,$http){

  $scope.showIndex = true;
  $scope.currentDevice = {user_id:"",location_id:"",device_name:"",space_available:"",total_space_allocated:"",status:"",uptime:""};
  $scope.page = {current:1,total_items:20,items_per_page:2};
  $scope.isEditing = false;

  deviceService.query(function(data){
    
    console.log(data.count);
    $scope.devices = data.devices;
    $scope.page.total_items = data.count;//$scope.devices.length;
  });

  $scope.pageChanged = function(page){
      deviceService.query({page:page},function(data){
      $scope.devices = data.devices;
    });
  }

  locationService.query({per_page:100},function(data){
    $scope.locations = data.locations;
    //$scope.page.total_items = $scope.locations.length;
  });

  $scope.newDeviceForm = function(){
    $scope.showIndex = false;
    //$state.go("home.devices.new");
  };

  $scope.createDevice = function(device){
    //console.log(device);
    $scope.showIndex = true;
    $scope.isEditing = false;
    device.user_id = $scope.currentUser.id;
    deviceService.save(device,function(res){
      console.log("success");
      console.log(res);
    },function(res){
      console.log("error");
      console.log(res);
    });
    $scope.devices.push(device);
  };
  $scope.updateDevice = function(device){
    deviceService.update({id:device.id},device);
    $scope.showIndex = true;
    $scope.isEditing = false;
  };

  $scope.editDeviceForm = function(device){
    $scope.showIndex = false;
    $scope.isEditing = true;
    $scope.currentDevice = device;
    //$state.go();  
  };

  $scope.cancelDeviceForm = function(){
    $scope.showIndex = true;
    $scope.newdevice = {user_id:"",location_id:"",device_name:"",space_available:"",total_space_allocated:"",status:"",uptime:""};
  };

  $scope.submitForm = function() {
  };
  
});