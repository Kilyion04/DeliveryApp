import { register } from '../handlers/registerHandler';

export const handleRegister = async (event) => {
  event.preventDefault();
  const form = event.target;
  const userData = {
    username: form.username.value,
    email: form.email.value,
    password: form.password.value,
    role: form.role.value,
  };
  try {
    const response = await register(userData);
    alert(response.message);
    window.location.href = '/';
  } catch (error) {
    alert(error.message);
  }
};
