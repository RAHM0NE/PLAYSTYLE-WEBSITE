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

    // Function to determine the top genre from the audio features
    this.determineTopGenre = function(audioFeatures) {
      var genreCounts = {
        "Pop": 0,
        "Rock": 0,
        "Hip-Hop": 0,
        "Electronic": 0,
        "Jazz": 0,
        "Classical": 0,
        "Other": 0
      };

audioFeatures.forEach(function(feature) {
    // Classify tracks based on audio features
    if (feature.danceability > 0.5 && feature.energy > 0.5) {
        genreCounts["Pop"]++;
    } else if (feature.energy > 0.7) {
        genreCounts["Rock"]++;
    } else if (feature.energy > 0.5 && feature.danceability < 0.5) {
        genreCounts["Hip-Hop"]++;
    } else if (feature.energy < 0.5 && feature.acousticness > 0.7) {
        genreCounts["Classical"]++;
    } else if (feature.energy < 0.5 && feature.instrumentalness > 0.7) {
        genreCounts["Electronic"]++;
    } else if (feature.energy < 0.5 && feature.instrumentalness < 0.7 && feature.acousticness < 0.3) {
        genreCounts["Jazz"]++;
    } else if (feature.danceability > 0.7 && feature.energy > 0.7) {
        genreCounts["Metal"]++;
    } else if (feature.energy > 0.8 && feature.acousticness < 0.2) {
        genreCounts["Punk"]++;
    } else if (feature.danceability > 0.7 && feature.energy > 0.6 && feature.valence > 0.5) {
        genreCounts["Funk"]++;
    } else if (feature.danceability > 0.7 && feature.energy > 0.7 && feature.valence > 0.7) {
        genreCounts["Disco"]++;
    } else if (feature.energy > 0.8 && feature.valence > 0.7) {
        genreCounts["Techno"]++;
    } else if (feature.energy > 0.7 && feature.valence > 0.6) {
        genreCounts["House"]++;
    } else if (feature.energy > 0.5 && feature.valence < 0.5) {
        genreCounts["R&B"]++;
    } else if (feature.energy > 0.6 && feature.valence > 0.6) {
        genreCounts["Reggae"]++;
    } else if (feature.danceability > 0.6 && feature.energy > 0.5 && feature.valence > 0.6) {
        genreCounts["Soul"]++;
    } else if (feature.energy > 0.7 && feature.valence > 0.5) {
        genreCounts["Country"]++;
    } else if (feature.danceability > 0.5 && feature.energy > 0.5 && feature.valence > 0.5) {
        genreCounts["Indie"]++;
    } else if (feature.energy > 0.7 && feature.valence > 0.6) {
        genreCounts["Alternative"]++;
    } else if (feature.energy > 0.7 && feature.valence < 0.4) {
        genreCounts["Gothic"]++;
    } else if (feature.energy > 0.6 && feature.valence < 0.3) {
        genreCounts["Industrial"]++;
    } else if (feature.danceability > 0.5 && feature.valence > 0.5) {
        genreCounts["Dance"]++;
    } else if (feature.danceability > 0.5 && feature.valence < 0.4) {
        genreCounts["Trance"]++;
    } else {
        genreCounts["Other"]++;
    }
});


      // Find the genre with the highest count
      var topGenre = Object.keys(genreCounts).reduce(function(a, b) {
        return genreCounts[a] > genreCounts[b] ? a : b;
      });

      self.topGenre(topGenre);
    };

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
          // Round the audio feature values to the nearest whole number
          audioFeatures.audio_features.forEach(function(feature) {
            feature.acousticness = Math.round(feature.acousticness * 10);
            feature.danceability = Math.round(feature.danceability * 10);
            feature.instrumentalness = Math.round(feature.instrumentalness * 10);
            feature.liveness = Math.round(feature.liveness * 100);
            feature.energy = Math.round(feature.energy * 100);
            feature.tempo = Math.round(feature.tempo);
          });

          self.audioFeatures(audioFeatures.audio_features);

          // Once audio features are fetched, determine the top genre
          self.determineTopGenre(audioFeatures.audio_features);
        })
        .catch(function(error) {
          console.error('Error fetching audio features:', error);
        });
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
        })
        .catch(function(error) {
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


// ABOUT BUTTON BRINGING UP MENU

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


// TRYING TO GET HOVER TO WORK 

document.addEventListener("DOMContentLoaded", function() {
  var acstFeature = document.querySelector("#audio-features-container .feature-name");

  if (acstFeature) {
    acstFeature.addEventListener("mouseover", function() {
      var hoverInfo = document.querySelector(".hover-info .info-line");
      if (hoverInfo) {
        hoverInfo.textContent = "Some other text for hover";
      }
    });

    acstFeature.addEventListener("mouseout", function() {
      var hoverInfo = document.querySelector(".hover-info .info-line");
      if (hoverInfo) {
        hoverInfo.textContent = "FOR MORE INFO!";
      }
    });
  } else {
    console.log("Element not found.");
  }
});



// STAT SELECTOR

document.addEventListener("DOMContentLoaded", function() {
  // Array of image URLs
  var images = [
     "stats/TEMPO.png",
      "stats/ACST.png",
      "stats/DNC.png",
      "stats/INST.png",
      "stats/LIV.png",
      "stats/NRG.png"
      
      
      // Add more image URLs as needed
  ];

  var currentImageIndex = 0;
  var overlayImage = document.getElementById("overlayImage");
  var prevButton = document.getElementById("prevButton");
  var nextButton = document.getElementById("nextButton");


  // Function to update the overlay image
  function updateOverlayImage() {
      overlayImage.src = images[currentImageIndex];
  }

  // Event listener for the previous button
  prevButton.addEventListener("click", function() {
      currentImageIndex = (currentImageIndex === 0) ? images.length - 1 : currentImageIndex - 1;
      updateOverlayImage();
  });

  // Event listener for the next button
  nextButton.addEventListener("click", function() {
      currentImageIndex = (currentImageIndex === images.length - 1) ? 0 : currentImageIndex + 1;
      updateOverlayImage();
  });
});



// STAT SELECTOR SOUND

document.addEventListener("DOMContentLoaded", function() {
  var prevButton = document.getElementById("prevButton");
  var nextButton = document.getElementById("nextButton");
  var buttonSounds = document.getElementById("button-sounds");
  var buttonSoundz = document.getElementById("button-soundz");


  // Event listener for the previous button
  prevButton.addEventListener("click", function() {
    buttonSounds.play(); // Play the button sound
  });

  // Event listener for the next button
  nextButton.addEventListener("click", function() {
    buttonSoundz.play(); // Play the button sound
  });
});


