# Real-Time Web @cmda-minor-web · 2019-2020


During this course you will learn how to build a **meaningful** real-time application. You will learn techniques to setup an open connection between the client and the server. This will enable you to send data in real-time both ways, at the same time.

## Concept
Creating a room where users with a spotify account can discover new or known genre's. During this period i would like to discover new music, i'm tired of my own routine. Thats why i come up with this idea to make a tag cloud from genre's. These genre's wil be extracted via the users currently played song or the recently played track.

## Installation
* Clone this repository to your computer.
* Use Terminal to navigate to this folder ```cd real-time-web-1920```.
* ```npm install``` to install the node modules.
* And then to run the application ```node server.js```.

## DLC
![DLC](https://github.com/NathanKeyzer/real-time-web-1920/blob/master/docs/img/DLC.jpg?raw=true)

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
* Currently playing song from user.
* Rooms with friends/room codes.
* Hover on genre to see which user is listening.
### Wishlist
* User can see artist by genre.
* User can generate a playlist by genre.
