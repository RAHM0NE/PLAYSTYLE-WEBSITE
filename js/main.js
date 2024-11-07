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
        "???": 0,
        "Metal": 0,
        "Punk": 0,
        "Disco": 0,
        "Techno": 0,
        "House": 0,
        "R&B": 0,
        "Reggae": 0,
        "Soul": 0,
        "Country": 0,
        "Indie": 0,
        "R&B": 0,
        "Dance": 0,
      };

      audioFeatures.forEach(function(feature) {
        // Classify tracks based on audio features
        if (feature.danceability > 0.7 && feature.energy > 0.6 && feature.valence > 0.5 && feature.acousticness < 0.4) {
            genreCounts["Pop"]++;
        } else if (feature.danceability > 0.5 && feature.energy > 0.7 && feature.valence > 0.6 && feature.acousticness < 0.3) {
            genreCounts["Rock"]++;
        } else if (feature.danceability > 0.6 && feature.energy > 0.7 && feature.valence > 0.5 && feature.acousticness < 0.4) {
            genreCounts["Hip-Hop"]++;
        } else if (feature.danceability < 0.4 && feature.energy < 0.3 && feature.valence < 0.3 && feature.acousticness > 0.7 && feature.instrumentalness > 0.5) {
            genreCounts["Jazz"]++;
        } else if (feature.danceability > 0.7 && feature.energy > 0.7 && feature.valence > 0.5 && feature.acousticness < 0.2 && feature.instrumentalness < 0.5) {
            genreCounts["Metal"]++;
        } else if (feature.danceability > 0.7 && feature.energy > 0.7 && feature.valence > 0.5 && feature.acousticness < 0.3) {
            genreCounts["Punk"]++;
        } else if (feature.danceability > 0.7 && feature.energy > 0.7 && feature.valence > 0.6 && feature.acousticness < 0.3) {
            genreCounts["Disco"]++;
        } else if (feature.danceability > 0.5 && feature.energy > 0.5 && feature.valence > 0.5 && feature.acousticness < 0.4) {
            genreCounts["R&B"]++;
        } else if (feature.danceability > 0.6 && feature.energy > 0.6 && feature.valence > 0.5 && feature.acousticness < 0.4) {
            genreCounts["Soul"]++;
        } else if (feature.danceability < 0.3 && feature.energy > 0.7 && feature.valence < 0.3 && feature.acousticness < 0.3 && feature.instrumentalness < 0.3) {
            genreCounts["Country"]++;
        } else if (feature.danceability > 0.6 && feature.energy > 0.6 && feature.valence > 0.5 && feature.acousticness > 0.4 && feature.instrumentalness < 0.5) {
            genreCounts["Indie"]++;
        } else {
            genreCounts["???"]++;
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
              feature.acousticness = Math.round(feature.acousticness * 100);
              feature.danceability = Math.round(feature.danceability * 100);
              feature.instrumentalness = Math.round(feature.instrumentalness * 100);
              feature.liveness = Math.round(feature.liveness * 100);
              feature.energy = Math.round(feature.energy * 100);
              feature.valence = Math.round(feature.valence * 100);
              feature.tempo = Math.round(feature.tempo);
          });
      
          self.audioFeatures(audioFeatures.audio_features);
      
          // Once audio features are fetched, determine the top genre
          self.determineTopGenre(audioFeatures.audio_features);
      
          // Update weapon image based on audio features
          updateWeaponImage(audioFeatures.audio_features);
      
          // Update character image based on audio features
          updateCharacterImage(audioFeatures.audio_features); // Pass audio features here
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
      // Clear stored access tokens and session information
      localStorage.removeItem(accessTokenKey);
      sessionStorage.removeItem(accessTokenKey);
      
      // Redirect to index.html
      window.location.href = 'index.html';
    };

    // Error handling for login
    this.loginError = function(errorCode) {
      // your existing code for login error handling
    };
  };

  var accessTokenKey = 'sp-access-token';

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


// Function to determine which image to display based on audio features
function determineWeaponImage(audioFeatures) {
  var averageTempo = 0;
  var averageDanceability = 0;
  var averageAcousticness = 0;
  var averageEnergy = 0;

  // Calculate average values for each audio feature
  audioFeatures.forEach(function(feature) {
    averageTempo += feature.tempo;
    averageDanceability += feature.danceability;
    averageAcousticness += feature.acousticness;
    averageEnergy += feature.energy;
  });

  averageTempo /= audioFeatures.length;
  averageDanceability /= audioFeatures.length;
  averageAcousticness /= audioFeatures.length;
  averageEnergy /= audioFeatures.length;

  if (averageTempo >= 120) {
    return "FIRE SWORD"; // Suited to higher tempos
  } else if (averageTempo >= 110 && averageTempo < 120) {
    return "FIRE WAND"; // Suited to less higher tempos
  } else if (averageTempo >= 105 && averageTempo < 110) {
    return "ICE SWORD"; // Suited to less tempos
  } else {
    return "ICE WAND"; // Suited to even slower tempos
  }
}

