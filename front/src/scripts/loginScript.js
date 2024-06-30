import { login } from '../handlers/loginHandler';
import { useNavigate } from 'react-router-dom';

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
        if (user.role === 'client') {
            navigate('/cli/dashboard');
        } else if (user.role === 'deliverer') {
            navigate('/deliv/dashboard');
        } else if (user.role === 'restaurateur') {
            navigate('/rest/dashboard');
        }
    } catch (error) {
        alert(error.message);
    }
};

export default handleLogin;
