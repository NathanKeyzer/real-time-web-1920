const fetch = require('node-fetch');
const queryString = require('query-string');
const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = process.env;

module.exports = async (req, res, next) => {
    const code = req.query.code;
    const spotifyUrl = 'https://accounts.spotify.com/api/token';
    // Doe een fetch naar Spotify om de access en refresh tokens op te halen
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${encodeToBase64(`${CLIENT_ID}:${CLIENT_SECRET}`)}`
        }
    }

    const queryObject = {
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI
    }

    const query = queryString.stringify(queryObject);
    const apiResponse = await fetch(`${spotifyUrl}?${query}`, options);
    const tokens = await apiResponse.json();
    // Sla de tokens ergens op (wss in cookies bij de client)
    res.cookie('accesToken', tokens.access_token);
    res.cookie('refreshToken', tokens.refresh_token);

    res.redirect('/room');
}

function encodeToBase64(text) {
    return new Buffer.from(text).toString('base64');
}
