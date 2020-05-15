# Real-Time Web @cmda-minor-web · 2019-2020


During this course you will learn how to build a **meaningful** real-time application. You will learn techniques to setup an open connection between the client and the server. This will enable you to send data in real-time both ways, at the same time.

[Live Demo](https://real-time-1920.herokuapp.com/)

## Table of contents
- [Concept](#Concept)
- [Installation](#Installation)
- [DLC](#DLC)
- [External API](#external-api)
- [Checklist](#checklist)
- [Real Time Events](#real-time-events)
- [Code Snippets](#code-snippets)
- [Wishlist](#Wishlist)
- [Credits](#Credits)


## Concept
Creating a room where users with a spotify account can discover new or known genre's. During this period i would like to discover new music, i'm tired of my own routine. Thats why i come up with this idea to make a tag cloud from genre's. These genre's wil be extracted via the users currently played song or the recently played track.

## Installation
* Clone this repository to your computer.
* Use Terminal to navigate to this folder ```cd real-time-web-1920```.
* ```npm install``` to install the node modules.
* ```cd``` to change to directory.
* And then to run the application ```node server.js```.

To use this application you need API keys from Spotify which you can get [here](https://developer.spotify.com/dashboard/login). Sign in and register an application.
>note: Keep these keys always private don't hare them.

## DLC
![DLC](https://github.com/NathanKeyzer/real-time-web-1920/blob/master/docs/img/DLC.jpg?raw=true)
![DLC2](https://github.com/NathanKeyzer/real-time-web-1920/blob/master/docs/img/DLC2.jpg?raw=true)

## External API
For this application i'm using the [Spotify API](https://developer.spotify.com/documentation/web-api/)
* Scopes i will use
    - user-read-email
    - user-read-currently-playing
    - user-read-recently-played
    - streaming
* Endpoints
    - https://api.spotify.com/v1/me/
    - https://api.spotify.com/v1/me/player/recently-played
    - https://api.spotify.com/v1/artists/{id}


## Real Time Events
- `add user` creates an object user with the data of the logged in spotify user.

- `add genre` adds genre of recently played track into array of genres. these will be displayed via the events `allGenres`

- `userTile` is where the user information is stored. This will display: `userimage, username, trackname, artistname` this data is from the recently played track. This userTile will be added to the `userList`

- `another user connected` this let the users see other people in the room. So you can see which friend is also listening music on spotify.

- `allGenres` receives the genre of the user recently played track.

- `new genre` This will show every user the genre which people are listening to or have recently played.

## Code Snippets
Add a user
```javascript
socket.on('add user', (users)=> {
const user = {
        userimage: userimage.src,
        username: username.textContent,
        trackname: trackname.textContent,
        artistname: artistname.textContent,
    }
    socket.emit('userTile', user)
})
```
Store user in array users
```javascript
socket.on('userTile', (user)=>{
    //username check
    const userExists = users.some(existingUser=> existingUser.username === user.username);
    if (userExists){
        return
    }
    users.push(user);
    socket.broadcast.emit('another user connected', user)
})
```
create another user to display on client
```javascript
socket.on('another user connected', (user)=>{
    const li = document.createElement('li')
    li.classList.add('userTile')
    const markup = `
        <img id="userImage" src="${user.userimage}" alt="">
        <div>
        <p>${user.username}</p>
        <p>${user.trackname}</p>
        <p>${user.artistname}</p>
        </div>
    `
    li.innerHTML= markup

    userList.appendChild(li)
})
```



## Checklist
- [x] Spotify login
- [x] User profile with recently played track
- [x] Genre from recently played track
- [x] Multi users using socket.io
- [x] Recently playing from different users using socket.io
- [x] Displaying genres in word cloud using socket.io

### Wishlist
* User can see artist by genre.
* User can generate a playlist by genre.
* User can hover on genre and listen to a preview track of this genre.

## Credits
- [Luna May](https://github.com/maybuzz) for rubberducking
- [Kris Kuiper](https://github.com/kriskuiper) for live tutorial about Spotify OAuth flow and rubberducking
- [Spotify](https://developer.spotify.com/dashboard) for making this application posssible.
## License
[MIT](LICENSE) © [Nathan Keyzer](https://github.com/NathanKeyzer)
