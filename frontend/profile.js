const edit = document.getElementById("edit");

edit.addEventListener("click", () => {
    bttn=document.getElementById('e_btn')
    bttn.style.display ="block";


    role=document.getElementById('gen2')
    if(role.innerText=="Teacher"){
       bttn2=document.getElementById('e_btn2')
      bttn2.style.display ="block";
    }


  let e_data = document.querySelectorAll('input[readonly]');
  e_data.forEach(element => {
    element.removeAttribute('readonly');
    element.classList.add('editable');
  });
});

const e_btnn = document.getElementById("e_btn");
e_btnn.addEventListener("click", (event) => {
  const e_data = document.querySelectorAll('input.editable');
  e_data.forEach(element => {
    element.setAttribute('readonly', '');
    element.classList.remove('editable');
  });

  const bttn = document.getElementById('e_btn');
  bttn.style.display = "none";
  bttn2=document.getElementById('e_btn2')
    bttn2.style.display ="none";
  });
  
  const morede = document.getElementById("e_btn2");
  
  morede.addEventListener("click", () => {
    const sec = document.getElementById('unp');
    sec.style.display = "none";
    sec2=document.getElementById('unp2')
      sec2.style.display ="block";
})

async function Aage(){

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
    let role = Tform.querySelector("#newRole");
    // let city = Tform.querySelector("#tcity").value;
    // let state = Tform.querySelector("#tstate").value;
  
    let tex1 = Tform.querySelector("#tex1");
    let tex2 = Tform.querySelector("#tex2");
    let tex3 = Tform.querySelector("#tex3");
    let tex4 = Tform.querySelector("#tex4");
    let tex5 = Tform.querySelector("#tex5");
  
  
    let val = []
    if (tex1.checked === true) {
      val.push(tex1.value)
    }
    if (tex2.checked === true) {
      val.push(tex2.value)
    }
    if (tex3.checked === true) {
      val.push(tex3.value)
    }
    if (tex4.checked === true) {
      val.push(tex4.value)
    }
    if (tex5.checked === true) {
      val.push(tex5.value)
    }
   
    let expertise = val
  
    
    let data = {
      name: naam,
      email: email,
      image: image,
      subjects: expertise,
      country:country,
      description: desc,
      designation: desig,
      teachingExp: experience,
      experience: experience,
      workingHrs: hour,
      degrees:qualification,
      address: addy,
      fees: fees,
      teachesOnline: teachesonline,
      gender: gender,
      homeworkHelp: homework
    };
  
  
    console.log(data)
  
    let td = "http://localhost:9090/teachers/update"
  
    let res = await fetch(td, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    const response = await res.json();
    // console.log(response);
    if (response.ok) {
      alert("Data has been added!!!")
    }
    else {
      alert("error")
    }
  
  });

}