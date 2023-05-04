let button = document.getElementById("search-button");
button.addEventListener("click", () => {
  console.log("button is clicked");
  // fetchData();
});

function fetchData() {
  fetch("https://jsonplaceholder.typicode.com/todos")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      document.querySelector("body").innerHTML = null;
      document.querySelector("body").append(data);
    });
}
