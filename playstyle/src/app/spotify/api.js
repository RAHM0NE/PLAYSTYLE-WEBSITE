export const getSpotifyResource = async (_uri, _access_token) => {
  const res = await fetch(`/spotify/${_uri}?code=${_access_token}`);
  return await res.json();
};
