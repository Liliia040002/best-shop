export function initLoginModal() {
    const accountIcon = document.querySelector('.account-icon');
    const modal = document.querySelector('.login-modal');
    const closeBtn = document.querySelector('.login-modal__close');
    const form = document.querySelector('.login-modal__form');
    const emailInput = document.querySelector('#login-email');
    const passwordInput = document.querySelector('#login-password');
    const togglePassword = document.querySelector('.login-modal__toggle');
    const emailError = document.querySelector('#email-error');
    const passwordError = document.querySelector('#password-error');
    if (!accountIcon || !modal || !form || !emailInput || !passwordInput)
        return;
    accountIcon.addEventListener('click', () => {
        modal.classList.add('login-modal--active');
    });
    closeBtn === null || closeBtn === void 0 ? void 0 : closeBtn.addEventListener('click', () => {
        modal.classList.remove('login-modal--active');
    });
    togglePassword === null || togglePassword === void 0 ? void 0 : togglePassword.addEventListener('click', () => {
        passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
    });
    emailInput.addEventListener('input', () => {
        validateEmail(emailInput, emailError);
    });
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const isEmailValid = validateEmail(emailInput, emailError);
        const isPasswordValid = validatePassword(passwordInput, passwordError);
        if (isEmailValid && isPasswordValid) {
            form.reset();
            modal.classList.remove('login-modal--active');
        }
    });
}
function validateEmail(input, error) {
    const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegExp.test(input.value.trim());
    if (error) {
        error.textContent = isValid ? '' : 'Please enter a valid email.';
    }
    return isValid;
}
function validatePassword(input, error) {
    const isValid = input.value.trim().length > 0;
    if (error) {
        error.textContent = isValid ? '' : 'Password is required.';
    }
    return isValid;
}
