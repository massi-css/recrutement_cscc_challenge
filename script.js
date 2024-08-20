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
const RangeInputs = document.querySelectorAll("input[type='range']");
const submitBtn = document.querySelector(".submit-btn[type='submit']");
const nextBtn = document.querySelectorAll(".submit-btn[type='button']");
const backbtn = document.querySelector(".back-btn");
const section1 = document.querySelector(".section-1");
const section2 = document.querySelector(".section-2");
const section3 = document.querySelector(".section-3");
const section4 = document.querySelector(".section-4");
const progress = document.querySelectorAll(".circle");
const alert = document.querySelector(".alert");
const sliderNavs = document.querySelectorAll(".slider-nav a");
const showformBtn = document.querySelector(".show-form");

const localStorage = window.localStorage;
var sectionNumber = localStorage.getItem("sectionNumber") || 1;

// it toggles between sections
function toggleSection(sectionNumber) {
  if (sectionNumber === 2) {
    section2.style.height = "fit-content";
    section2.style.opacity = 1;
    section3.style.height = 0;
    section3.style.opacity = 0;
    section1.style.height = 0;
    section1.style.opacity = 0;
    section4.style.height = 0;
    section4.style.opacity = 0;
  } else if (sectionNumber === 1) {
    section1.style.height = "fit-content";
    section1.style.opacity = 1;
    section2.style.height = 0;
    section2.style.opacity = 0;
    section3.style.height = 0;
    section3.style.opacity = 0;
    section4.style.height = 0;
    section4.style.opacity = 0;
  } else if (sectionNumber === 3) {
    section3.style.height = "fit-content";
    section3.style.opacity = 1;
    section2.style.height = 0;
    section2.style.opacity = 0;
    section1.style.height = 0;
    section1.style.opacity = 0;
    section4.style.height = 0;
    section4.style.opacity = 0;
  } else if (sectionNumber === 4) {
    section4.style.height = "fit-content";
    section4.style.opacity = 1;
    section2.style.height = 0;
    section2.style.opacity = 0;
    section1.style.height = 0;
    section1.style.opacity = 0;
    section3.style.height = 0;
    section3.style.opacity = 0;
  }
}

async function alertMessage(message, color) {
  alert.style.opacity = 1;
  alert.style.backgroundColor = color;
  alert.textContent = message;
  await new Promise((resolve) => setTimeout(resolve, 2000));
  alert.style.opacity = 0;
}

// retrieves the user's evaluation and transform numerique values into string values (programing languages)
function getProgrammingLanguagesRatings() {
  const checkboxes = sientificInterestsInput.querySelectorAll(
    'input[type="checkbox"]'
  );

  const checkedCheckboxes = Array.from(checkboxes).filter(
    (checkbox) => checkbox.checked
  );

  const languageRatings = new Map();

  checkedCheckboxes.forEach((checkbox) => {
    let language = "";
    let ratingValue = parseInt(checkbox.value);
    const checkboxId = checkbox.id.toLowerCase();

    if (checkboxId.startsWith("c")) {
      language = "C";
    } else if (checkboxId.startsWith("java")) {
      language = "Java";
    } else if (checkboxId.startsWith("python")) {
      language = "Python";
    } else if (checkboxId.startsWith("js")) {
      language = "JavaScript";
    } else if (checkboxId.startsWith("php")) {
      language = "PHP";
    }

    if (
      !languageRatings.has(language) ||
      languageRatings.get(language) < ratingValue
    ) {
      languageRatings.set(language, ratingValue);
    }
  });

  const ratings = Array.from(languageRatings.entries()).map(
    ([language, ratingValue]) => {
      let rating = "";

      switch (ratingValue) {
        case 1:
          rating = "Beginner";
          break;
        case 2:
          rating = "Intermediate";
          break;
        case 3:
          rating = "Advanced";
          break;
        case 4:
          rating = "Expert";
          break;
        default:
          rating = "Unknown";
      }

      return { language, rating };
    }
  );

  return ratings;
}

