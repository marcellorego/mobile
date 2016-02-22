angular.module('starter.controllers', ['ngCordova', 'ngCordovaOauth', 'starter.services'])


.controller('SigninCtrl', function($scope, $state) {

  $scope.data = {};

  $scope.submitForm = function(formValid) {
      
      if (formValid && $scope.data.username == 'test')
        $state.go('home');
  }
  
})

.controller('HomeCtrl', function($scope, $state, $cordovaOauth) {

  $scope.channels = [{
        name: "CHANNEL 1"  
      }, {
        name: "CHANNEL 2"  
      }
  ];
  
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

.controller('SearchChannelCtrl', ['$scope', '$state', 'YoutubeService', function($scope, $state, YoutubeService) {
    
    var performSearch = function(searchInput, pageToken) {
        
        YoutubeService.listChannels(searchInput, pageToken)
        .then(function(data) {
            $scope.channels = data.items;
            $scope.prevPageToken = data.prevPageToken;
            $scope.nextPageToken = data.nextPageToken;
        });
    };
    
    var performToggleChannel = function(channel) {
        
        var currentChannel = channel;
        YoutubeService.toggleChannel(channel.id.channelId, channel.checked)
        .then(function(data) {
            currentChannel.checked = data.checked;
        });
    };

    $scope.doClearSearch = function() {
        $scope.searchInput = '';
        $scope.nextPageToken = undefined;
        $scope.prevPageToken = undefined;
    };
    
    $scope.doSearch = function() {
        var query = $scope.searchInput;
        performSearch(query);
    };

    $scope.doPreviousPage = function() {
        performSearch($scope.searchInput, $scope.prevPageToken);
    }
    
    $scope.doNextPage = function() {
        performSearch($scope.searchInput, $scope.nextPageToken);
    };

    $scope.toggleChannel = function(channel) {
        performToggleChannel(channel);    
    };

    $scope.doClearSearch();
    $scope.channels = [];
}])
;