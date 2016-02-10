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
     
  /*$scope.channels = [{
        "kind": "youtube#searchResult",
        "etag": "DsOZ7qVJA4mxdTxZeNzis6uE6ck/wk1ocl7LFrM890YRyJv18RViDUE",
        "id": {
            "kind": "youtube#channel",
            "channelId": "UC48mLXk1ASg1EQbaS3MheWQ"
        },
        "snippet": {
            "publishedAt": "2009-05-15T01:08:43.000Z",
            "channelId": "UC48mLXk1ASg1EQbaS3MheWQ",
            "title": "Valor Econômico",
            "description": "A mais completa cobertura de economia, negócios e finanças na internet. Valor Econômico: notícias que geram negócios.",
            "thumbnails": {
                "default": {
                    "url": "https://yt3.ggpht.com/-u-eEYfIV3L8/AAAAAAAAAAI/AAAAAAAAAAA/p8PL-ne5C_o/s512-c-k-no/photo.jpg"
                },
                "medium": {
                    "url": "https://yt3.ggpht.com/-u-eEYfIV3L8/AAAAAAAAAAI/AAAAAAAAAAA/p8PL-ne5C_o/s512-c-k-no/photo.jpg"
                },
                "high": {
                    "url": "https://yt3.ggpht.com/-u-eEYfIV3L8/AAAAAAAAAAI/AAAAAAAAAAA/p8PL-ne5C_o/s512-c-k-no/photo.jpg"
                }
            },
            "channelTitle": "valoreconomico",
            "liveBroadcastContent": "none"
        }
    }
  ];*/
  
  
    $scope.doClear = function() {
        $scope.searchInput = '';
        $scope.nextPageToken = undefined;
        $scope.previousToken = undefined;
    };
    
    $scope.doSearch = function() {
        var query = $scope.searchInput;
        $scope.doClear();
        performSearch(query);
    };

    $scope.doPreviousPage = function() {
        performSearch($scope.searchInput, $scope.previousToken);
    }
    
    $scope.doNextPage = function() {
        performSearch($scope.searchInput, $scope.nextPageToken);
    }

    $scope.doClear();
    $scope.channels = [];
}])
;