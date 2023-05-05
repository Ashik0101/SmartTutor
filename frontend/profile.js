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
  const data = {};

  e_data.forEach(element => {
    element.setAttribute('readonly', '');
    element.classList.remove('editable');
    data[element.name] = element.value;
  });

  const bttn = document.getElementById('e_btn');
  bttn.style.display = "none";
  console.log(data)
  fetch('/your-api-endpoint', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (response.ok) {
      // add your attributes here
      e_data.forEach(element => {
        element.setAttribute('class', 'new-class');
        element.setAttribute('data-attribute', 'value');
      });
    } else {
      throw new Error('Something went wrong');
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
});
