  // timer
  let endTime = (Date.parse(new Date())+(2*60 * 60 * 1000));
  let secondsId = document.getElementById('seconds')
  let minutesId = document.getElementById('minutes')
  let hoursId = document.getElementById('hours')
  let userInfo = {}
  function timer(){
    let currentTime = endTime - Date.parse(new Date())
    let seconds = Math.floor( (currentTime/1000) % 60 ) < 10 ? '0'+Math.floor( (currentTime/1000) % 60 ) : Math.floor( (currentTime/1000) % 60);
    let minutes = Math.floor( (currentTime/1000/60) % 60 ) < 10 ? '0'+Math.floor( (currentTime/1000/60) % 60 ): Math.floor( (currentTime/1000/60) % 60 );
    let hours = Math.floor( (currentTime/(1000*60*60)) % 24 ) <10 ? '0' + Math.floor( (currentTime/(1000*60*60)) % 24 ) : Math.floor( (currentTime/(1000*60*60)) % 24 );
    secondsId.innerHTML = seconds
    minutesId.innerHTML = minutes
    hoursId.innerHTML = hours
    if(currentTime == 0){
      return
    }else{
      requestAnimationFrame(timer)
    }
    
  }
  timer()
    //end timer 



// start modal

let modalBtn = document.getElementById('modal-btn')
let modalWindow = document.getElementById('modal')
let steps = document.querySelectorAll('.steps')
let stepInHead = document.querySelectorAll('.step')
let closeModal = document.getElementById('close-modal')

modalBtn.onclick = function(){
  modal.classList.add("open-modal")
} 


function checkName(){
  if(event.target.value.length < 1){
    event.target.classList.add('wrong-input')
    userInfo[event.target.getAttribute('name')] = ''
  }else{
    event.target.classList.remove('wrong-input')
    event.target.classList.add('correct-input')
    userInfo[event.target.getAttribute('name')] = event.target.value
  }
  checkProgressStepOne()
}


function checkEmail(){
  if(event.target.value.indexOf('@') < 0){
    event.target.classList.add('wrong-input')
    userInfo[event.target.getAttribute('name')] = ''
  }else{
    event.target.classList.remove('wrong-input')
    event.target.classList.add('correct-input')
    userInfo[event.target.getAttribute('name')] = event.target.value
  }
  checkProgressStepOne()
}


function checkProgressStepOne(){
  let progressLength = 0
  for(property in userInfo){
    if(property == "name" || property == "surname" || property == "email"){
      if(userInfo[property]){
        progressLength += 33 
      }
    }
  }
  if(progressLength == 99) {
    progressLength = 100
    document.getElementById('step-one-btn').classList.add('active-step-btn')
    document.getElementById('step-one-btn').addEventListener('click', goToThesecondStep)
    }else{
      document.getElementById('step-one-btn').classList.remove('active-step-btn')
      document.getElementById('step-one-btn').removeEventListener('click', goToThesecondStep)
    }
  setProgressLengthStepOne(progressLength)
}

function setProgressLengthStepOne(length){
  let progressLine = document.getElementById('progress-bar-step-one-complete');
  document.getElementById('progress-bar-step-one-count').innerHTML = length >0? length+'%' : ""
  progressLine.style.width = length+"%"
}

function goToThesecondStep(){
  steps[0].style.transform = 'translateX(-100vw)'
  steps[1].style.transform = 'translateX(0)'
  stepInHead[0].classList.remove('active')
  stepInHead[1].classList.add('active')
}

