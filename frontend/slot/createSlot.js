let dateButton = document.getElementById("date");
dateButton.addEventListener("input", (event) => {
  const selectedDate = new Date(event.target.value);
  //   console.log(selectedDate);
  doDateWork(selectedDate);
});

let dateObj = {};
function doDateWork(selectedDate) {
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayName = dayNames[selectedDate.getDay()];
  const date = selectedDate.getDate();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName = selectedDate.toLocaleString("default", { month: "long" });
  const year = selectedDate.getFullYear();

  dateObj.day = dayName;
  dateObj.date = date;
  dateObj.month = monthName;
  dateObj.year = year;
  // Log the extracted values to the console
  console.log(`Day name: ${dayName}`, `type:${typeof dayName}`);
  console.log(`Date: ${date}`, `type:${typeof date}`);
  console.log(`Month name: ${monthName}`, `type:${typeof monthName}`);
  console.log(`Year: ${year}`, `type:${typeof year}`);
}
// const selectedDate = new Date("2023-05-06");

const today = new Date().toISOString().split("T")[0];
console.log("today is :", today);
// Set the minimum selectable date to today
document.getElementById("date").setAttribute("min", today);

//start Time part
let startTime = document.getElementById("start-time");
startTime.addEventListener("input", () => {
  dateObj.startTime = startTime.value;
  console.log(startTime.value);
});

// end Time part
let endTime = document.getElementById("end-time");
endTime.addEventListener("input", () => {
  dateObj.endTime = endTime.value;
  console.log(endTime.value);
});

/*Creating Slot here */
let createSlotButton = document.getElementById("create-slot-button");
createSlotButton.addEventListener("click", () => {
  let getEmail = document.getElementById("email");
  dateObj.email = getEmail.value;
  createSlotFunction(dateObj);

  console.log(dateObj);
});

function createSlotFunction(dateObj) {
  fetch(`http://localhost:8080/slot/create`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(dateObj),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res);
      alert(res.msg);
    })
    .catch((err) => {
      console.log("Something went wrong :", err);
    });
}
