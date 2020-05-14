const fetch = require('node-fetch');

async function rooms(req, res) {
  const token = req.cookies.accesToken;
  const options = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  }
  const user = await fetch('https://api.spotify.com/v1/me/', options)
    .then(userRes => userRes.json())
  const player = await fetch('https://api.spotify.com/v1/me/player/recently-played', options)
    .then(playerRes => playerRes.json())
  const artistId = player.items[0].track.artists[0].id;
  const artist = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, options)
    .then(artistRes => artistRes.json())
  res.render('pages/room', {
    user: user.display_name,
    userImage: user.images[0] ? user.images[0].url : `https://developer.spotify.com/assets/branding-guidelines/icon4@2x.png`,
    trackName: player.items[0].track.name,
    artistName: player.items[0].track.artists[0].name,
    artistId: player.items[0].track.artists[0].id,
    genre: artist.genres[0],
  })
}
module.exports = rooms;
