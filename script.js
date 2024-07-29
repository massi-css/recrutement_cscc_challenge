const firstnameInput = document.querySelector("#firstname");
const lastnameInput = document.querySelector("#lastname");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const universityInput = document.querySelector("#university");
const field_of_studyInput = document.querySelector("#field-of-study");
const sientificInterestsInput = document.querySelector("#interests");
const experienceInput = document.querySelector("#experience");
const why_joinInput = document.querySelector("#why-join");
const grade_levelInputs = document.querySelectorAll(
  'input[name="grade-level"]'
);
const submitBtn = document.querySelector(".submit-btn[type='submit']");
const nextBtn = document.querySelectorAll(".submit-btn[type='button']");
const backbtn = document.querySelector(".back-btn");
const section1 = document.querySelector(".section-1");
const section2 = document.querySelector(".section-2");
const section3 = document.querySelector(".section-3");
const progress = document.querySelectorAll(".circle");
const alert = document.querySelector(".alert");
const sliderNavs = document.querySelectorAll(".slider-nav a");
const showformBtn = document.querySelector(".show-form");

const localStorage = window.localStorage;
var sectionNumber = localStorage.getItem("sectionNumber") || 1;

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

function saveToLocalStorage() {
  const selectedGrade = document.querySelector(
    'input[name="grade-level"]:checked'
  )?.value;
  console.log("Saved to local storage");
  data = {
    sectionNumber: sectionNumber,
    firstname: firstnameInput.value,
    lastname: lastnameInput.value,
    email: emailInput.value,
    phone: phoneInput.value,
    university: universityInput.value,
    field_of_study: field_of_studyInput.value,
    Scientific_interests: sientificInterestsInput.value,
    experience: experienceInput.value,
    why_join: why_joinInput.value,
    grade_level: selectedGrade,
  };
  localStorage.setItem("data", JSON.stringify(data));
}

function loadFromLocalStorage() {
  if (localStorage.getItem("data")) {
    let data = JSON.parse(localStorage.getItem("data"));
    sectionNumber = data.sectionNumber;
    firstnameInput.value = data.firstname;
    lastnameInput.value = data.lastname;
    emailInput.value = data.email;
    phoneInput.value = data.phone;
    universityInput.value = data.university;
    field_of_studyInput.value = data.field_of_study;
    experienceInput.value = data.experience;
    why_joinInput.value = data.why_join;
    sientificInterestsInput.value = data.Scientific_interests;
    grade_levelInputs.forEach((input) => {
      if (input.value === data.grade_level) {
        input.checked = true;
      }
    });
    toggleSection(sectionNumber);
    updateProgress();
  }
}
function backSection() {
  if (section1 && section2 && section3) {
    if (sectionNumber > 1) {
      sectionNumber--;
      toggleSection(sectionNumber);
      updateProgress();
      saveToLocalStorage();
    }
  } else {
    console.error("One or both sections not found");
  }
}