// load the data from local storage to the form (after transfoming it from string value to nuemric one) (programing laguages)
function loadProgrammingLanguagesRatings(data) {
  const checkboxes = sientificInterestsInput.querySelectorAll(
    'input[type="checkbox"]'
  );
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });

  data.length > 0
    ? data.forEach(({ language, rating }) => {
        let ratingValue = 0;

        switch (rating) {
          case "Beginner":
            ratingValue = 1;
            break;
          case "Intermediate":
            ratingValue = 2;
            break;
          case "Advanced":
            ratingValue = 3;
            break;
          case "Expert":
            ratingValue = 4;
            break;
          default:
            ratingValue = 0;
        }

        let checkboxes = sientificInterestsInput
          .querySelectorAll(`input[name=${language.toLowerCase()}]`)
          .forEach((checkbox) => {
            if (parseInt(checkbox.value) <= ratingValue) {
              checkbox.checked = true;
            }
          });
      })
    : null;
}

// transforms the numeric value of preferences range input to string value
function rangeToValue(value) {
  switch (value) {
    case "0":
      return "I don't want it";

    case "1":
      return "not really";

    case "2":
      return "i don't know";

    case "3":
      return "I want it";

    case "4":
      return "I really want it";
    default:
      return "I don't know";
  }
}

// transforms the string value of preferences range input to numeric value
function valueToRange(text) {
  switch (text) {
    case "I don't want it":
      return "0";

    case "not really":
      return "1";

    case "i don't know":
      return "2";

    case "I want it":
      return "3";

    case "I really want it":
      return "4";

    default:
      return "2";
  }
}

// retrieves the user's preferences and transform numerique values into string values (departements'input)
function getDepValues() {
  let desires = [];
  RangeInputs.forEach((rangeInput) => {
    desires.push({
      depName: rangeInput.name,
      depValue: rangeToValue(rangeInput.value),
    });
  });
  return desires;
}

// saves the current form data into localstorage
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
    Scientific_interests: getProgrammingLanguagesRatings() || [],
    experience: experienceInput.value,
    why_join: why_joinInput.value,
    grade_level: selectedGrade,
    DepartementsDesires: getDepValues() || [],
  };
  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);
}

// load the saved data from localstorage to the form
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
    loadProgrammingLanguagesRatings(data.Scientific_interests);
    grade_levelInputs.forEach((input) => {
      if (input.value === data.grade_level) {
        input.checked = true;
      }
    });
    RangeInputs.forEach((rangeInput) => {
      rangeInput.value = valueToRange(
        data.DepartementsDesires?.find((dep) => dep.depName === rangeInput.name)
          .depValue
      );
      const output = rangeInput.nextElementSibling;
      output.innerHTML = rangeToValue(rangeInput.value);
    });
    toggleSection(sectionNumber);
    updateProgress();
  }
}

// it goes back to the previous section by hiding the other ones
function backSection() {
  if (section1 && section2 && section3 && section4) {
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

// it goes to the next section by hiding the other ones
async function nextSection() {
  if (section1 && section2 && section3 && section4) {
    if (sectionNumber < 4) {
      if (!validateInput(sectionNumber)) {
        alertMessage("Please fill in all fields !!", "red");
      } else {
        sectionNumber++;
        toggleSection(sectionNumber);
        updateProgress();
        saveToLocalStorage();
      }
    }
  } else {
    console.error("One or both sections not found");
  }
}

// it updates the progress bar by changing its color (depends on the curent section)
function updateProgress() {
  progress.forEach((circle, idx) => {
    if (idx < sectionNumber) {
      circle.classList.add("active-circle");
    } else {
      circle.classList.remove("active-circle");
    }
  });
}

// it checks if all the fields are filled before submitting the form
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
    selectedGrade === "" ||
    selectedGrade === undefined
  ) {
    alertMessage("Please fill in all fields !!", "red");
    return false;
  } else {
    alert.style.opacity = 0;
    return true;
  }
}

