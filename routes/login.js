const { CLIENT_ID, REDIRECT_URI} = process.env;

module.exports = (req , res, next)=>{
    const baseUrl = 'https://accounts.spotify.com/authorize?response_type=code';
    const scopes = encodeURIComponent('user-read-email user-read-currently-playing user-read-recently-played streaming');
    const redirect_uri = encodeURIComponent(REDIRECT_URI);
    const url =`${baseUrl}&client_id=${CLIENT_ID}&scope=${scopes}&redirect_uri=${redirect_uri}`;
    res.redirect(url);
}
