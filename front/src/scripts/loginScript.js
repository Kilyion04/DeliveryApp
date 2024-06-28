import { login } from '../handlers/loginHandler';

export const handleLogin = async (event) => {
  event.preventDefault();
  const form = event.target;
  const userData = {
    email: form.email.value,
    password: form.password.value,
  };
  try {
    await login(userData);
    alert('Login successful');
    window.location.href = '/cli/dashboard'; // Redirection vers le tableau de bord du client
  } catch (error) {
    alert(error.message);
  }
};
