document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector(".contact-form__form") as HTMLFormElement;
    const inputs = form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("input, textarea");
    const formMessage = form.querySelector(".form-message") as HTMLParagraphElement;

   
    function isValidEmail(email: string): boolean {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

  
    function validateField(field: HTMLInputElement | HTMLTextAreaElement): boolean {
        const group = field.parentElement as HTMLElement;
        const error = group.querySelector(".error-message") as HTMLParagraphElement;

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


    inputs.forEach((field) => {
        field.addEventListener("input", () => {
            validateField(field);
        });
    });

    // 🔹 Submit
    form.addEventListener("submit", (e: Event) => {
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
                const error = field.parentElement!
                    .querySelector(".error-message") as HTMLParagraphElement;

                error.style.display = "none";
                field.classList.remove("error");
            });

        } else {
            formMessage.textContent = "Please fix the errors in the form.";
            formMessage.style.color = "red";
        }
    });

});