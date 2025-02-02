const form = document.getElementById("form");
const username = document.getElementById("username");
const password1 = document.getElementById("password1");
const password2 = document.getElementById("password2");
const email = document.getElementById("email");
const showPassword = document.querySelectorAll(".fa-solid");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  validateUsername();
  validatePassword();
  validatePasswordConfirmation();
  validateEmail();
});

function validateUsername() {
  const usernameValue = username.value.trim();

  if (usernameValue === "") {
    setError(username, "Username is required.");
  } else {
    setSuccess(username);
  }
}

function validatePassword() {
  const password1Value = password1.value.trim();

  if (password1Value === "") {
    setError(password1, "Password is required.");
  } else if (password1Value.length < 8) {
    setError(password1, "Password must be at least 8 characters long.");
  } else if (!/\d/.test(password1Value)) {
    setError(password1, "Password must include at least 1 number.");
  } else {
    setSuccess(password1);
  }
}

function validatePasswordConfirmation() {
  const password2Value = password2.value.trim();

  if (password2Value === "") {
    setError(password2, "Please confirm your password.");
  } else if (password2Value !== password1.value.trim()) {
    setError(password2, "Password doesn't match.");
  } else {
    setSuccess(password2);
  }
}

function validateEmail() {
  const emailValue = email.value.trim();
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (emailValue === "") {
    setError(email, "Email is required.");
  } else if (!regex.test(emailValue)) {
    setError(email, "Provide a valid email address.");
  } else {
    setSuccess(email);
  }
}

const inputFields = [
  {
    input: username,
    validation: validateUsername,
  },
  {
    input: password1,
    validation: validatePassword,
  },
  {
    input: password2,
    validation: validatePasswordConfirmation,
  },
  {
    input: email,
    validation: validateEmail,
  },
];

inputFields.forEach(({ input, validation }) => {
  input.addEventListener("input", () => validation());
});

function setError(element, message) {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerHTML = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
}

function setSuccess(element) {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = "";
  inputControl.classList.add("success");
  inputControl.classList.remove("error");
}

function togglePasswordVisibility() {
  showPassword.forEach((item) =>
    item.addEventListener("click", (e) => {
      e.target.classList.toggle("fa-eye-slash");
      e.target.classList.toggle("fa-eye");
      const passwordInput = e.target.previousElementSibling;
      const type =
        passwordInput.getAttribute("type") === "password" ? "text" : "password";
      passwordInput.setAttribute("type", type);
      const isPasswordVisible = passwordInput.getAttribute("type") === "text";
      e.target.setAttribute(
        "aria-label",
        isPasswordVisible ? "Hide password" : "Show password"
      );
    })
  );
}
document.addEventListener("DOMContentLoaded", togglePasswordVisibility);
