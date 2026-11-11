document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.querySelector(".zealluck-login-form");
    if (!loginForm) return;
    const userField = loginForm.querySelector('input[name="email_or_id"]');
    const passwordField = loginForm.querySelector('input[name="password"]');
    const loginButton = loginForm.querySelector(".zealluck-login-btn");

    function showError(input, message) {
        clearError(input);
        input.style.borderColor = "#dc3545";
        input.setAttribute("aria-invalid", "true");
        const error = document.createElement("small");
        error.className = "zealluck-login-error";
        error.textContent = message;
        error.style.display = "block";
        error.style.color = "#dc3545";
        error.style.fontSize = "12px";
        error.style.marginTop = "6px";
        input.parentElement.appendChild(error);
    }
    function clearError(input) {
        const existingError = input.parentElement.querySelector(".zealluck-login-error");
        if (existingError) {
            existingError.remove();
        }
        input.style.borderColor = "";
        input.removeAttribute("aria-invalid");
    }
    function isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]=\.[^\s@]+$/;
        return emailPattern.test(email);
    }
    loginForm.addEventListener("submit", function (event) {
        let isValid = true;
        const userValue = userField.value.trim();
        const passwordValue = passwordField.value;
        clearError(userField);
        clearError(passwordField);
        if (userValue === "") {
            showError(userField, "Please enter your email address or system ID.");
            isValid = false;
        } else if (!userValue.includes("@") && !isValidEmail(userValue)) {
            showError(userField, "Please enter a valid email address.");
            isValid = false;
        }
        if (passwordValue.trim() === "") {
            showError(passwordField, "Please enter your password.");
            isValid = false;
        } else if (passwordValue.length < 8) {
            showError(passwordField, "Password must contain at least 8 characters");
            isValid = false;
        }
        if (!isValid) {
            event.preventDefault();
            const firstInvalidField = loginForm.querySelector('[aria-invalid="true"]');
            if (firstInvalidField) {
                firstInvalidField.focus();
            }
            return;
        }
        loginButton.disabled = true;
        loginButton.textContent = "Signing In...";
        userField.addEventListener("input", function () {
            clearError(userField);
        });
        passwordField.addEventListener("input", function () {
            clearError(passwordField);
        });
    });
});

// Registration Form
document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.querySelector(".zealluck-register-form");
    if (!registerForm) return;
    const accountOfficerField = document.getElementById("account-officer-id");
    const firstNameField = document.getElementById("first-name");
    const lastNameField = document.getElementById("last-name");
    const emailField = document.getElementById("register-email");
    const phoneField = document.getElementById("phone-number");
    const genderField = document.getElementById("gender");
    const accountTypeField = document.getElementById("account-type");
    const passwordField = document.getElementById("register-password");
    const confirmPasswordField = document.getElementById("confirm-password");
    const termsField = document.getElementById("terms");
    const registerButton = registerForm.querySelector(".zealluck-register-btn");
    const successMessage = document.getElementById("register-success");
    function showError(input, message) {
        if (!input) {
            console.error("Validation field not found!.");
            return;
        }
        clearError(input);
        const error = document.createElement("small");
        error.className = "zealluck-register-error";
        error.textContent = message;
        input.setAttribute("aria-invalid", "true");
        const parent = input.closest(".zealluck-register-input") ||
                       input.closest(".zealluck-register-terms");

        if (parent) {
            parent.appendChild(error);
        }
    }
    function clearError(input) {
        const parent = input.closest(".zealluck-register-input") ||
                       input.closest(".zealluck-register-terms");

        if (parent) {
            const error = parent.querySelector(".zealluck-register-error");
            if (error) {
                error.remove();
            }
        }
        input.removeAttribute("aria-invalid");
    }
    function isValidEmail(email) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    function isValidPhone(phone) {
        const cleanedPhone = phone.replace(/[\s\-()]/g, "");
        return /^(?:0|\+234|234)(?:70|71|80|81|90|91)\d{8}$/.test(cleanedPhone);
    }
    const fields = [
        accountOfficerField,
        firstNameField,
        lastNameField,
        emailField,
        phoneField,
        genderField,
        accountTypeField,
        passwordField,
        confirmPasswordField,
        termsField
    ].filter(Boolean);
    fields.forEach(function (field) {
        if (!field) return;
        const eventType =
            field.type === "checkbox" || field.tagName === "SELECT"
                ? "change"
                : "input";
        field.addEventListener(eventType, function () {
            clearError(field);
            if (field === passwordField && confirmPasswordField.value !== "") {
                clearError(confirmPasswordField);
                if (passwordField.value !== confirmPasswordField.value) {
                    showError(
                        confirmPasswordField,
                        "Passwords do not match."
                    );
                }
            }
        });
    });
    registerForm.addEventListener("submit", function (event) {
        let isValid = true;
        fields.forEach(function (field) {
            clearError(field);
        });
        if (accountOfficerField.value.trim() === "") {
            showError(
                accountOfficerField,
                "Please enter your Account Officer ID."
            );
            isValid = false;
        }
        if (firstNameField.value.trim() === "") {

            showError(
                firstNameField,
                "Please enter your first name."
            );
            isValid = false;
        }
        if (lastNameField.value.trim() === "") {
            showError(
                lastNameField,
                "Please enter your last name."
            );
            isValid = false;
        }
        if (emailField.value.trim() === "") {

            showError(
                emailField,
                "Please enter your email address."
            );
            isValid = false;
        } else if (!isValidEmail(emailField.value.trim())) {
            showError(
                emailField,
                "Please enter a valid email address."
            );
            isValid = false;
        }
        if (phoneField.value.trim() === "") {
            showError(
                phoneField,
                "Please enter your phone number."
            );
            isValid = false;
        } else if (!isValidPhone(phoneField.value.trim())) {
            showError(
                phoneField,
                "Please enter a valid Nigerian mobile number."
            );
            isValid = false;
        }
        if (genderField.value === "") {
            showError(
                genderField,
                "Please select your gender."
            );
            isValid = false;
        }
        if (accountTypeField.value === "") {
            showError(
                accountTypeField,
                "Please select an account type."
            );
            isValid = false;
        }
        if (passwordField.value.length < 8) {

            showError(
                passwordField,
                "Password must contain at least 8 characters."
            );
            isValid = false;

        }
        if (confirmPasswordField.value === "") {

            showError(
                confirmPasswordField,
                "Please confirm your password."
            );
            isValid = false;
        } else if (passwordField.value !== confirmPasswordField.value) {
            showError(
                confirmPasswordField,
                "Passwords do not match."
            );
            isValid = false;
        }
        if (!termsField.checked) {
            showError(
                termsField,
                "You must accept the Terms and Conditions."
            );
            isValid = false;
        }
        if (!isValid) {
            event.preventDefault();
            const firstInvalidField = registerForm.querySelector(
                '[aria-invalid="true"]'
            );
            if (firstInvalidField) {
                firstInvalidField.focus();
                firstInvalidField.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }
            return;
        }
        registerButton.disabled = true;
        registerButton.textContent = "Registering...";
        event.preventDefault();
        if (!isValid) {
            successMessage.classList.remove("show");
            return;
        }
        successMessage.classList.add("show");
        registerForm.reset();
        fields.forEach(field => {
            clearError(field);
        });
        successMessage.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
        setTimeout(() => {
            successMessage.classList.remove("show");
            registerButton.disabled = false;
            registerButton.textContent = "Register";
        }, 10000);
    });
});
