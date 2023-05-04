let tutors = document.getElementById("tutors");
// Fetching the data from the Tutor-Route

fetch("http://localhost:8080/teachers/all")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    TutorsDomain(data);
  });

function TutorsDomain(data) {
  tutors.innerHTML = `${data
    .map((element, index) =>
      tutorCard(
        element.name,
        element.designation,
        element.subjects,
        element.description,
        element.address,
        element.workingHrs,
        element.experience,
        element.teachingExp
      )
    )
    .join(" ")}`;
}

function tutorCard(
  name,
  designation,
  subjects,
  description,
  address,
  workingHrs,
  experience,
  teachingExp
) {
  return `
    <div class="tutor-box">
                    <div class="tutorIndividual">
                        <div class="name">
                            <h2>${name}</h2>
                            <h4>${designation}</h4>
                        </div>
                        <div class="sub">
                            <h5>${subjects[0].name}</h5>
                            <h5>${subjects[1].name}</h5>
                        </div>
                        <div class="desc">
                            <p>
                                ${description}
                            </p>
                        </div>
                        <div class="extraDetail">
                            <div class="logos">
                            <i class="uil uil-map-marker"></i>
                            <h6>${address}</h6>
                            </div>
                            <div class="logos">
                            <i class="uil uil-hourglass"></i>
                            <h6>${workingHrs} Hr</h6>
                            </div>
                            <div class="logos">
                            <i class="uil uil-clipboard"></i>
                            <h6>${experience} yrs</h6>
                            </div>
                            <div class="logos">
                            <i class="uil uil-presentation-edit"></i>
                            <h6>${teachingExp} yrs</h6>
                            </div>
                        </div>
                    </div>
                </div>
    `;
}

let userName = document.getElementById('userName')
userName.innerText = localStorage.getItem('user-name');