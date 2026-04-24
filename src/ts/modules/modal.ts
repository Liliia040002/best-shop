export function initLoginModal(): void {
  const accountIcon = document.querySelector('.header__account') as HTMLElement | null;
  const modal = document.querySelector('.login-modal') as HTMLElement | null;
  const closeBtn = document.querySelector('.login-modal__close') as HTMLElement | null;
  const form = document.querySelector('.login-modal__form') as HTMLFormElement | null;
  const emailInput = document.querySelector('#login-email') as HTMLInputElement | null;
  const passwordInput = document.querySelector('#login-password') as HTMLInputElement | null;
  const togglePassword = document.querySelector('.login-modal__toggle') as HTMLElement | null;

  if (!accountIcon || !modal || !form || !emailInput || !passwordInput) return;

  accountIcon.addEventListener('click', () => {
    modal.classList.add('active');
  });

  closeBtn?.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  togglePassword?.addEventListener('click', () => {
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