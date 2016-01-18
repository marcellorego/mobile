angular.module('starter.controllers', ['ngCordova', 'ngCordovaOauth'])


.controller('SigninCtrl', function($scope, $state) {

  $scope.data = {};

  $scope.submitForm = function(formValid) {
      
      if (formValid && $scope.data.username == 'test')
        $state.go('home');
  }
  
})

.controller('HomeCtrl', function($scope, $state, $cordovaOauth) {

  $scope.doSignout = function() {
    $state.go('signin');
  };
    
    
  $scope.googleLogin = function() {
        $cordovaOauth.google("423127397517-eg1f0drjei8bkhcp6jhkfacu475tbcen.apps.googleusercontent.com", ["https://www.googleapis.com/auth/urlshortener", "https://www.googleapis.com/auth/userinfo.email"]).then(function(result) {
            console.log(JSON.stringify(result));
        }, function(error) {
            console.log(error);
        });
    }
})

;