// const { json } = require("body-parser");

// code for change form start here
const forms = document.querySelector(".forms");
let links = document.querySelectorAll(".link");

// code for change form end here

const form = document.querySelector("#Sform"); // select the form element

links.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    //preventing form submit
    forms.classList.toggle("show-signup");
  });
});

// Next function
let previousPageUrl = document.referrer;
console.log(`url is ---- ${previousPageUrl}`);
if (previousPageUrl == "http://127.0.0.1:5501/") {
  let bool = true;
  NEXT(bool);
}

document.querySelector("#Next").addEventListener("click", () => {
  NEXT();
});

async function NEXT(bool) {
  if (bool) {
    document.querySelector("#Tf").style.display = "block";
    document.querySelector("#nf").style.display = "none";
    // bool=false
    return;
  }

  const name = form.querySelector('input[type="text"]').value;
  const email = form.querySelector('input[type="email"]').value;
  const password = form.querySelector('input[type="password"]').value;
  const role = form.querySelector("#role").value;

  let flag = await addDetails(name, email, password, role);
  if (flag == 1) {
  } else if (flag == 2) {
  } else {
    console.log(flag);
    if (role == "teacher") {
      document.querySelector("#Tf").style.display = "block";
      document.querySelector("#nf").style.display = "none";
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
    } else if (role == "student") {
      // document.querySelector("#Sf").style.display = "block";
      // document.querySelector("#nf").style.display = "none";
      // localStorage.setItem("email", email);
      // localStorage.setItem("password", password);
      alert("registered succesfully pls login again");
      window.location.href = "./signup.html";
    }
  }

  // console.log(name, email, password,role)
  async function addDetails(name, email, password, role) {
    if (name.length == 0 || email.length == 0 || password.length == 0) {
      alert("fill all details");
      return 2;
    }

    const url = "http://localhost:9090/users/register";

    const data = {
      name: name,
      email: email,
      password: password,
      role: role,
    };

    let res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    let response = await res.json();
    console.log(response);
    if (response.msg == "user exists") {
      alert("account already exists");
      return 1;
      // alert("account already exists")
      // accountExists=true;
    }
  }
}
// login function
const Loginbutton = document.querySelector("#login");
const Lform = document.querySelector("#Lform");

Loginbutton.addEventListener("click", async (event) => {
  event.preventDefault();
  const email = Lform.querySelector('input[type="email"]').value;
  const password = Lform.querySelector('input[type="password"]').value;

  const url = "http://localhost:9090/users/login";

  const data = {
    email: email,
    password: password,
  };
  console.log(data);

  let res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const response = await res.json();
  //   sessionStorage.setItem("Userdetials", JSON.stringify(response));
  //   sessionStorage.setItem("status", true)
  localStorage.setItem("token", response.token);
  localStorage.setItem("userEmail", response.data.email);
  console.log(response);
  if (response.msg === "Login successfull") {
    localStorage.setItem("name", response.data.name);
    if (response.data.role == "admin") {
      window.location.href = "./admin/admin.html";
    } else {
      window.location.href = "./index.html";
    }
  } else {
    alert(response.msg);
  }
  // console.log(response);
});

// Submit function for teacher

var Tform = document.getElementById("TeacherDetails");

