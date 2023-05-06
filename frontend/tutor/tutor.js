let userName = document.getElementById('userName')
userName.innerText = localStorage.getItem('user-name');

///filtering by state & subjects

let searchBtn = document.getElementById("searchBtn");
let subjectInput = document.getElementById("subjectInput");
let locationInput = document.getElementById("locationInput");
let filteredData=[]


searchBtn.addEventListener("click",()=>{
  filteredData=[];
  if(locationInput.value && subjectInput.value){
    storedData.data.forEach((element,i)=>{
     if((locationInput.value==element.state && subjectInput.value==element.subjects[0].name) || (locationInput.value==element.state && subjectInput.value==element.subjects[1].name) ) {
      filteredData.push(element) 
   }
    })
   // console.log(storedData.data)
   TutorsDomain(filteredData)
   locationInput.value=null;
   subjectInput.value=null
 }
  else if(subjectInput.value){
     storedData.data.forEach((element,i)=>{
      if(subjectInput.value==element.subjects[0].name || subjectInput.value==element.subjects[1].name ){
       filteredData.push(element) 
    }
     })
    // console.log(storedData.data)
   
    TutorsDomain(filteredData);
    subjectInput.value=null
  }
  else if(locationInput.value){
    storedData.data.forEach((element,i)=>{
     if(locationInput.value==element.state ){
      filteredData.push(element) 
   }
    })
   // console.log(storedData.data)
   TutorsDomain(filteredData);
   locationInput.value=null
 }

});

///filtering by state options

let statesbtn= document.querySelectorAll(".state")

statesbtn.forEach((btn,i)=>{

  btn.addEventListener("click",()=>{
    filteredData=[]
    storedData.data.forEach((element,i)=>{
      if(btn.innerText==element.state ){
       filteredData.push(element) 
    }
     })
     TutorsDomain(filteredData);
   
  })
})