// Function to update the weapon image
function updateWeaponImage(audioFeatures) {
  var imageContainer = document.getElementById("weapon-image-container");
  var weaponImage = document.getElementById("weaponImage");

  if (imageContainer && weaponImage) { // Check if the elements exist
    var weapon = determineWeaponImage(audioFeatures);
    var imageURL = ""; // Set the image URL based on the weapon

    switch (weapon) {
      case "FIRE SWORD":
        imageURL = "WEAPONS/FIRE SWORD.png";
        break;
      case "FIRE WAND":
        imageURL = "WEAPONS/FIRE WAND.png";
        break;
      case "ICE WAND":
        imageURL = "WEAPONS/ICE WAND.png";
        break;
      case "ICE SWORD":
        imageURL = "WEAPONS/ICE SWORD.png";
        break;
      default:
        imageURL = "WEAPONS/ICE SWORD.png"; // Default image if no weapon matches
        break;
    }

    // Preload the weapon image asynchronously
    var tempImage = new Image();
    tempImage.onload = function() {
      weaponImage.src = imageURL;
      imageContainer.style.display = "block";
    };
    tempImage.onerror = function() {
      console.error("Failed to preload weapon image:", imageURL);
    };
    tempImage.src = imageURL;
  } else {
    console.error("Image container or weapon image not found.");
  }
}

// Function to determine which PLAYSTYLE to display based on audio features
function determineCharacterImage(audioFeatures) {
  var averageTempo = audioFeatures.reduce((acc, curr) => acc + curr.tempo, 0) / audioFeatures.length;
  var averageDanceability = audioFeatures.reduce((acc, curr) => acc + curr.danceability, 0) / audioFeatures.length;
  var averageAcousticness = audioFeatures.reduce((acc, curr) => acc + curr.acousticness, 0) / audioFeatures.length;
  var averageEnergy = audioFeatures.reduce((acc, curr) => acc + curr.energy, 0) / audioFeatures.length;


  // Calculate average values for each audio feature
  audioFeatures.forEach(function(feature) {
      averageTempo += feature.tempo;
      averageDanceability += feature.danceability;
      averageAcousticness += feature.acousticness;
      averageEnergy += feature.energy;
  });

  averageTempo /= audioFeatures.length;
  averageDanceability /= audioFeatures.length;
  averageAcousticness /= audioFeatures.length;
  averageEnergy /= audioFeatures.length;

  if (averageEnergy > 85) {
    return "ROGUE"; // Suited to more upbeat music
  } else if (averageEnergy > 70 && averageEnergy <= 85) {
    return "FIGHTER"; // Suited to moderately upbeat music
  } else if (averageEnergy > 50 && averageEnergy <= 70) {
    return "KNIGHT"; // Suited to moderately chill music
  } else {
    return "MAGE"; // Suited to chill, relaxed, slow music
  }
}



// Function to update the character image
function updateCharacterImage(audioFeatures) {
  var imageContainer = document.getElementById("character-image-container");
  var characterImage = document.getElementById("characterImage");

  if (imageContainer && characterImage) { // Check if the elements exist
    var character = determineCharacterImage(audioFeatures);
    var imageURL = ""; // Set the image URL based on the character

    switch (character) {
      case "FIGHTER":
        imageURL = "PLAYSTYLES/FIGHTER.gif";
        break;
      case "KNIGHT":
        imageURL = "PLAYSTYLES/KNIGHT.gif";
        break;
      case "MAGE":
        imageURL = "PLAYSTYLES/MAGE.gif";
        break;
      case "ROGUE":
        imageURL = "PLAYSTYLES/ROGUE.gif";
        break;
      default:
        imageURL = "PLAYSTYLES/FIGHTER.gif"; // Default image if no character matches
        break;
    }

    // Preload the character image asynchronously
    var tempImage = new Image();
    tempImage.onload = function() {
      characterImage.src = imageURL;
      imageContainer.style.display = "block";
    };
    tempImage.onerror = function() {
      console.error("Failed to preload character image:", imageURL);
    };
    tempImage.src = imageURL;
  } else {
    console.error("Image container or character image not found.");
  }
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

document.addEventListener('DOMContentLoaded', function() {
  var audio = document.getElementById('background-audio');
  
  // Play the audio
  audio.play()
      .then(function() {
          console.log('Audio playback started successfully.');
      })
      .catch(function(error) {
          console.error('Failed to start audio playback:', error);
      });
});

document.addEventListener('DOMContentLoaded', function() {
  var video = document.getElementById('start-video');
  
  // Pause the video when it ends
  video.addEventListener('ended', function() {
      this.pause();
  });
});





document.addEventListener('DOMContentLoaded', function() {
  var video = document.getElementById('background-video');
  var videoContainer = document.getElementById('video-containerz');
  
  video.play()
    .then(function() {
      console.log('Video playback started successfully.');

      
      // Add event listener for video ended
      video.addEventListener('ended', function() {
        console.log('Video playback ended.');
        
        // Fade out the video container
        $(videoContainer).fadeOut(1000, function() {
          console.log('Video container faded out.');
          // Once faded out, hide the video container
          videoContainer.style.display = 'none';
        });
      });
    })
    .catch(function(error) {
      console.error('Failed to start video playback:', error);
    });
});



