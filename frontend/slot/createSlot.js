const url = "https://dull-cyan-jellyfish-cuff.cyclic.app";
let count = 10;
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
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(payload),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res);
      alert(res.msg);
      fetchTutorData();
    })
    .catch((err) => {
      console.log("Something went wrong :", err);
    });
}

/*<><><><><><><><><><><><><><><><><>*/
/*UPDATING THE SLOTS PART IS HERE */

let segregatedDateObject = {};
function fetchTutorData() {
  segregatedDateObject = {};
  fetch(
    `${url}/slot/one-tutor/dashboard/${localStorage.getItem("teacherEmail")}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res);
      let sortedArrBasedOnTiming = sortBasedOnTiming(res);
      let sortedArrBasedOnDateTimeAndYear = sortBasedOnDateMonthYear(
        sortedArrBasedOnTiming
      );
      segregateDateFunction(sortedArrBasedOnDateTimeAndYear);
      console.log(segregatedDateObject);
      convertObjIntoArray(segregatedDateObject);
      /*till here all the slots is updated */
      showSlots();
    })
    .catch((error) => {
      console.log("some error while getting the slots :", error);
    });

  /*Sort Based on timing function */
  function sortBasedOnTiming(arr) {
    arr.sort((a, b) => {
      const timeA = new Date(`1970-01-01T${a.slot_timing[0]}:00Z`);
      const timeB = new Date(`1970-01-01T${b.slot_timing[0]}:00Z`);
      return timeA - timeB;
    });
    return arr;
  }
  function sortBasedOnDateMonthYear(arr) {
    arr.sort((a, b) => {
      const dateA = new Date(a.dateMonthName);
      const dateB = new Date(b.dateMonthName);
      if (dateA < dateB) {
        return -1;
      }
      if (dateA > dateB) {
        return 1;
      }
      return 0;
    });

    return arr;
  }
  function segregateDateFunction(data) {
    data.forEach((element) => {
      if (!segregatedDateObject[element.dateMonthName]) {
        segregatedDateObject[element.dateMonthName] = [
          {
            id: element._id,
            slot_timing: element.slot_timing,
            isBooked: element.isBooked,
            studentEmail: element.studentEmail,
          },
        ];
      } else {
        segregatedDateObject[element.dateMonthName].push({
          id: element._id,
          slot_timing: element.slot_timing,
          isBooked: element.isBooked,
          studentEmail: element.studentEmail,
        });
      }
    });
  }

  /*converting segregated object into array */
  let dateCardContainer = document.getElementById("card-container");
  function convertObjIntoArray(obj) {
    const arr = Object.entries(obj).map(([key, value]) => [key, value]);
    console.log("here is the main :", arr);
    appendTheSlotCardToDom(arr);
  }

  /*Expanding the day, date, month, year here */
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
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

  function expandedDate(date, total_slots) {
    console.log(date, total_slots);
    return expandDayDateMonthYear(date, total_slots);
  }
  function expandDayDateMonthYear(inputDate, total_slots) {
    const selectedDate = new Date(inputDate);
    const dayName = dayNames[selectedDate.getDay()];
    const date = selectedDate.getDate();
    const monthName = monthNames[selectedDate.getMonth()];
    const year = selectedDate.getFullYear();
    return dateCard(dayName, date, monthName, year, total_slots);
  }

  function appendTheSlotCardToDom(arr) {
    dateCardContainer.innerHTML = null;
    dateCardContainer.innerHTML = `
  ${arr
    .map((element) => {
      return expandedDate(element[0], element[1].length);
    })
    .join(" ")}`;
  }

  // let dateCardContainer = document.getElementById("card-container");

  function dateCard(day, date, month, year, slots) {
    return `
<div class="date-select-card" data-id = ${year}-${
      monthNames.indexOf(month) + 1
    }-${date}>
  <h3>${day}</h3>
  <h3>${date}</h3>
  <h3>${month}</h3>
  <h3>${year}</h3>
  <h3 id = "date-card-slot">Slots : ${slots}</h3>
</div>
`;
  }

  /*TIME SLOT SHOWING PART IS HERE */
  function showSlots() {
    let slotCards = document.querySelectorAll(".date-select-card");
    // console.log(slotCards);
    slotCards.forEach((element) => {
      element.addEventListener("click", () => {
        console.log(element.dataset.id);
        appendSlots(element.dataset.id);
        handleClickOnEditAndDeleteBtn();
      });
    });
  }

  let slotContainer = document.getElementById("slot-card-container");
  slotContainer.innerHTML = `<h1> Select a date to see your slots. </h1>`;
  function appendSlots(id) {
    let selectedSlotArr = segregatedDateObject[id];
    slotContainer.innerHTML = `
    ${selectedSlotArr
      .map((el, index) => {
        console.log("element is :", el);
        return slotCard(
          el.id,
          el.slot_timing[0],
          el.slot_timing[1],
          id,
          el.studentEmail,
          el.isBooked
        );
      })
      .join(" ")}
    `;
  }

  // Slot card part here
  function slotCard(
    id,
    startTime,
    endTime,
    dateMonthYear,
    studentEmail,
    isBooked
  ) {
    // console.log(--count);
    // console.log("after click in the dele:", ++count);
    return `<div class="slot-card" data-id="${id}" data-date="${dateMonthYear}" data-starttime="${startTime}" data-endtime="${endTime}"  id="${
      isBooked ? "true" : "false"
    }" >
            <h3>${startTime} to ${endTime}</h3>
            <h3 id="booked">${isBooked ? "Booked" : ""}</h3>
            <h3>${isBooked ? "Booked by " + studentEmail : ""}</h3>
            <button data-id = "${id}" data-date="${dateMonthYear}" id = "delete_btn">Delete Slot</button>
          </div>`;
  }

  function handleClickOnEditAndDeleteBtn() {
    let deleteButtons = document.querySelectorAll("#delete_btn");

    deleteButtons.forEach((eleement) => {
      eleement.addEventListener("click", () => {
        deleteFunction(eleement.dataset.id);
      });
    });
  }

  function deleteFunction(id) {
    fetch(`${url}/slot/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        fetchTutorData();
        showSlots();
      })
      .catch((error) =>
        console.log("Some Error while deleting the slot :", error)
      );
  }
}
fetchTutorData();
