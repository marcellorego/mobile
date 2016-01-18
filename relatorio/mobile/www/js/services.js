/*.factory('GSession', function ($resource) {
    return $resource('http://localhost:5000/sessions/:sessionId');
})
;*/


/*Here is your client ID
423127397517-eg1f0drjei8bkhcp6jhkfacu475tbcen.apps.googleusercontent.com
Here is your client secret
pKa8--k974kjkz_ZBrlRDU5F*/

angular.module('starter.services', [])

.service('googleService', ['$http', '$rootScope', '$q', function ($http, $rootScope, $q) {
    
    var Google = {
        urlAuth: 'https://accounts.google.com/o/oauth2/auth',
        urlToken: 'https://accounts.google.com/o/oauth2/token',
        client_id: '423127397517-eg1f0drjei8bkhcp6jhkfacu475tbcen.apps.googleusercontent.com',
        redirect_uri: 'http://localhost/oauth2callback',
        scope: 'email',
        response_type: 'code'
    };
    
    var url = Google.urlAuth+'?client_id='+ Google.client_id + '&response_type=code' +'&redirect_uri=' + Google.redirect_uri + '&scope=' + Google.scope;
    
    var browser = $window.open(url, '_blank', 'location=no,toolbar=no');
    
    browser.addEventListener('loadstart', function(e) {
      var url = e.url;
      var code = /\?code=(.+)$/.exec(url);
      var error = /\?error=(.+)$/.exec(url);
      if (code || error) {
        browser.close();
      }
        
      if (code) {
          $http.post(Google.urlToken, {
            code: code[1],
            client_id: options.client_id,
            client_secret: options.client_secret,
            redirect_uri: options.redirect_uri,
            grant_type: 'authorization_code'
          }).done(function(data) {
            deferred.resolve(data);
          }).fail(function(response) {
            deferred.reject(response.responseJSON);
          });
        } else if (error) {
          deferred.reject({
            error: error[1]
          });
        }
    }
    
                             
    
                             
    /*var clientId = '{CLIENT_ID}',
        apiKey = '{API_KEY}',
        scopes = '{SCOPES}',
        domain = '{OPTIONAL DOMAIN}',
        deferred = $q.defer();

    this.login = function () {
        gapi.auth.authorize({ 
            client_id: clientId, 
            scope: scopes, 
            immediate: false, 
            hd: domain 
        }, this.handleAuthResult);

        return deferred.promise;
    }

    this.handleClientLoad = function () {
        gapi.client.setApiKey(apiKey);
        gapi.auth.init(function () { });
        window.setTimeout(checkAuth, 1);
    };

    this.checkAuth = function() {
        gapi.auth.authorize({ 
            client_id: clientId, 
            scope: scopes, 
            immediate: true, 
            hd: domain 
        }, this.handleAuthResult);
    };

    this.handleAuthResult = function(authResult) {
        if (authResult && !authResult.error) {
            var data = {};
            gapi.client.load('oauth2', 'v2', function () {
                var request = gapi.client.oauth2.userinfo.get();
                request.execute(function (resp) {
                    data.email = resp.email;
                });
            });
            deferred.resolve(data);
        } else {
            deferred.reject('error');
        }
    };

    this.handleAuthClick = function(event) {
        gapi.auth.authorize({ 
            client_id: clientId, 
            scope: scopes, 
            immediate: false, 
            hd: domain 
        }, this.handleAuthResult);
        return false;
    };*/

}]);