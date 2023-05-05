document.addEventListener("DOMContentLoaded", function() {
  var skil = document.getElementById("skil");
  var line = document.getElementById("line");
  var abut = document.getElementById("abut");
  var exp = document.getElementById("exp");

  
  skil.addEventListener("click", function() {
    skil.classList.add("active");
    line.classList.remove("active");
    abut.classList.remove("active");
    exp.classList.remove("active");
    var about_s = document.getElementById("about_s");
    var contact_s = document.getElementById("contact_s");
    var skils = document.getElementById("skils");
    var EXP = document.getElementById("EXP");
    about_s.classList.remove("b");
    about_s.classList.add("a");
    skils.classList.remove("a");
    skils.classList.add("b");
    EXP.classList.remove("b");
    EXP.classList.add("a");
    contact_s.classList.remove("b");
    contact_s.classList.add("a");
  });
});
document.addEventListener("DOMContentLoaded", function() {
  var abut = document.getElementById("abut");
  var skil = document.getElementById("skil");
  var line = document.getElementById("line");
  var exp = document.getElementById("exp");

  
  abut.addEventListener("click", function() {
    abut.classList.add("active");
    line.classList.remove("active");
    skil.classList.remove("active");
    exp.classList.remove("active");
    var about_s = document.getElementById("about_s");
    var contact_s = document.getElementById("contact_s");
    var skils = document.getElementById("skils");
    var EXP = document.getElementById("EXP");
    about_s.classList.remove("a");
    about_s.classList.add("b");
    skils.classList.remove("b");
    skils.classList.add("a");
    EXP.classList.remove("b");
    EXP.classList.add("a");
    contact_s.classList.remove("b");
    contact_s.classList.add("a");
  });
});

document.addEventListener("DOMContentLoaded", function() {
  var abut = document.getElementById("abut");
  var skil = document.getElementById("skil");
  var line = document.getElementById("line");
  var exp = document.getElementById("exp");

  
  line.addEventListener("click", function() {
    abut.classList.remove("active");
    line.classList.add("active");
    skil.classList.remove("active");
    exp.classList.remove("active");
    var about_s = document.getElementById("about_s");
    var contact_s = document.getElementById("contact_s");
    var skils = document.getElementById("skils");
    var EXP = document.getElementById("EXP");
    about_s.classList.remove("b");
    about_s.classList.add("a");
    skils.classList.remove("b");
    skils.classList.add("a");
    EXP.classList.remove("b");
    EXP.classList.add("a");
    contact_s.classList.remove("a");
    contact_s.classList.add("b");
  });
});

document.addEventListener("DOMContentLoaded", function() {
  var abut = document.getElementById("abut");
  var skil = document.getElementById("skil");
  var line = document.getElementById("line");
  var exp = document.getElementById("exp");

  
  exp.addEventListener("click", function() {
    abut.classList.remove("active");
    line.classList.remove("active");
    skil.classList.remove("active");
    exp.classList.add("active");
    var about_s = document.getElementById("about_s");
    var contact_s = document.getElementById("contact_s");
    var skils = document.getElementById("skils");
    var EXP = document.getElementById("EXP");
    about_s.classList.remove("b");
    about_s.classList.add("a");
    skils.classList.remove("b");
    skils.classList.add("a");
    EXP.classList.remove("a");
    EXP.classList.add("b");
    contact_s.classList.remove("b");
    contact_s.classList.add("a");
  });
});
