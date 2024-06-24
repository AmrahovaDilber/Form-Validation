const form = document.querySelector("#form");
const formContent = document.querySelector("#form-content");
const formObject = [
  {
    type: "input",
    name: "name",
    label: "Name",
    message: "Please do not leave the name field empty",
  },
  {
    type: "input",
    name: "surname",
    label: "Surname",
    message: "Please do not leave the surname field empty",
  },
  {
    type: "input",
    name: "phone",
    label: "Phone",
    message: "Please enter a valid phone number",
  },
  {
    type: "input",
    name: "email",
    label: "Email",
    message: "Please enter a valid email address",
  },
  {
    type: "input",
    name: "age",
    label: "Age",
    message: "Please do not leave the age field empty",
  },
  {
    type: "select",
    name: "hobbi",
    label: "Hobby",
    options: [
      { value: "footbal", name: "Football" },
      { value: "tennis", name: "Tennis" },
      { value: "basketball", name: "Basketball" },
    ],
    message: "Please select a hobby",
  },
  {
    type: "input",
    name: "password",
    label: "Password",
    message: "Please enter a password",
    min: 6,
  },
  {
    type: "input",
    name: "rpassword",
    label: "RPassword",
    message: "Please re-enter your password",
    some: "password",
  },
];
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

function isNumber(input) {
  var regex = /^\d+$/;
  return regex.test(input);
}
function handleSubmit(values) {
  console.log(values);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let error = 0;
  let values = {};

  for (let element of e.target.elements) {
    const value = element.value;
    const message = element.getAttribute("data-message");
    const min = element.getAttribute("data-min");
    const some = element.getAttribute("data-some");
    values[element.name] = value;
    removeErrorMessage(element);
    if (element.tagName !== "BUTTON") {
      if (!value) {
        errorMessage(element, message || "Zehmet olmasa bos buraxmayin");
        error++;
      } else if (min && parseInt(min) > value.length) {
        errorMessage(element, "Min 6 simvol olmalidir");
        error++;
      } else if (element.name === "email" && !validateEmail(value)) {
        errorMessage(element, "Email formatini dogru yaz");
        error++;
      } else if (element.name === "phone" && !isNumber(value)) {
        errorMessage(element, "Zehmet olmasa reqem daxil et ");
        error++;
      } else if (some) {
        const someInput = form.querySelector(`[name="${some}"]`);
        if (
          someInput &&
          someInput.value.toString().toLowerCase() !== value.toLowerCase()
        ) {
          errorMessage(element, "Sifreler uygun gelmir");
          error++;
        }
      }
    }
  }
  if (!error) {
    handleSubmit(values);
  }
});

function errorMessage(element, message) {
  element.parentElement.insertAdjacentHTML(
    "beforeend",
    `<p class='text-red-500'>${message}</p`
  );
  element.classList.add("border-red-500");
}

function removeErrorMessage(element) {
  if (element.parentElement.querySelector("p")) {
    element.parentElement.querySelector("p").remove();
    element.classList.remove("border-red-500");
  }
}
const formElements = (element) => {
  if (element.type === "input") {
    return formInput(element);
  } else if (element.type === "select") {
    return formSelect(element);
  } else {
    console.error(`Unsupported element type: ${element.type}`);
    return "";
  }
};

const formInput = (element) => {
  return `
    <input
      name="${element.name}"
      data-message="${element.message || ""}"
   data-min="${element.min || ""}"
   data-some="${element.some || ""}"
      type="text"
      class="h-[40px] w-full rounded-md border outline-none pl-2"
    />`;
};

const formSelect = (element) => {
  let html = "";
  for (let option of element.options) {
    html += `<option value="${option.value}">${option.name}</option>`;
  }
  return `
    <select name="${
      element.name
    }" class="h-[40px] w-full rounded-md border outline-none pl-2"${
    element.multiple ? " multiple" : ""
  }>
        ${html}
    </select>`;
};

const formStart = () => {
  for (let el of formObject) {
    formContent.innerHTML += `
      <div>
        <label class="flex mb-[3px] font-bold text-[16px]">${el.label}</label>
        ${formElements(el)}
      </div>`;
  }
};
formStart();
