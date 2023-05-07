const url = "http://localhost:9090";
let dateButton = document.getElementById("date");
dateButton.addEventListener("input", (event) => {
  const selectedDate = new Date(event.target.value);
  //   console.log(selectedDate);
  doDateWork(selectedDate);
});

let payload = {};
let timeArr = new Array(2);
function doDateWork(selectedDate) {
  const dayName = selectedDate.getDay();
  const date = selectedDate.getDate();
  const monthName = selectedDate.getMonth() + 1;
  const year = selectedDate.getFullYear();

  payload.dateMonthName = `${year}-${monthName}-${date}`;
}
// const selectedDate = new Date("2023-05-06");
const today = new Date().toISOString().split("T")[0];
console.log("today is :", today);
// Set the minimum selectable date to today
document.getElementById("date").setAttribute("min", today);

//start Time part

let startTime = document.getElementById("start-time");
startTime.addEventListener("input", () => {
  timeArr[0] = startTime.value;
  console.log(timeArr[0]);
});

// end Time part
let endTime = document.getElementById("end-time");
endTime.addEventListener("input", () => {
  timeArr[1] = endTime.value;
  console.log(timeArr[1]);
  payload.slot_timing = timeArr;
});

/*Creating Slot here */
let createSlotButton = document.getElementById("create-slot-button");
createSlotButton.addEventListener("click", () => {
  createSlotFunction(payload);
  console.log(payload);
});

function createSlotFunction(payload) {
  fetch(`${url}/slot/create`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`, //yahan pe token bhejunga so that i cann apend in the body
    },
    body: JSON.stringify(payload),
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
