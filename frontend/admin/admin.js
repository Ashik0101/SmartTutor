const url = "http://localhost:9090/";
let teacherCount = document.getElementById("teacher-count");
let studentCount = document.getElementById("student-count");
let studentBox = document.getElementById("student-box");
let teacherData = [];
let studentData = [];
let eventData = [];
let statusData = [];

fetch(`${url}teachers/all`)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    teacherData = data;
    teacherCount.innerText = data.length;
  })
  .catch((err) => {
    console.log(err);
  });

fetch(`${url}users/find?role=student`)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    statusData = data.data;
    studentCount.innerHTML = data.data.length;
  });

function studentBoxClick() {
  renderAllStudent(statusData);
}

function teacherBoxClick() {
  console.log(teacherData);
  renderTeachersData(teacherData);
}

function eventBoxClick() {
  console.log("Hi");
}

function statusBoxClick() {
  console.log("Hi");
}

let changeOnClick = document.getElementById("change-on-click");

// Students render on the admin panel
function renderOneStudent(name, email, registered_on) {
  changeOnClick.innerHTML = null;
  return `
    <div class = 'student-card'>
    <h2>Name: ${name}</h2>
    <h3>Email: ${email}</h3>
    <h3>Registered On: ${registered_on}</h3>
    </div>
    `;
}

function renderAllStudent(data) {
  changeOnClick.innerHTML = `${data
    .map((element) =>
      renderOneStudent(element.name, element.email, element.registered_on)
    )
    .join(" ")}`;
}
// Students render on the admin panel

// Logout
let logOut = document.getElementById("logOut-btn");

logOut.addEventListener("click", () => {
  localStorage.setItem("token", null);
  localStorage.setItem("name", null);
  window.location.href = "../signup.html";
});

let adminName = document.getElementById("admin-name");
adminName.innerText = localStorage.getItem("name");
let parent = document.createElement("div");
parent.setAttribute("class", "parent");

//Render the tutors data

function renderTeachersData(data) {
  changeOnClick.innerHTML = null;
  data.forEach((element) => {
    let box = document.createElement("div");
    box.setAttribute("class", "teacher-card");
    let avatar = document.createElement("img");
    avatar.setAttribute("src", element.image);
    let title = document.createElement("h2");
    title.innerText = element.name;
    let email = document.createElement("p");
    email.innerText = "Email :" + element.email;
    let address = document.createElement("p");
    address.innerText = "Address :" + element.address;
    let subject1 = document.createElement("p");
    subject1.innerText = element.subjects[0].name;
    let subject2 = document.createElement("p");
    subject2.innerText = element.subjects[1].name;
    let btn = document.createElement("button");
    btn.innerText = "DELETE";

    btn.addEventListener("click", () => {
      fetch(`${url}teachers/remove/${element._id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          parent.innerHTML = "";
          renderTeachersData(data);
        });
    });
    box.append(avatar, title, email, address, subject1, subject2, btn);
    parent.append(box);
    changeOnClick.append(parent);
  });
}
