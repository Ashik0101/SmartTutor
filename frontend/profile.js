const edit = document.getElementById("edit");

edit.addEventListener("click", () => {

    bttn=document.getElementById('e_btn')
    bttn.style.display ="block";

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
});