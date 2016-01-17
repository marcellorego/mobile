angular.module('starter.controllers', [])


.controller('WelcomeCtrl', function($scope, $state) {

  $scope.goSignin = function() {
    $state.go('signin');
  };
    
  $scope.goSignup = function() {
    $state.go('signup');
  };
  
})

.controller('SigninCtrl', function($scope) {

  $scope.data = {};
    
  $scope.doSignin = function() {
      
  }
  
})

.controller('SignupCtrl', function($scope) {

  $scope.doSignin = function() {
    
  }
  
})

;