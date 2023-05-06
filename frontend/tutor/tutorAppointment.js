// let arr = [
//   { date: 12, day: "Monday", month: "Jan", year: 2024, slots: 5 },
//   { date: 13, day: "Monday", month: "Feb", year: 2024, slots: 5 },
//   { date: 14, day: "Monday", month: "Jan", year: 2024, slots: 5 },
//   { date: 15, day: "Monday", month: "Feb", year: 2024, slots: 5 },
//   { date: 16, day: "Monday", month: "Jan", year: 2024, slots: 5 },
//   { date: 17, day: "Monday", month: "Feb", year: 2024, slots: 5 },
// ];

fetch("http://localhost:8080/slot/get-all")
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    appendTheSlotCardToDom(res);
  })
  .catch((error) => {
    console.log("some error while getting the slots :", error);
  });

let dateCardContainer = document.getElementById("card-container");

function appendTheSlotCardToDom(arr) {
  dateCardContainer.innerHTML = `
  ${arr
    .map((element) => {
      return dateCard(
        element.day,
        element.date,
        element.month,
        element.year,
        arr.length
      );
    })
    .join(" ")}`;
}

function dateCard(day, date, month, year, slots) {
  return `
<div class="date-select-card">
  <h3>${day}</h3>
  <h3>${date}</h3>
  <h3>${month}</h3>
  <h3>${year}</h3>
  <h3>Slots : ${slots}</h3>
</div>
`;
}

// Slot card part here

let time = ["11:00", "12:40", "14:20", "15:10", "16:00"];
let slotContainer = document.getElementById("slot-card-container");
slotContainer.innerHTML = `${time
  .map((el) => {
    return slotCard(el);
  })
  .join(" ")}`;

function slotCard(time) {
  return `<div class = "slot-card">
            <h3>${time} </h3>
       </div>`;
}