function validateInput(sectionNumber) {
  switch (sectionNumber) {
    case 1:
      return (
        firstnameInput.value !== "" &&
        lastnameInput.value !== "" &&
        emailInput.value !== "" &&
        phoneInput.value
      );
    case 2:
      return (
        universityInput.value !== "" &&
        field_of_studyInput.value !== "" &&
        document.querySelector('input[name="grade-level"]:checked')?.value &&
        getProgrammingLanguagesRatings().length > 0
      );
    case 3:
      return getDepValues().length > 0;
    case 4:
      return experienceInput.value !== "" && why_joinInput.value !== "";
    default:
      return false;
  }
}

// it sends the form data to the server
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
    const { message } = await response.json();
    if (response.status === 201) {
      alertMessage(message, "green");
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
    } else {
      alertMessage(message, "red");
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

// it scrolls smoothly to the selected image slide (this is necessary for the slider smooth animation)
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

// it sets the active nav link to the current slide
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

// it slides to the next slide after 7 seconds
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

// it shows the form when the user clicks on the button (join us)
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

// it checks the inferieur checkboxes of the selected checkbox (programing laguages)
document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
  checkbox.addEventListener("change", function () {
    const selectedValue = parseInt(this.value);
    const selectedname = this.name;
    document
      .querySelectorAll(`input[name=${selectedname}]`)
      .forEach((checkbox) => {
        if (parseInt(checkbox.value) <= selectedValue) {
          checkbox.checked = true;
        } else {
          checkbox.checked = false;
        }
      });
  });
});

// it checks the standard checkboxes after checking the custom ones (programing laguages)
document.querySelectorAll(".custom-checkmark").forEach((checkmark) => {
  checkmark.addEventListener("click", function () {
    const checkbox = this.previousElementSibling;
    if (checkbox) {
      checkbox.checked = !checkbox.checked;
      checkbox.dispatchEvent(new Event("change"));
    }
  });
});

// event listener for the show form (join us / go back) button
showformBtn.addEventListener("click", showForm);

// event listener for the slider auto slide every 7 seconds and replay the entire circle every 7*sliderNavs.length seconds
slideNext(1);
setInterval(() => slideNext(1), 7000 * sliderNavs.length);

// event listener for the slider navs to navigate between slides smoothly
sliderNavs.forEach((anchor) => {
  anchor.addEventListener("click", smoothScrollSlide);
});

// saving the initial data into localstorage to avoid potential bugs
saveToLocalStorage();

// loading it to the form to avoid  data loss
loadFromLocalStorage();

// event listeners for the next button of each section
nextBtn.forEach((btn) => {
  btn.addEventListener("click", nextSection);
});

// event listener for the back button
backbtn.addEventListener("click", backSection);

// event listener for the progress bar circles to navigate between sections as buttons
progress.forEach((circle) => {
  circle.addEventListener("click", () => {
    sectionNumber = parseInt(circle.getAttribute("value"));
    toggleSection(sectionNumber);
    updateProgress();
    saveToLocalStorage();
  });
});

// event listener for the range inputs to update the output value
RangeInputs.forEach((rangeInput) => {
  rangeInput.addEventListener("input", function () {
    const output = this.nextElementSibling;
    output.innerHTML = rangeToValue(this.value);
  });
});

// event listener for the submit button
if (submitBtn) {
  submitBtn.addEventListener("click", async (e) => {
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
        Scientific_interests: getProgrammingLanguagesRatings(),
        field_of_study: field_of_studyInput.value,
        DepartementsDesires: getDepValues(),
      };

      console.log(data);
      submitBtn.disabled = true;

      submitBtn.innerHTML = "Submitting...";
      await sendData(data);
      submitBtn.disabled = false;
      submitBtn.innerHTML = "Submit";
    }
  });
}
