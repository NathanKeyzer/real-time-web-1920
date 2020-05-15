const socket = io();

////code die werkt
const userlist = document.getElementById('userList')
const userimage = document.getElementById('userImage')
const username = document.getElementById('username')
const trackname = document.getElementById('trackname')
const artistname = document.getElementById('artistname')
const genre = document.getElementById('genre')


//gebruiker toevoegen
socket.on('add user', (users)=> {
console.log('dit zijn mijn gebruikers',users);

//user object maken
const user = {
        userimage: userimage.src,
        username: username.textContent,
        trackname: trackname.textContent,
        artistname: artistname.textContent,
    }

    // console.log('add user');
    socket.emit('userTile', user)
})

//genre toevoegen
socket.on('add genre', (genres)=>{
    console.log('dit is mijn genre',genres);
    const userGenre = {
            genre:genre.textContent
        }
        socket.emit('allGenres',userGenre)
})
//user from array users create tile
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

socket.on('new genre', (genre)=>{
    const p = document.createElement('p')
    p.classList.add('genre')
    const markup = `

        ${genre.genre}

    `
    p.innerHTML= markup

    main.appendChild(p)
})


socket.emit('disconnect')