function nextSection() {
  if (section1 && section2 && section3) {
    if (sectionNumber < 3) {
      sectionNumber++;
      toggleSection(sectionNumber);
      updateProgress();
      saveToLocalStorage();
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
  const selectedGrade = document.querySelector(
    'input[name="grade-level"]:checked'
  )?.value;
  if (
    firstnameInput.value === "" ||
    lastnameInput.value === "" ||
    emailInput.value === "" ||
    phoneInput.value === "" ||
    universityInput.value === "" ||
    field_of_studyInput.value === "" ||
    experienceInput.value === "" ||
    why_joinInput.value === "" ||
    sientificInterestsInput.value === "" ||
    selectedGrade === "" ||
    selectedGrade === undefined
  ) {
    alert.style.opacity = 1;
    alert.textContent = "Please fill in all fields !!";
    return false;
  } else {
    alert.style.opacity = 0;
    return true;
  }
}

async function sendData(data) {
  const sidebg = document.querySelector(".side-bg");
  const sidebgTitle = document.querySelector(".side-bg .title");
  const sidebgSubTitle = document.querySelector(".side-bg .sub-title");

  // let serverOrigin = "http://localhost:5000";
  let serverOrigin = "https://recrutement-cscc-challenge-server.onrender.com";

  console.log("Sending data to server");
  try {
    // const response = await axios.post("http://localhost:5000/register", data);
    // console.log(response.data);
    const response = await fetch(`${serverOrigin}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const message = await response.text();
    if (response.status === 201) {
      alert.style.opacity = 1;
      alert.style.backgroundColor = "green";
      alert.textContent = message;
      localStorage.clear();
      document.querySelector(".form-content").reset();
      // confetti();
      sidebg.style.width = "100%";
      sidebgTitle.innerHTML = "thank you for joining us";
      sidebgSubTitle.innerHTML = "your data has been submited successfully ";
      showformBtn.style.display = "none";

      const colors = ["#bb0000", "#ffffff"];

      (function frame() {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
        });
        requestAnimationFrame(frame);
      })();
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

function smoothScrollSlide(e) {
  e.preventDefault();

  const targetId = this.getAttribute("href").substring(1);
  const targetElement = document.getElementById(targetId);

  targetElement.scrollIntoView({
    behavior: "smooth",
    block: "nearest",
    inline: "start",
  });
}

function setActiveNav(id) {
  sliderNavs.forEach((nav) => {
    nav.classList.remove("active");
  });
  sliderNavs.forEach((nav) => {
    if (nav.getAttribute("href") === `#slider-${id}`) {
      nav.classList.add("active");
    }
  });
}

function slideNext(id) {
  if (id === sliderNavs.length + 1) {
    return;
  } else {
    setTimeout(() => {
      sliderNavs.forEach((nav) => {
        if (nav.getAttribute("href") === `#slider-${id}`) {
          nav.click();
          setActiveNav(id);
        }
      });
      slideNext(id + 1);
    }, 7000);
  }
}

function showForm() {
  const sidebg = document.querySelector(".side-bg");
  const slideContainer = document.querySelector(".slide-container");
  const formContainer = document.querySelector(".form-container");
  const sidebgTitle = document.querySelector(".side-bg .title");
  const sidebgSubTitle = document.querySelector(".side-bg .sub-title");
  if (showformBtn.innerHTML === "go back") {
    sidebg.style.left = "60%";
    sidebg.style.background =
      "linear-gradient(to left, #202068 70%, transparent)";
    slideContainer.style.visibility = "visible";
    slideContainer.style.pointerEvents = "all";
    formContainer.style.visibility = "hidden";
    formContainer.style.opacity = 0;
    showformBtn.innerHTML = "Join us";
    sidebgTitle.innerHTML = "Hello there!";
    sidebgSubTitle.innerHTML = "We are happy to see you here";
  } else {
    sidebg.style.left = "0%";
    sidebg.style.background = "#202068";
    slideContainer.style.visibility = "hidden";
    slideContainer.style.pointerEvents = "none";
    formContainer.style.visibility = "visible";
    formContainer.style.opacity = 1;
    showformBtn.innerHTML = "go back";
    sidebgTitle.innerHTML =
      "Registration Form for joining cscc club 2024 / 2025";
    sidebgSubTitle.innerHTML =
      "are you ready to join us? fill the next form and start your new journey with us ! we are waiting for you !!";
  }
}

showformBtn.addEventListener("click", showForm);

slideNext(1);
setInterval(() => slideNext(1), 7000 * sliderNavs.length);

sliderNavs.forEach((anchor) => {
  anchor.addEventListener("click", smoothScrollSlide);
});

loadFromLocalStorage();

nextBtn.forEach((btn) => {
  btn.addEventListener("click", nextSection);
});
backbtn.addEventListener("click", backSection);

if (submitBtn) {
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (checkSubmitedData()) {
      selectedGrade = document.querySelector(
        'input[name="grade-level"]:checked'
      )?.value;

      let data = {
        firstname: firstnameInput.value,
        lastname: lastnameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        university: universityInput.value,
        grade_level: selectedGrade,
        experience: experienceInput.value,
        why_join: why_joinInput.value,
        Scientific_interests: sientificInterestsInput.value,
        field_of_study: field_of_studyInput.value,
      };

      console.log(data);
      submitBtn.disabled = true;
      submitBtn.innerHTML = "Submitting...";
      sendData(data);
      submitBtn.disabled = false;
      submitBtn.innerHTML = "Submit";
    }
  });
}