function checkSkill(){
  userInfo.skill = event.target.getAttribute('data-target')
  checkProgressStepTwo()
}
function checkSerialNumber(){
  if(event.target.value.length < 1){
    event.target.classList.add('wrong-input')
    userInfo[event.target.getAttribute('name')] = ''
  }else{
    event.target.classList.remove('wrong-input')
    event.target.classList.add('correct-input')
    userInfo[event.target.getAttribute('name')] = event.target.value
  }
  checkProgressStepTwo()
}
function checkNumber(){
  if(event.target.value.length >= 7 && !isNaN(event.target.value)){
    event.target.classList.remove('wrong-input')
    event.target.classList.add('correct-input')
    userInfo[event.target.getAttribute('name')] = event.target.value
  }else{
    event.target.classList.add('wrong-input')
    userInfo[event.target.getAttribute('name')] = ''
    }
    checkProgressStepTwo()
}
function checkDate(){
  let months = ['січня',"лютого","березня","квітня","травня","червня","липня","серпня","вересня","жовтня","листопада","грудня"]
  let arr = event.target.value.toLowerCase().split(' ')
  if(isNaN(arr[0]) || months.indexOf(arr[1]) == -1 || isNaN(arr[2])){
    event.target.classList.add('wrong-input')
    userInfo[event.target.getAttribute('name')] = ''
  }else{
    event.target.classList.remove('wrong-input')
    event.target.classList.add('correct-input')
    userInfo[event.target.getAttribute('name')] = event.target.value
  }
  checkProgressStepTwo()
}
function checkProgressStepTwo(){
  let progressLength = 0
  for(property in userInfo){
    if(property == "skill" || property == "serialNumber" || property == "number" || property == "date"){
      if(userInfo[property]){
        progressLength += 25 
      }
    }

  }
  if(progressLength == 100){
    document.getElementById('step-two-btn').classList.add('active-step-btn')
    document.getElementById('step-two-btn').addEventListener('click', gotoTheThirdStep)
  }else{
    document.getElementById('step-two-btn').classList.remove('active-step-btn')
    document.getElementById('step-two-btn').addEventListener('click', gotoTheThirdStep)
  }
  setProgressLengthStepTwo(progressLength)
}

function setProgressLengthStepTwo(length){

  let progressLine = document.getElementById('progress-bar-step-two-complete');
  document.getElementById('progress-bar-step-two-count').innerHTML = length >0? length+'%' : ""
  progressLine.style.width = length+"%"
}

function gotoTheThirdStep(){
  let resultNameId = document.getElementById('result-persone-name')
  let resultDiplomaInfoId = document.getElementById('result-persone-diploma-info')
  let resultDayAndMonthId = document.getElementById('result-day-and-month')
  let resultYearId = document.getElementById('result-year')
  let resultSkillId = document.getElementById('result-skill')
  let name = userInfo.name +" "+ userInfo.surname;
  let diplomaInformation = userInfo.skill+', '+userInfo.serialNumber+' / '+userInfo.number
  let date = userInfo.date.split(' ')
  let dayAndMonth = date[0]+' '+ date[1]

  resultNameId.innerHTML = name
  resultDiplomaInfoId.innerHTML = diplomaInformation 
  resultDayAndMonthId.innerHTML = dayAndMonth
  resultYearId.innerHTML = date[2]
  resultSkillId.innerHTML = userInfo.skill

  steps[1].style.transform = 'translateX(-100vw)'
  steps[2].style.transform = 'translateX(0)'
  stepInHead[1].classList.remove('active')
  stepInHead[2].classList.add('active')
}


closeModal.onclick = function(){
  modal.classList.remove("open-modal")
  userInfo = {}
  checkProgressStepOne()
  checkProgressStepTwo()
  for(let input of document.querySelectorAll('.modal-form-input')){
    input.classList.remove('correct-input')
    input.classList.remove('wrong-input')
  }
  for(let checkbox of document.querySelectorAll('.checkbox')){
    console.log(checkbox)
    checkbox.checked = false
  }
  setTimeout(() => {
    steps[0].style.transform = 'translateX(0)'
    steps[1].style.transform = 'translateX(100vw)'
    steps[2].style.transform = 'translateX(100vw)'
  }, 200);
  stepInHead[2].classList.remove('active')
  stepInHead[1].classList.remove('active')
  stepInHead[0].classList.add('active')
  for(input of document.querySelectorAll(".modal-form-input")){
    input.value = ""
  }
}
//end modal