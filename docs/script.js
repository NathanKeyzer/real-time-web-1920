const socket = io();

////code die werkt
const userlist = document.getElementById('userList')
const userimage = document.getElementById('userImage')
const username = document.getElementById('username')
const trackname = document.getElementById('trackname')
const artistname = document.getElementById('artistname')
// const artistid = document.getElementById('artistid')
const genre = document.getElementById('genre')


socket.on('add user', (users)=> {
console.log(users);
console.log(genre);
//user object maken

const user = {
        userimage: userimage.src,
        username: username.textContent,
        trackname: trackname.textContent,
        artistname: artistname.textContent,
    }

    console.log('add user');
    socket.emit('userTile', user)
})

socket.on('add genre', (genres)=>{
    const userGenre = {
            genre:genre.textContent
        }
        socket.emit('allGenres',userGenre)
})

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
    p.classList.add('allGenres')
    const markup = `

        <p>${genre.genre}</p>

    `
    p.innerHTML= markup

    main.appendChild(p)
})


socket.emit('disconnect')
