'use script';
// i/p and o/p elements
const usernameEle = document.getElementById('username-inp');
const emailEle = document.getElementById('email-inp');
const phoneEle = document.getElementById('phone-inp');
const dobEle = document.getElementById('date-inp');
const genderEle = document.querySelectorAll('input[name = "gender"]');
const languageEle = document.querySelectorAll('input[type = "checkbox"');
const fileEle = document.getElementById('file-inp');
const rangeEle = document.getElementById('range-inp');
const linkedInEle = document.getElementById('url-inp');

const submitBtnEle = document.getElementById('submit-inp');
const resetBtnEle = document.getElementById('reset-inp');

// profile elements
const profileContainerEle = document.querySelector('.profile-container');

// gv variable
let data = [];
let isEditable = false;
let toggleMode = true;

// functions
function init(){
  emptyInputFields();
}

const addData = () => {
  let item = {};
  item.id = Date.now();
  item.username = usernameEle.value;
  item.email = emailEle.value;
  item.phoneNo = phoneEle.value;
  item.dob = dobEle.value;
  item.file = fileEle.files[0].name;
  item.knowledge = rangeEle.value;
  item.linkedIn = linkedInEle.value;
  for (let i = 0; i < genderEle.length; i++) {
    if (genderEle[i].checked === true) {
      item.gender = genderEle[i].value;
    }
  }
  let langArr = [];
  for (let i = 0; i < languageEle.length; i++) {
    if (languageEle[i].checked === true) {
      langArr.push(languageEle[i].value);
    }
    item.language = langArr;
  }
  item.isDisabled = true,
  item.btnValue = "Edit";
  data.push(item);
}

const createDOM = ()=>{
  profileContainerEle.innerHTML = null;
  if(!isEditable){
    addData();
  }
  data.forEach((element)=>{
    let userCardElement = document.createElement('div');
    userCardElement.setAttribute('class',`user`);
    userCardElement.setAttribute('id',element.id);
    if(element.isDisabled){
      userCardElement.innerHTML = `
    <h2 class="profile-title">User  Details</h2>
    <input type="text" class="user-profile-name"
    value=${element.username}
    disabled= ${element.isDisabled}>
    <input type="email" 
    class="user-email"
    value=${element.email}
    disabled= ${element.isDisabled}>
    <input type="number" class="user-phone"
    value=${element.phoneNo}
    disabled= ${element.isDisabled}>
    <input type="date" class="user-dob" value=${element.dob} disabled=${element.isDisabled}>
    <div class="hidden-container">
      <div class="form-input">
        <p class="gender-inp">Gender</p>
        <hr class="user-gender-underline">
        <div class="form-radio-input">
          <input type="radio" name="gender" id="user-male-inp" class="user-male-inp" value="male"
          disabled=${element.isDisabled}
          ${(element.gender === "male") ? "checked" : ""}>
          <label for="user-male-inp">Male</label>
        </div>
        <div class="form-radio-input">
          <input type="radio" name="gender" id="user-female-inp" class="user-female-inp" value="female"
          disabled=${element.isDisabled}
          ${(element.gender === "female") ? "checked" : ""}>
        <label for="user-female-inp">Female</label>
        </div>
      </div>
      <div class="form-input">
        <p class="checkbox-description">
          Choose any languages
        </p>
        <hr class="user-language-underline">
        <div class="form-checkbox-input">
          <input type="checkbox" name="language1" id="tamil-inp" class="user-tamil-inp" value="tamil"
          ${element.language.includes("tamil") ? "checked" : ""}
          disabled=${element.isDisabled}
          >
        <label for="user-tamil-inp">Tamil</label>
        </div>
        <div class="form-checkbox-input">
          <input type="checkbox" name="language2" id="english-inp" class="user-english-inp" value="English"
          ${element.language.includes("English") ? "checked" : ""}
          disabled=${element.isDisabled}
          >
        <label for="user-english-inp">English</label>
        </div>
        <div class="form-checkbox-input">
          <input type="checkbox" name="language3" id="hindi-inp" class="user-hindi-inp" value="hindi"
          ${element.language.includes("hindi") ? "checked" : ""}
          disabled=${element.isDisabled}
          >
          <label for="user-hindi-inp">Hindi</label>
        </div>
      </div>
      <div class="form-input">
        <label for="user-file-inp">Select a file</label>
        <input type="file" name="file" id="user-file-inp" class="user-file-inp"
        disabled=${element.isDisabled}
        >
      </div>
      <div class="form-input">
        <label for="user-range-inp">Coding knowledge</label>
        <input type="range" name="range" id="user-range-inp" class="user-range-inp" min="1" max="5" value=${element.knowledge}
        disabled=${element.isDisabled}
        >
      </div>
      <input type="url" name="url" id="url-inp" class="user-url-inp" placeholder="Enter URL" value=${element.linkedIn}
      disabled=${element.isDisabled}>
        </div>
      <input type="button" value=${element.btnValue} class="edit-btn" id="edit-btn" onclick="updateDOM(${element.id})">
      <input type="button" value="Delete" class="delete-btn" id="delete-btn"
    onclick="deleteDOM(${element.id})">
  `;
    }else{
      userCardElement.innerHTML = `
      <h2 class="profile-title">User  Details</h2>
      <input type="text" class="user-profile-name"
      value=${element.username}>
      <input type="email" 
      class="user-email"
      value=${element.email}
      >
      <input type="number" class="user-phone"
      value=${element.phoneNo}
      >
      <input type="date" class="user-dob" value=${element.dob}>
      <div class="hidden-container">
        <div class="form-input">
          <p class="gender-inp">Gender</p>
          <hr class="user-gender-underline">
          <div class="form-radio-input">
            <input type="radio" name="gender" id="male-inp" class="user-male-inp" value="male"
            ${(element.gender === "male") ? "checked" : ""}
            >
            <label for="user-male-inp">Male</label>
          </div>
          <div class="form-radio-input">
            <input type="radio" name="gender" id="user-female-inp" class="female-inp" value="female"
            ${(element.gender === "female") ? "checked" : ""}
            >
          <label for="user-female-inp">Female</label>
          </div>
        </div>
        <div class="form-input">
          <p class="checkbox-description">
            Choose any languages
          </p>
          <hr class="user-language-underline">
          <div class="form-checkbox-input">
            <input type="checkbox" name="language1" id="user-tamil-inp" class="tamil-inp" value="tamil"
            ${element.language.includes("tamil") ? "checked" : ""}
            >
          <label for="user-tamil-inp">Tamil</label>
          </div>
          <div class="form-checkbox-input">
            <input type="checkbox" name="language2" id="user-english-inp" class="english-inp" value="English"
            ${element.language.includes("English") ? "checked" : ""}
            >
          <label for="user-english-inp">English</label>
          </div>
          <div class="form-checkbox-input">
            <input type="checkbox" name="language3" id="user-hindi-inp" class="hindi-inp" value="hindi"
            ${element.language.includes("hindi") ? "checked" : ""}
            >
            <label for="user-hindi-inp">Hindi</label>
          </div>
        </div>
        <div class="form-input">
          <label for="user-file-inp">Select a file</label>
          <input type="file" name="file" id="user-file-inp" class="user-file-inp"
          >
        </div>
        <div class="form-input">
          <label for="user-range-inp">Coding knowledge</label>
          <input type="range" name="range" id="user-range-inp" class="user-range-inp" min="1" max="5" value=${element.knowledge}
          >
        </div>
        <input type="url" name="url" id="url-inp" class="user-url-inp" placeholder="Enter URL" 
        value=${element.linkedIn}
        >
      </div>
      <input type="button" value=${element.btnValue} class="edit-btn" id="edit-btn" onclick="updateDOM(${element.id})">
      <input type="button" value="Delete" class="delete-btn" id="delete-btn"
      onclick="deleteDOM(${element.id})">
  `;
    }
    profileContainerEle.appendChild(userCardElement);
  })
}

