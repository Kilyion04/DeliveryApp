// registerScript.js
import { register } from '../handlers/registerHandler';

export const handleRegister = async (event) => {
  event.preventDefault();
  const form = event.target;
  const userData = {
    username: form.username.value,
    email: form.email.value,
    telephone: form.telephone.value,
    password: form.password.value,
    role: form.role.value,
    address_num: form.address_num.value,
    address_complement: form.address_complement.value,
    address_street: form.address_street.value,
    address_neighbor: form.address_neighbor.value,
    address_city: form.address_city.value,
    address_postal_code: form.address_postal_code.value,
    address_departement: form.address_departement.value,
    address_region: form.address_region.value,
    address_country: form.address_country.value,
  };
  try {
    const response = await register(userData);
    alert('Registration successful');
    window.location.href = '/';
  } catch (error) {
    alert(error.message);
  }
};
