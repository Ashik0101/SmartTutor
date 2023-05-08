const url = 'http://localhost:9090/'
let teacherCount = document.getElementById('teacher-count');
let studentCount = document.getElementById('student-count');
let studentBox = document.getElementById('student-box');
let teacherData = [];
let studentData = [];
let eventData = [];
let statusData = [];


fetch(`${url}teachers/all`)
.then((res)=>{
    return res.json()
})
.then((data)=>{
    teacherData = data;
    teacherCount.innerText = data.length;
})
.catch((err)=>{
    console.log(err);
})

fetch(`${url}users/find?role=student`)
.then((res)=>{
    return res.json();
})
.then((data)=>{
    statusData = data.data;
    studentCount.innerHTML = data.data.length;
})


function studentBoxClick(){
    renderAllStudent(statusData);
}


function teacherBoxClick(){
    console.log(teacherData);
}

function eventBoxClick(){
    console.log('Hi');
}

function statusBoxClick(){
    console.log('Hi');
}


let changeOnClick = document.getElementById('change-on-click');

// Students render on the admin panel
function renderOneStudent(name,email,registered_on){
    changeOnClick.innerHTML = null;
    return `
    <div class = 'student-card'>
    <h2>Name: ${name}</h2>
    <h3>Email: ${email}</h3>
    <h3>Registered On: ${registered_on}</h3>
    </div>
    `
}

function renderAllStudent(data){
    changeOnClick.innerHTML = `${data.map((element)=> renderOneStudent(element.name,element.email,element.registered_on)).join(' ')}`;
}
// Students render on the admin panel











// Logout
let logOut = document.getElementById('logOut-btn');

logOut.addEventListener('click',()=>{
    localStorage.setItem('token',null);
    localStorage.setItem('name',null);
    window.location.href="../signup.html"
})


let adminName = document.getElementById('admin-name');
adminName.innerText = localStorage.getItem('name');