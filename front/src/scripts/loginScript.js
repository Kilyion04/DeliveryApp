import { login } from '../handlers/loginHandler';

const handleLogin = async (event, navigate) => {
    event.preventDefault();
    const form = event.target;
    const userData = {
        email: form.email.value,
        password: form.password.value,
    };

    try {
        const user = await login(userData);
        alert('Login successful');
        if (user.role === 'Client') {
            navigate('/cli/dashboard');
        } else if (user.role === 'Livreur') {
            navigate('/deliv/dashboard');
        } else if (user.role === 'Restaurateur') {
            navigate('/rest/dashboard');
        }
    } catch (error) {
        alert(error.message);
    }
};

export default handleLogin;
