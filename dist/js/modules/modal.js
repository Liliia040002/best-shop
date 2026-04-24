export function initLoginModal() {
    const accountIcon = document.querySelector('.header__account');
    const modal = document.querySelector('.login-modal');
    const closeBtn = document.querySelector('.login-modal__close');
    const form = document.querySelector('.login-modal__form');
    const emailInput = document.querySelector('#login-email');
    const passwordInput = document.querySelector('#login-password');
    const togglePassword = document.querySelector('.login-modal__toggle');
    if (!accountIcon || !modal || !form || !emailInput || !passwordInput)
        return;
    accountIcon.addEventListener('click', () => {
        modal.classList.add('active');
    });
    closeBtn === null || closeBtn === void 0 ? void 0 : closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    togglePassword === null || togglePassword === void 0 ? void 0 : togglePassword.addEventListener('click', () => {
        passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
    });
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isEmailValid = emailRegExp.test(emailInput.value);
        const isPasswordValid = passwordInput.value.trim().length > 0;
        if (isEmailValid && isPasswordValid) {
            modal.classList.remove('active');
            form.reset();
        }
    });
}
