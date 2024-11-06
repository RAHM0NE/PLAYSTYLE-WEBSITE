const BASE_URL = process.env.API_BASE_URL;

export const getSpotifyData = async (_access_token) => {
  const meData = await getMe(_access_token);
  const { artists: topArtists } = await getTopArtists(_access_token);
  const { tracks: topTracks } = await getTopTracks(_access_token);

  const topTrackIds = topTracks.map((track) => track.id);
  const { audio_features: audioFeatures } = await getAudioFeatures(
    _access_token,
    topTrackIds
  );

  let persona;
  if (audioFeatures.tempo > 170) persona = "thief";
  else if (audioFeatures.energy > 0.5) persona = "fighter";
  else if (audioFeatures.danceability > 0.5) persona = "knight";
  else persona = "mage";

  let weapon;
  if (audioFeatures.loudness > 0.5) weapon = "fireSword";
  else if (audioFeatures.speechiness > 0.5) weapon = "fireWand";
  else if (audioFeatures.liveness > 0.5) weapon = "iceSword";
  else weapon = "iceWand";

  return {
    me: meData,
    topArtists,
    topTracks,
    audioFeatures,
    persona,
    weapon,
  };
};

const getMe = async (_access_token) => {
  const res = await fetch(`${BASE_URL}/spotify/me?code=${_access_token}`);
  return await res.json();
};

const getTopArtists = async (_access_token) => {
  const res = await fetch(
    `${BASE_URL}/spotify/top-artists?code=${_access_token}`
  );
  return await res.json();
};

const getTopTracks = async (_access_token) => {
  const res = await fetch(
    `${BASE_URL}/spotify/top-tracks?code=${_access_token}`
  );
  return await res.json();
};

const getAudioFeatures = async (_access_token, _ids) => {
  const res = await fetch(
    `${BASE_URL}/spotify/audio-features?code=${_access_token}&ids=${_ids}`
  );
  return await res.json();
};
