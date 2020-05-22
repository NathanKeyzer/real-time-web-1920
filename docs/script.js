const socket = io();

////code die werkt
const userlist = document.getElementById('userList')
const userimage = document.getElementById('userImage')
const username = document.getElementById('username')
const trackname = document.getElementById('trackname')
const artistname = document.getElementById('artistname')
const genre = document.getElementById('genre')
const genreCollection = document.getElementById('main')


//gebruiker toevoegen
socket.on('add user', (users)=> {
//user object maken
const user = {
        userimage: userimage.src,
        username: username.textContent,
        trackname: trackname.textContent,
        artistname: artistname.textContent,
    }

    socket.emit('userTile', user)
})

//genre toevoegen
socket.on('add genre', (genres)=>{
    //genre object
    const userGenre = {
            genre:genre.textContent
        }
        socket.emit('allGenres',userGenre)
})
//user from array users create tile
socket.on('another user connected', (users)=>{
    userList.innerHTML = ''
    users.map(user=>{
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
})

socket.on('new genre', (genres)=>{
    p.innerHTML =''
    genres.map(genre=>{
        const p = document.createElement('p')
        p.classList.add('genre')
        p.setAttribute('id',genre.genre)
        const markup = `
            <span>${genre.genre}</span>
    `
        p.innerHTML= markup

        main.appendChild(p)
    })
    })

// to display genre user clicked on
genreCollection.addEventListener("click", reaction);
function reaction(event){

    const clickedGenre = {
            genre:event.target.innerText,
            username: username.textContent
        }
    event.preventDefault();
    socket.emit("genre click", clickedGenre)

}
/// verbeter deze
socket.on ('big-announcement', (reaction)=>{
    const p = document.createElement('p')
    p.classList.add('genreClick')
    const markup = `
        ${reaction.username} clicked ${reaction.genre}
    `
    p.innerHTML= markup
    clickScroll.appendChild(p)
    clickScroll.scrollTop = clickScroll.scrollHeight

})


socket.emit('disconnect')
