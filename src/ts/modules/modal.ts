export function initLoginModal(): void {
 const accountIcon = document.querySelector<HTMLButtonElement>('.account-icon');
const modal = document.querySelector<HTMLElement>('.login-modal');
const closeBtn = document.querySelector<HTMLButtonElement>('.login-modal__close');
const form = document.querySelector<HTMLFormElement>('.login-modal__form');

const emailInput = document.querySelector<HTMLInputElement>('#login-email');
const passwordInput = document.querySelector<HTMLInputElement>('#login-password');
const togglePassword = document.querySelector<HTMLButtonElement>('.login-modal__toggle');

const emailError = document.querySelector<HTMLElement>('#email-error');
const passwordError = document.querySelector<HTMLElement>('#password-error');

  if (!accountIcon || !modal || !form || !emailInput || !passwordInput) return;

  accountIcon.addEventListener('click', () => {
    modal.classList.add('login-modal--active');
  });

  closeBtn?.addEventListener('click', () => {
    modal.classList.remove('login-modal--active');
  });

  togglePassword?.addEventListener('click', () => {
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

function validateEmail(input: HTMLInputElement, error: HTMLElement | null): boolean {
  const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegExp.test(input.value.trim());

  if (error) {
    error.textContent = isValid ? '' : 'Please enter a valid email.';
  }

  return isValid;
}

function validatePassword(input: HTMLInputElement, error: HTMLElement | null): boolean {
  const isValid = input.value.trim().length > 0;

  if (error) {
    error.textContent = isValid ? '' : 'Password is required.';
  }

  return isValid;
}