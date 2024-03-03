/*exported OAuthConfig*/
var OAuthConfig = (function() {
  'use strict';

  /* replace these values with yours obtained in the
  "My Applications" section of the Spotify developer site */
  var clientId = 'ed96ba0e13384770a17b160b293e593e';
  var redirectUri = 'http://127.0.0.1:5500/callback';

  if (location.href.indexOf('http://jmperezperez.com') === 0) {
    redirectUri = 'http://jmperezperez.com/spotify-web-api-start-template/callback.html';
  }

  var host = /http[s]?:\/\/[^/]+/.exec(redirectUri)[0];

  return {
    clientId: clientId,
    redirectUri: redirectUri,
    host: host,
    stateKey: 'spotify_auth_state'
  };
})();
