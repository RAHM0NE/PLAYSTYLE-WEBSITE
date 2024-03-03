(function() {
  'use strict';

  var ViewModel = function() {
    this.isLoggedIn = ko.observable(false);
    this.login = function() {
      var self = this;
      this.loginErrorMessage(null);
      OAuthManager.obtainToken({
        scopes: [
          'user-read-private user-read-email user-top-read'
        ]
      }).then(function(token) {
        onTokenReceived(token);
        // Redirect to account-stats.html after successful login
        window.location.href = 'account-stats.html';
      }).catch(function(error) {
        self.loginError(error);
      });
    };

    this.logout = function() {
      localStorage.removeItem(accessTokenKey);
      this.isLoggedIn(false);
      // Redirect to index.html
      window.location.href = 'index.html';
  };
  

  this.loginError = function(errorCode) {
    switch (errorCode) {
      case 'access_denied':
        this.loginErrorMessage('You need to grant access in order to use this website.');
        break;
      default:
        this.loginErrorMessage('There was an error trying to obtain authorization. Please, try it again later.');
      }
  };

    this.loginErrorMessage = ko.observable(null);

    this.user = ko.observable(null);
    this.followersCount = ko.observable(null); // New observable to store followers count
    this.artists = ko.observableArray([]); // Observable array to store top artists
  };

  var viewModel = new ViewModel();
  ko.applyBindings(viewModel);

  var spotifyApi = new SpotifyWebApi(),
      accessTokenKey = 'sp-access-token';

  function onTokenReceived(token) {
    viewModel.isLoggedIn(true);
    localStorage.setItem(accessTokenKey, token);

    // do something with the token
    spotifyApi.setAccessToken(token);
    spotifyApi.getMe().then(function(data) {
      viewModel.user(data);
      
      // Get the user's followers count
      spotifyApi.getUser(data.id).then(function(user) {
        viewModel.followersCount(user.followers.total);
      });

      // Fetch top 5 artists
      // Inside the function onTokenReceived(token) after fetching user details
fetch('https://api.spotify.com/v1/me/top/artists?limit=5', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer ' + token
  }
})
.then(response => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
})
.then(data => {
  var artists = data.items;
  console.log(artists);
  viewModel.artists(artists);
})
.catch(error => {
  console.error('Error fetching top artists:', error);
});

    });
  }

  /**
   * Uses the stored access token
   */
  function initAccessToken() {
    var storedAccessToken = localStorage.getItem(accessTokenKey);
    if (storedAccessToken) {
      onTokenReceived(storedAccessToken);
    }
  }

  initAccessToken();

})();
