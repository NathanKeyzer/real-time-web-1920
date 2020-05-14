const socket = io();
//
// //clean code
// socket.on('add user',(users)=>{
//     for (user of users){
//         createNewUserElement(user);
//     }
// })
//
// socket.emit('another user connected', (user) =>{
//     const userimage = document.getElementById('userImage').textContent
//     const username = document.getElementById('username').textContent
//     const trackname = document.getElementById('trackname').textContent
//     const artistname = document.getElementById('artistname').textContent
//     const artistid = document.getElementById('artistid').textContent
//     const genre = document.getElementById('genre').textContent
//
//     const user = {
//         userimage,
//         username,
//         trackname,
//         artistname,
//         artistid,
//         genre
//     }
//
//     createNewUserElement(user)
// })
//
// socket.on('another user connected',(user)=>{
// socket.emit('userTile', user)
// })
//
// function createNewUserElement(user) {
//     const li = document.createElement('li');
//
//     li.classList.add('userTile');
//     const markup =`
//     <img id="userImage" src="${userImage} " alt="">
//         <p>${user.userimage}</p>
//         <p>${user.username}</p>
//         <p>${user.trackname}</p>
//         <p>${user.artistname}</p>
//         <p>${user.artistid}</p>
//         <p>${user.genre}</p>
//     `;
//
//     li.innerHTML = markup;
//
//     userList.appendChild(li);
//
// }
//


////code die werkt
const userlist = document.getElementById('userList')
const userimage = document.getElementById('userImage')
const username = document.getElementById('username')
const trackname = document.getElementById('trackname')
const artistname = document.getElementById('artistname')
const artistid = document.getElementById('artistid')
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
        artistid: artistid.textContent,
        genre: genre.textContent
    }
    console.log(user.genre);
    console.log('add user');
    socket.emit('userTile', user)

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
        <p>${user.artistid}</p>
        <p>${user.genre}</p>
        </div>
    `
    li.innerHTML= markup

    userList.appendChild(li)
})
