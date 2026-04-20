"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".contact-form__form");
    const inputs = form.querySelectorAll("input, textarea");
    const formMessage = form.querySelector(".form-message");
    // 🔹 Email validation
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    // 🔹 Validate field
    function validateField(field) {
        const group = field.parentElement;
        const error = group.querySelector(".error-message");
        if (!field.value.trim()) {
            error.textContent = "This field is required";
            error.style.display = "block";
            field.classList.add("error");
            return false;
        }
        if (field.id === "email" && !isValidEmail(field.value)) {
            error.textContent = "Invalid email format";
            error.style.display = "block";
            field.classList.add("error");
            return false;
        }
        error.style.display = "none";
        field.classList.remove("error");
        return true;
    }
    // 🔹 Real-time validation
    inputs.forEach((field) => {
        field.addEventListener("input", () => {
            validateField(field);
        });
    });
    // 🔹 Submit
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let isFormValid = true;
        inputs.forEach((field) => {
            if (!validateField(field)) {
                isFormValid = false;
            }
        });
        if (isFormValid) {
            formMessage.textContent = "Form submitted successfully!";
            formMessage.style.color = "green";
            form.reset();
            inputs.forEach((field) => {
                const error = field.parentElement
                    .querySelector(".error-message");
                error.style.display = "none";
                field.classList.remove("error");
            });
        }
        else {
            formMessage.textContent = "Please fix the errors in the form.";
            formMessage.style.color = "red";
        }
    });
});
