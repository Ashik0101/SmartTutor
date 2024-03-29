const url = "https://dull-cyan-jellyfish-cuff.cyclic.app";
let segregatedDateObject = {};

function fetchData() {
  let segregatedDateObject = {};
  fetch(`${url}/slot/one-tutor/all/${localStorage.getItem("teacherEmail")}`, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res);
      if (res.length === 0) {
        document.querySelector(
          ".select-a-date-div"
        ).innerHTML = `<h1> No Slots Available for this Tutor </h1>`;
        document
          .querySelector(".select-a-date-div")
          .classList.add("select-a-date-div-after");
        document.querySelector(".avalable-slot-div").style.display = "none";
        document.querySelector(".selected-slot-div").style.display = "none";
        document.querySelector("#schedule-btn").style.display = "none";
        return;
      }
      let sortedArrBasedOnTiming = sortBasedOnTiming(res);
      let sortedArrBasedOnDateTimeAndYear = sortBasedOnDateMonthYear(
        sortedArrBasedOnTiming
      );
      segregateDateFunction(sortedArrBasedOnDateTimeAndYear);
      console.log(segregatedDateObject);
      convertObjIntoArray(segregatedDateObject);
      /*till here all the slots is updated */
      showSlots();
      // clickHandlerOnScheduleButton();
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
          { id: element._id, slot_timing: element.slot_timing },
        ];
      } else {
        segregatedDateObject[element.dateMonthName].push({
          id: element._id,
          slot_timing: element.slot_timing,
        });
      }
    });
  }

  /*converting segregated object into array */
  let dateCardContainer = document.getElementById("card-container");
  function convertObjIntoArray(obj) {
    const arr = Object.entries(obj).map(([key, value]) => [key, value]);
    console.log(arr);
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
      });
    });
  }

  let slotContainer = document.getElementById("slot-card-container");
  slotContainer.innerHTML = `<h1> Select a date to see the availabe slots. </h1>`;
  function appendSlots(id) {
    // console.log(segregatedDateObject);
    let selectedSlotArr = segregatedDateObject[id];
    slotContainer.innerHTML = `
    ${selectedSlotArr
      .map((el, index) => {
        return slotCard(el.id, el.slot_timing[0], el.slot_timing[1], id);
      })
      .join(" ")}
    `;
    clickHandlerOnSlots();
  }

  // Slot card part here
  function slotCard(id, startTime, endTime, dateMonthYear) {
    return `<div class="slot-card" data-id="${id}" data-date="${dateMonthYear}" data-starttime="${startTime}" data-endtime="${endTime}">
            <h3>${startTime} to ${endTime}</h3>
          </div>`;
  }

  function clickHandlerOnSlots() {
    let allSlots = document.querySelectorAll(".slot-card");
    // console.log(allSlots);
    allSlots.forEach((element) => {
      element.addEventListener("click", () => {
        // console.log(element.dataset.date);
        showTheSelectedSlot(
          element.dataset.starttime,
          element.dataset.endtime,
          element.dataset.id,
          element.dataset.date
        );
      });
    });
  }

  function showTheSelectedSlot(startTime, endTime, id, inputDate) {
    console.log(startTime, endTime, id, inputDate);
    document.getElementById("startTime").innerText = startTime;

    document.getElementById("endTime").innerText = endTime;
    const selectedDate = new Date(inputDate);
    let date = selectedDate.getDate();
    let month = monthNames[selectedDate.getMonth()];
    document.getElementById("date").innerText = date;
    document.getElementById("to").innerText = "to";
    document.getElementById("month").innerText = month;
    clickHandlerOnScheduleButton(id);
  }

  function clickHandlerOnScheduleButton(id) {
    document.getElementById("schedule-btn").addEventListener("click", () => {
      patchIsBookToTrueFunction(id);
    });
  }

  function patchIsBookToTrueFunction(id) {
    fetch(`${url}/slot/book/${id}`, {
      method: "PATCH",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((res) => {
        console.log(res);
        // alert(res.msg);

        if (res.msg == "Please Login First" || res.msg == "Invalid Token") {
          return (window.location.href = "../signup.html");
        }
        // fetchData();
        // showSlots();
        location.href = "../payment.html";
        // sendEmail();
      })
      .catch((error) => {
        console.log(
          "some error while booking the slot from catch block :",
          error
        );
      });
  }
}
fetchData();
function showTeacherName() {
  let teacherNameShower = document.getElementById("tutor-name");
  teacherNameShower.innerText = `${localStorage.getItem("teacherName")}`;
  document.getElementById("subject-name").innerText = `${localStorage.getItem(
    "firstSubject"
  )} and ${localStorage.getItem("secondSubject")}`;

  function sendEmail() {
    let tutorEmail = localStorage.getItem("teacherEmail");
    let studentEmail = localStorage.getItem("studentEmail");
    console.log(tutorEmail, studentEmail);
  }
}
showTeacherName();
