const topicsCheckbox = document.querySelectorAll(".topics__checkbox");
const paginationCounter = document.querySelector(".pagination-counter");
const paginationPoints = document.querySelectorAll(".pagination__point");
const contentSteps = document.querySelectorAll(".content");
const formBtn = document.querySelector(".form-button");
const userName = document.querySelector(".user-data__name");
const userEmail = document.querySelector(".user-data__email");
const topicsList = document.querySelector(".topics-list");
const nameInput = document.getElementById("name-input");
const emailInput = document.getElementById("email-input");
const nameField = document.getElementById("name");
const emailField = document.getElementById("email");
const topicField = document.querySelector(".topics-list");
const topicsContainer = document.querySelector(".topics-list");
const topicItems = topicsContainer.querySelectorAll(".topics-list__item");

let selectedTopics = {};
let userData = {};
let currentStep = 0;

// Selecting checkboxes
topicsCheckbox.forEach((element) => {
  element.addEventListener("change", (event) => {
    const el = event.target;
    const parentLi = el.closest(".topics__item");
    if (el.checked) {
      parentLi.classList.add("topics__item--active");
    } else {
      parentLi.classList.remove("topics__item--active");
    }
    selectedTopics[el.value] = el.checked;
  });
});

function validateEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

function validateSteps(step) {
  // step 1
  if (step === 0) {
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    if (!name) {
      alert("Please enter a name");
      return false;
    }
    if (!validateEmail(email)) {
      alert("Please enter a valid email");
      return false;
    }
    userData.name = name;
    userData.email = email;
    return true;
  }
  // step 2
  else if (step === 1) {
    const hasSelectedTopics = Object.values(selectedTopics).some((value) => value === true);
    if (!hasSelectedTopics) {
      alert("Please select at least one topic");
      return false;
    }
    // Save a copy of the selected topics
    userData.topics = { ...selectedTopics };
    nameField.textContent = userData.name;
    emailField.textContent = userData.email;

    // Call updating the list of topics for the third step
    updateTopicsList();

    return true;
  }
  return true;
}

// Form button action
formBtn.addEventListener("click", (event) => {
  event.preventDefault();
  // If this is the last step, submit the form
  if (currentStep === contentSteps.length - 1) {
    submitForm();
  } else {
    // Validate the current step before moving
    if (validateSteps(currentStep)) {
      showStep();
    }
  }
});

function showStep() {
  contentSteps[currentStep].classList.add("content--hidden");
  paginationPoints[currentStep].classList.remove("pagination__point--active");
  currentStep++;
  if (currentStep < contentSteps.length) {
    contentSteps[currentStep].classList.remove("content--hidden");
    paginationCounter.textContent = `${currentStep + 1}`;
    paginationPoints[currentStep].classList.add("pagination__point--active");
  }
}

function updateTopicsList() {
  // Get an array of names of the selected topics
  const selectedTopicsArray = Object.keys(selectedTopics).filter((topic) => selectedTopics[topic]);

  // Clear all elements of the topic list in the third step
  topicItems.forEach((item) => {
    item.textContent = "";
  });

  // Fill the first elements with the selected topics
  selectedTopicsArray.forEach((topic, index) => {
    if (topicItems[index]) {
      topicItems[index].textContent = topic;
    }
  });
}

function submitForm() {
  alert("🎉 Success");
  setTimeout(() => {
    resetForm();
  }, 200);
}

function resetForm() {
  currentStep = 0;
  nameInput.value = "";
  emailInput.value = "";
  nameField.textContent = "";
  emailField.textContent = "";
  selectedTopics = {};
  userData = {};

  topicsCheckbox.forEach((checkbox) => {
    checkbox.checked = false;
    checkbox.closest(".topics__item").classList.remove("topics__item--active");
  });

  // Clear topics in the third step
  topicItems.forEach((item) => {
    item.textContent = "";
  });

  paginationPoints.forEach((point) => {
    point.classList.remove("pagination__point--active");
  });
  contentSteps.forEach((content) => {
    content.classList.add("content--hidden");
  });

  contentSteps[currentStep].classList.remove("content--hidden");
  paginationPoints[currentStep].classList.add("pagination__point--active");
  paginationCounter.textContent = `${currentStep + 1}`;
}
