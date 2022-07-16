const socket = io();

const sendBtn = document.getElementById('send');
const dashboard = document.getElementById('dashboard');
const box = document.getElementById('box');

const showMessage = (user,message) => {
    dashboard.innerHTML += `<b>${user}: </b> ${message}<br>`;
}

sendBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user')).email;
    const message = document.getElementById('message').value;
    if(message !== ''){
        socket.emit('chat:message',{user,message});
    }else{
        alert('The field cannot be empity');
    }
    
});;

socket.on('chat:message', data => {
    showMessage(data.user,data.message);
})