const emptyInputFields = () =>{
  usernameEle.value = "";
  emailEle.value = "";
  phoneEle.value = "";
  dobEle.value = "";
  for (let i = 0; i < genderEle.length; i++) {
    genderEle[i].checked = false;
  }
  for (let i = 0; i < languageEle.length; i++) {
    languageEle[i].checked = false;
  }
  rangeEle.value = 1;
  fileEle.value = "";
  linkedInEle.value = "";
}

// edit feature
const updateDOM = (id) =>{
  if(toggleMode){
    editDOM(id);
  }else{
    saveDOM(id);
  }
}

const editDOM = (id)=>{
  console.log('145')
  isEditable = true;
  data.forEach((element)=>{
    if(element.id === id){
      element.isDisabled = false;
      element.btnValue = "Save";
    }
  })
  console.log(data);
  createDOM();
  isEditable = false;
  toggleMode = toggleMode ? false : true;
}

const saveDOM = (id)=>{
  isEditable = true;
  const profileUsername = document.querySelector('.user-profile-name');
  const profileEmail = document.querySelector('.user-email');
  const profileNumber = document.querySelector('.user-phone');
  const profileDOB = document.querySelector('.user-dob');
  const profileFileEle = document.querySelector('.user-file-inp');
  const profileRangeEle = document.querySelector('.user-range-inp');
  const profileGenderEle = document.querySelectorAll('.form-radio-input');
  const profileLanguageEle = document.querySelectorAll('.form-radio-input');
  if(isEditable){
    data.forEach((element)=>{
      if(element.id === id){
        element.username = profileUsername.value;
        element.email = profileEmail.value;
        element.phoneNo = profileNumber.value;
        element.dob = profileDOB.value;
        // element.file = profileFileEle.files[0].name;
        element.knowledge = profileRangeEle.value;
        element.linkedIn = linkedInEle.value;
        for (let i = 0; i < profileGenderEle.length; i++) {
          if (profileGenderEle[i].checked === true) {
            element.gender = profileGenderEle[i].value;
          }
        }
        let langArr = [];
        for (let i = 0; i < profileLanguageEle.length; i++) {
          if (profileLanguageEle[i].checked === true) {
            langArr.push(profileLanguageEle[i].value);
          }
          element.language = langArr;
        }
        element.isDisabled = true;
        element.btnValue = "Edit";
      }
    })
    createDOM();
    isEditable = false;
    toggleMode = toggleMode ? false : true;
  }
}

// delete features
const deleteDOM = (id) =>{
  isEditable = true;
  data = data.filter((element)=>{
    if(element.id != id){
      return element;
    }
  })
  createDOM();
  isEditable = false;
}

// event listeners
submitBtnEle.addEventListener('click', () => {
  createDOM();
  emptyInputFields();
})

resetBtnEle.addEventListener('click',()=>{
  emptyInputFields();
})

init();