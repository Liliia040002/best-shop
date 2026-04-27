export function initLoginModal(): void {
  const accountIcon = document.querySelector('.account-icon') as HTMLButtonElement | null;
  const modal = document.querySelector('.login-modal') as HTMLElement | null;
  const closeBtn = document.querySelector('.login-modal__close') as HTMLButtonElement | null;
  const form = document.querySelector('.login-modal__form') as HTMLFormElement | null;

  const emailInput = document.querySelector('#login-email') as HTMLInputElement | null;
  const passwordInput = document.querySelector('#login-password') as HTMLInputElement | null;
  const togglePassword = document.querySelector('.login-modal__toggle') as HTMLButtonElement | null;

  const emailError = document.querySelector('#email-error') as HTMLElement | null;
  const passwordError = document.querySelector('#password-error') as HTMLElement | null;

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