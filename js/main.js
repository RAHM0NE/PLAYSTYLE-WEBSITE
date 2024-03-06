(function() {
  'use strict';

  var ViewModel = function() {
    var self = this; // Store reference to ViewModel instance

    // Observables for user data
    this.user = ko.observable(null);
    this.followersCount = ko.observable(null);
    this.artists = ko.observableArray([]);
    this.audioFeatures = ko.observable(null); // Observable to store audio features
    this.topGenre = ko.observable(null);
    this.isLoggedIn = ko.observable(false);
    this.loginErrorMessage = ko.observable(null);

    // Function to fetch audio features for the user's top tracks
    this.getAudioFeatures = function(token) {
      fetch('https://api.spotify.com/v1/me/top/tracks?limit=10', {
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
      .then(function(data) {
        var trackIds = data.items.map(function(item) {
          return item.id;
        });
        return fetch('https://api.spotify.com/v1/audio-features/?ids=' + trackIds.join(','), {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + token
          }
        });
      })
      .then(function(response) {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(function(audioFeatures) {
        self.audioFeatures(audioFeatures.audio_features);
        console.log(audioFeatures);

        // Once audio features are fetched, determine the top genre
        self.determineTopGenre(audioFeatures.audio_features);
      })
      .catch(function(error) {
        console.error('Error fetching audio features:', error);
      });
    };

    // Function to determine the top genre from the audio features
    this.determineTopGenre = function(audioFeatures) {
      var genres = [];
      audioFeatures.forEach(function(feature) {
        genres = genres.concat(feature.genre); // Assuming genre is available in the audio features
      });
      var genreCounts = {};
      genres.forEach(function(genre) {
        genreCounts[genre] = (genreCounts[genre] || 0) + 1;
      });
      var topGenre = Object.keys(genreCounts).reduce(function(a, b) {
        return genreCounts[a] > genreCounts[b] ? a : b;
      });
      self.topGenre(topGenre);
    };

    // Define login and logout functions
    this.login = function() {
      self.loginErrorMessage(null);
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
      self.isLoggedIn(false);
      // Redirect to index.html
      window.location.href = 'index.html';
    };

    // Error handling for login
    this.loginError = function(errorCode) {
      switch (errorCode) {
        case 'access_denied':
          self.loginErrorMessage('You need to grant access in order to use this website.');
          break;
        default:
          self.loginErrorMessage('There was an error trying to obtain authorization. Please, try it again later.');
      }
    };
  };

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

        // Fetch top 5 artists
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

          // Fetch audio features
          viewModel.getAudioFeatures(token);
        })
        .catch(error => {
          console.error('Error fetching top artists:', error);
        });
      });
    });
  }

  // Initialize ViewModel and apply bindings
  var viewModel = new ViewModel();
  ko.applyBindings(viewModel);

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

document.addEventListener("DOMContentLoaded", function() {
  var aboutButton = document.getElementById("about-btn");
  var overlay = document.getElementById("overlay");
  var imageContainer = document.getElementById("about-image-container");

  console.log(overlay);
  console.log(imageContainer);

  aboutButton.addEventListener("click", function() {
    overlay.style.display = "block";
    imageContainer.style.display = "flex";
  });

  overlay.addEventListener("click", function() {
    overlay.style.display = "none";
    imageContainer.style.display = "none";
  });
});

document.addEventListener("DOMContentLoaded", function() {
  var aboutButton = document.getElementById("about-btn");
  var overlay = document.getElementById("overlay");
  var imageContainer = document.getElementById("about-image-container");
  var backButton = document.getElementById("back-btn");
  var buttonSound = document.getElementById("button-sound");

  // Event listener for opening the image container
  aboutButton.addEventListener("click", function() {
    overlay.style.display = "block";
    imageContainer.style.display = "flex";
    buttonSound.play();
  });

  // Event listener for closing the image container
  backButton.addEventListener("click", function() {
    overlay.style.display = "none";
    imageContainer.style.display = "none";
    buttonSound.play();
  });
});



