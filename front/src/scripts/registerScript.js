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
    address: form.address.value,
    createRestaurant: form.createRestaurant ? form.createRestaurant.checked : false,
    restaurantName: form.restaurantName ? form.restaurantName.value : '',
    restaurantDescription: form.restaurantDescription ? form.restaurantDescription.value : '',
    restaurantPhone: form.restaurantPhone ? form.restaurantPhone.value : '',
    restaurantEmail: form.restaurantEmail ? form.restaurantEmail.value : '',
    restaurantAddress: form.restaurantAddress ? form.restaurantAddress.value : '',
  };

  console.log('Sending register data:', userData); 
  try {
    const response = await register(userData);
    alert('Registration successful');
    window.location.href = '/';
  } catch (error) {
    alert(error.message);
  }
};
