const form = document.querySelector("#form");

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
      }else if (some) {
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
