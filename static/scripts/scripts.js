import { createUser, logIn} from "./firebase.js";
const formLogin = document.getElementById('form-login');
const formRegister = document.getElementById('form-registration');
const formA = document.getElementById('formAgregar');
const formE = document.getElementById('formEditar');
const tableTask = document.getElementById('watchTask');

if(formLogin !== null){
    formLogin.addEventListener('submit', (e) => {
        e.preventDefault();
        getData();
        logIn();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const URLadd = 'http://localhost:7000/api/registro';
        fetch(URLadd,{
        method: 'POST',
        body: JSON.stringify(registro),
        headers:{
            "Content-type": "application/json"              
        }
    })
        .then(res => res.json())
        .then(data =>console.log(data))
            
    setTimeout(() => {
        bringHomework();
    }, 100);
        const { error, data } = await logIn(email, password);
        if (error) {
            switch (data.code) {
                case 'auth/wrong-password': swal("Incorrect password, try again", "error", { timer: 300 })
                    break;
                case 'auth/user-not-found': alert('Unregistered mail');
                    swal("Error, the email does not exist, try another email", { timer: 300 })
                    break;
                default: swal("Unexpected error", { timer: 300 })
                    break;
            }
        } else {
            swal("Welcome to task management", { timer: 3000 });
            const user = { "email": data.email, "uid": data.uid }
            localStorage.setItem('user', JSON.stringify(user))
            window.location.href = "../html/chat.html";            
        }
    });
};

if(formRegister !== null){
    formRegister.addEventListener('submit', (e) =>{
    e.preventDefault();
    saveLocal(getData());
    const name = document.getElementById("name").value;
    const lastname = document.getElementById("lastName").value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    let user = {"email": email};
    localStorage.setItem("datosUsuario", JSON.stringify(user));

    const URLadd = 'http://localhost:7000/api/registro';
    fetch(URLadd,{
    method: 'POST',
    body: JSON.stringify(registro),
    headers:{
        "Content-type": "application/json"              
    }
})
    .then(res => res.json())
    .then(data =>console.log(data))
        
setTimeout(() => {
    bringHomework();
}, 100);
    const { error, data } = await createUser(name, lastname, email, password);
    if (error){
        switch (data.code) {
            case 'auth/email-already-in-use': swal("User exist", { timer: 30000 })
                break;
            case 'auth/weak-password': swal("Password very short", "The password must be at least 6 characteres", { timer: 3000 })
                break;
            default:
                swal("Unexpected error", { timer: 30000 })
                break;
        }
    } else {
        swal("Registered user", { timer: 30000 });
        window.location.href = './login.html';
    }
});
};

const saveLocal = (user) => {
    let data = localStorage.getItem('users') !== null ? JSON.parse(localStorage.getItem('users')) : []
    data.push(user);
    localStorage.setItem('users', JSON.stringify(data));
};

const logIn = ({ email, password }) => {
    let data = localStorage.getItem('users') !== null ? JSON.parse(localStorage.getItem('users')) : []
    if(data.length > 0){
        result = data.filter(user => user.email === email && password === password)
    }else{
        return('The user no exist')
    }
};

const getData = () => {
    const email = document.getElementById('email').value;
    const password = documentById('password').value;
    return { email, password }
};

const input = document.querySelector('input[type="file"]');
input.addEventListener('change', function(e){
    console.log(input.files);
    const reader = new FileReader();
    reader.onload = function(){
        const img = new Image();
        img.src = reader.result;
        document.body.appendChild(img);
    }
    reader.readAsDataURL(input.files[0]);
}, false);

const URL = 'http://localhost:7000/task';
const traerTask =() => {
    fetch(URL)
        .then(response => response.json())
        .then(data =>{
            tableTask.innerHTML = ''
            data.forEach(task => {
                const {taskImage, taskName, priorityTask, expirationDate} = task;
                
                tableTask.innerHTML += `
                    <tr>
                        <td>${taskImage}</td>
                        <td>${taskName}</td>
                        <td>${priorityTask}</td>
                        <td>${expirationDate}</td>
                        <td><button class="btnDel" id="${expirationDate}")>Borrar</button></td>
                    </tr>`
            });
        });
};
traerTask();


if(formA !== null){
formA.addEventListener('submit', (e) => {
    e.preventDefault();
    const tareas = {
        taskImage: taskImage.toUpperCase(), 
        taskName: taskName, 
        priorityTask: priorityTask, 
        expirationDate: expirationDate, 
    };

    console.log(tareas);
    const URLadd = 'http://localhost:7000/task'
    fetch(URLadd,{
        method: 'POST',
        body: JSON.stringify(tareas),
        headers:{
            "Content-type": "application/json"              
        }
    })
        .then(res => res.json())
        .then(data =>console.log(data))
            
    setTimeout(() => {
        bringHomework();
    }, 100);
});
};

if(formE !== null){
formE.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskImage = document.getElementById('image-task').value;
    const taskName = document.getElementById('task-name').value;
    const priorityTask = document.getElementById('priority').value;
    const expirationDate = document.getElementById('date').value;

    let tareas = {
        taskImage: taskImage.toUpperCase(), 
        taskName: taskName, 
        priorityTask: priorityTask, 
        expirationDate: expirationDate, 
    };
    delete tareas.taskImage;

    if (!tareas.taskName){
        delete tareas.taskName
    }
    if (!tareas.priorityTask){
        delete tareas.priorityTask
    }
    if (!tareas.expirationDate){
        delete tareas.expirationDate
    }
    console.log(tareas);
    const URLEd = `http://localhost:7000/task/${expirationDate}`
    fetch(URLEd,{
        method: 'PATCH',
        body: JSON.stringify(tareas),
        headers:{
            "Content-type": "application/json"              //Importante para realizar el PATCH
        }
    })
        .then(res => res.json())
        .then(data =>console.log(data))
    
        setTimeout(() => {
        traerTask();
    }, 5);  
    
});
};