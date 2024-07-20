const form = document.querySelector("form");
const showformBtn = document.querySelector(".show-form");

const firstnameInput = document.querySelector("#firstname");
const lastnameInput = document.querySelector("#lastname");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const universityInput = document.querySelector("#university");
const field_of_studyInput = document.querySelector("#field-of-study");
const experienceInput = document.querySelector("#experience");
const why_joinInput = document.querySelector("#why-join");
const submitBtn = document.querySelector(".submit-btn[type='submit']");
const nextBtn = document.querySelectorAll(".submit-btn[type='button']");
const backbtn = document.querySelector(".back-btn");
const section1 = document.querySelector(".section-1");
const section2 = document.querySelector(".section-2");
const section3 = document.querySelector(".section-3");
const progress = document.querySelectorAll(".circle");
const alert = document.querySelector(".alert");

var sectionNumber = 1;

function toggleSection(sectionNumber) {
  if (sectionNumber === 2) {
    section2.style.height = "fit-content";
    section2.style.opacity = 1;
    section3.style.height = 0;
    section3.style.opacity = 0;
    section1.style.height = 0;
    section1.style.opacity = 0;
  } else if (sectionNumber === 1) {
    section1.style.height = "fit-content";
    section1.style.opacity = 1;
    section2.style.height = 0;
    section2.style.opacity = 0;
    section3.style.height = 0;
    section3.style.opacity = 0;
  } else if (sectionNumber === 3) {
    section3.style.height = "fit-content";
    section3.style.opacity = 1;
    section2.style.height = 0;
    section2.style.opacity = 0;
    section1.style.height = 0;
    section1.style.opacity = 0;
  }
}

function backSection() {
  // Check if both elements exist
  if (section1 && section2 && section3) {
    // Toggle display style between 'none' and 'block'
    if (sectionNumber > 1) {
      sectionNumber--;
      toggleSection(sectionNumber);
      updateProgress();
    }
  } else {
    console.error("One or both sections not found");
  }
}

function nextSection() {
  // Check if both elements exist
  if (section1 && section2 && section3) {
    // Toggle display style between 'none' and 'block'
    if (sectionNumber <= 3) {
      sectionNumber++;
      toggleSection(sectionNumber);
      updateProgress();
    }
  } else {
    console.error("One or both sections not found");
  }
}

function updateProgress() {
  progress.forEach((circle, idx) => {
    if (idx < sectionNumber) {
      circle.classList.add("active-circle");
    } else {
      circle.classList.remove("active-circle");
    }
  });
}

function checkSubmitedData() {
  if (
    firstnameInput.value === "" ||
    lastnameInput.value === "" ||
    emailInput.value === "" ||
    phoneInput.value === "" ||
    universityInput.value === "" ||
    field_of_studyInput.value === "" ||
    experienceInput.value === "" ||
    why_joinInput.value === ""
  ) {
    alert.style.opacity = 1;
    alert.textContent = "Please fill in all fields !!";
  } else {
    alert.style.opacity = 0;
  }
}



nextBtn.forEach((btn) => {
  btn.addEventListener("click", nextSection);
})
backbtn.addEventListener("click", backSection);

if (submitBtn) {
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    checkSubmitedData();
    var selectedGrade = document.querySelector(
      'input[name="grade-level"]:checked'
    ).value;
    
    let data = {
      firstname: firstnameInput.value,
      lastname: lastnameInput.value,
      email: emailInput.value,
      phone: phoneInput.value,
      university: universityInput.value,
      grade_level: selectedGrade,
      field_of_study: field_of_studyInput.value,
    };

    console.log(data);
  });
}
