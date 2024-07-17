// src/pages/UserLogin.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Alert from '../alertas/Alerts';
import { getFromLocalStorage, saveToLocalStorage } from '../../utils/localStorageUtils';
import './navbar.css';

const UserLogin: React.FC = () => {
    const [cedula, setCedula] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const users = getFromLocalStorage('users') || [];
        const user = users.find((user: any) => user.cedula === cedula && user.password === password);

        if (user) {
            saveToLocalStorage('session', user);
            setAlert({ message: 'Login exitoso', type: 'success' });
            setTimeout(() => {
                window.location.href = '/perfil';
            }, 1000);
        } else {
            setAlert({ message: 'Cédula o contraseña incorrecta', type: 'error' });
        }
    };

    return (
        <div className="login-container">
            <h2>Login de Usuario</h2>
            {alert && <Alert message={alert.message} type={alert.type} />}
            <form onSubmit={handleSubmit} className="login-form">
                <input type="text" name="cedula" value={cedula} onChange={(e) => setCedula(e.target.value)} placeholder="Cédula" required />
                <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" required />
                <button type="submit">Login</button>
            </form>
            <div className="login-buttons">
                <Link to="/registro"><button className="btn-secondary">Registro</button></Link>
                <Link to="/loginAdmin"><button className="btn-secondary">Login Admin</button></Link>
            </div>
        </div>
    );
};

export default UserLogin;