Tform.addEventListener("submit", async function (event) {
  // Prevent the form from submitting normally
  event.preventDefault();

  //   Get the values of the input fields
  let naam = Tform.querySelector("#newName").value;
  let teachesonline = Tform.querySelector("#newOnline").value;
  let homework = Tform.querySelector("#newHomework").value;
  let email = Tform.querySelector("#newEmail").value;
  let image = Tform.querySelector("#newImage").value;
  let desc = Tform.querySelector("#newDesc").value;
  let fees = Tform.querySelector("#newFees").value;
  let addy = Tform.querySelector("#newAddress").value;
  let country = Tform.querySelector("#newCountry").value;
  let desig = Tform.querySelector("#newDesignation").value;
  let hour = Tform.querySelector("#newHour").value;
  let gender = Tform.querySelector("#tgen").value;
  let qualification = Tform.querySelector("#Qualification").value;
  let experience = Tform.querySelector("#Experience").value;
  let role = Tform.querySelector("#newRole").value;
  let state = Tform.querySelector("#newState").value;
  let college = Tform.querySelector("#newCollege").value;
  let level = Tform.querySelector("#newLevel").value;
  // let city = Tform.querySelector("#tcity").value;
  // let state = Tform.querySelector("#tstate").value;

  // role.addEventListener("select",()=>{
  //   naam.setAttribute("disabled")
  //   NEXT()
  // })

  let tex1 = Tform.querySelector("#tex1");
  let tex2 = Tform.querySelector("#tex2");
  let tex3 = Tform.querySelector("#tex3");
  let tex4 = Tform.querySelector("#tex4");
  let tex5 = Tform.querySelector("#tex5");

  let val = [];
  if (tex1.checked === true) {
    // val.push(tex1.value)
    val.push({
      name: tex1.value,
      level: level,
    });
  }
  if (tex2.checked === true) {
    val.push({
      name: tex1.value,
      level: level,
    });
  }
  if (tex3.checked === true) {
    val.push({
      name: tex2.value,
      level: level,
    });
  }
  if (tex4.checked === true) {
    val.push({
      name: tex3.value,
      level: level,
    });
  }
  if (tex5.checked === true) {
    val.push({
      name: tex4.value,
      level: level,
    });
  }

  console.log(val);

  let expertise = val;

  // let address = {
  //   city,
  //   state,
  //   pincode
  // };

  let data = {
    name: naam,
    email: email,
    image: image,
    subjects: expertise,
    country: country,
    description: desc,
    designation: desig,
    teachingExp: experience,
    experience: experience,
    workingHrs: hour,

    degrees: [{ name: qualification, college: college }],

    address: addy,
    state: state,
    fees: fees,
    teachesOnline: teachesonline,
    gender: gender,
    homeworkHelp: homework,
  };

  //   {
  //     "_id": "6452a4792a78ee63a0399fd0",
  //     "email": "johndoe@example.com",
  //     "image": "https://randomuser.me/api/portraits/men/72.jpg",
  //     "subjects": [
  //         {
  //             "name": "Mathematics",
  //             "level": "Intermediate",
  //             "_id": "6452a4792a78ee63a0399fd1"
  //         },
  //         {
  //             "name": "English",
  //             "level": "Beginner",
  //             "_id": "6452a4792a78ee63a0399fd2"
  //         }
  //     ],
  //     "description": "I am a highly experienced teacher with over 10 years of experience teaching mathematics and English.",
  //     "experience": 12,
  //     "degrees": [
  //         {
  //             "name": "Bachelor of Science in Mathematics",
  //             "college": "University of California, Los Angeles",
  //             "_id": "6452a4792a78ee63a0399fd3"
  //         },
  //         {
  //             "name": "Master of Arts in English Literature",
  //             "college": "Stanford University",
  //             "_id": "6452a4792a78ee63a0399fd4"
  //         }
  //     ],
  //     "address": "123 Main Street, Anytown USA",
  //     "fees": 50,
  //     "teachesOnline": "Yes",
  //     "gender": "Male",
  //     "homeworkHelp": "Yes",
  //     "__v": 0,
  //     "designation": "Software Developer",
  //     "name": "John Doe",
  //     "teachingExp": 5,
  //     "workingHrs": 8,
  //     "country": "USA",
  //     "state": "Anytown"
  // }

  // const nestedObject = {
  // name: "John Doe",
  // email: "johndoe@email.com",
  // image: "https://example.com/image.jpg",
  //   subjects: [
  //     {
  //       name: "Mathematics",
  //       level: "Intermediate",
  //     },
  //     {
  //       name: "Science",
  //       level: "Beginner",
  //     },
  //   ],
  //   country: "USA",
  // description: "I am a passionate teacher with over 10 years of experience.",
  // designation: "Senior Teacher",
  // teachingExp: 12,
  // experience: 15,
  // workingHrs: 40,
  //   degrees: [
  //     {
  //       name: "Bachelor of Science in Education",
  //       college: "University of California",
  //     },
  //     {
  //       name: "Master of Education",
  //       college: "Harvard University",
  //     },
  //   ],
  //   address: "123 Main St, Anytown, USA",
  // fees: 50,
  // teachesOnline: "Yes",
  // gender: "Male",
  // homeworkHelp: "No",
  // };

  console.log(data);

  if (role == "teacher" || role == "Teacher") {
    let td = "http://localhost:9090/teachers/";

    let res = await fetch(td, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const response = await res.json();
    console.log(response);
    if (response.msg === "added successfully") {
      alert("added successfully please login again");
      window.location.href = "./signup.html";
    } else {
      alert(response.msg);
    }
  } else {
    window.location.href = "./index.html";
  }
});

// submit function for student

var Sform = document.getElementById("StudentDetails");

Sform.addEventListener("submit", async function (event) {
  // Prevent the form from submitting normally
  event.preventDefault();

  //   Get the values of the input fields
  let city = Sform.querySelector("#tcity1").value;
  let state = Sform.querySelector("#tstate1").value;
  let pincode = Sform.querySelector("#tpin1").value;
  let phoneNumber = Sform.querySelector("#Mobile1").value;
  let gender = Sform.querySelector("#tgen1").value;
  let standard = Sform.querySelector("#standard").value;

  let tex11 = Sform.querySelector("#tex11");
  let tex22 = Sform.querySelector("#tex22");
  let tex33 = Sform.querySelector("#tex33");
  let tex44 = Sform.querySelector("#tex44");
  let tex55 = Sform.querySelector("#tex55");

  let val = [];
  if (tex11.checked === true) {
    val.push(tex11.value);
  }
  if (tex22.checked === true) {
    val.push(tex22.value);
  }
  if (tex33.checked === true) {
    val.push(tex33.value);
  }
  if (tex44.checked === true) {
    val.push(tex44.value);
  }
  if (tex55.checked === true) {
    val.push(tex55.value);
  }

  let subjects = val;
  console.log(val);
  let address = {
    city,
    state,
    pincode,
  };

  let data = {
    mobile: phoneNumber,
    gender: gender,
    standard: standard,
    subjects: subjects,
    address: address,
  };

  console.log(data);
  const sd = "http://localhost:9090/";

  console.log(data);
  let res = await fetch(sd, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const response = await res.json();
  console.log(response);

  if (response.msg === "details added") {
    window.location.href = "signup.html";
  } else {
    alert(response.msg);
  }
});

// let authe = document.getElementById("google")

// authe.onclick = async () => { location.href="http://localhost:9090/auth/google"
//   console.log("hi")
//   let res = await fetch("http://localhost:9090/auth/google/callback", {
//     method: "GET"
//   })

//   let response = await res.json()
//   console.log(response)
//   if (response.msg === "Login succesfull") {
//     window.location.href = "index.html"
//   }
// }

let authe = document.getElementById("google");

authe.onclick = async () => {
  location.href = "http://localhost:9090/auth/google";
  console.log("hi");
  // let res = await fetch("http://localhost:9090/auth/google/callback", {
  //   method: "GET",
  //   credentials: "include", // Include cookies in the request
  // });

  // let response = await res.json();
  // console.log(response);
  //   if (response.msg === "Login successful") {
  //     // Access the user's information in the response
  //     const user = response.user;
  //     console.log(user);
  //     window.location.href = "index.html";
  //   }
};
