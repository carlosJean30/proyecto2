import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Alert from '../alertas/Alerts';
import './AdminLogin.css';

const AdminLogin: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (username === 'delgado' && password === '123') {
            setAlert({ message: 'Login exitoso', type: 'success' });
            // Redireccionar al panel de visualizar documentos
            setTimeout(() => {
                window.location.href = '/asignarTutor';
            }, 1000);
        } else {
            setAlert({ message: 'Usuario o contraseña incorrectos', type: 'error' });
        }
    };

    return (
        <div className="admin-login-container">
            <h2>Login de Administrador</h2>
            {alert && <div className={`alert alert-${alert.type}`}>{alert.message}</div>}
            <form onSubmit={handleSubmit} className="admin-login-form">
                <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Usuario" required />
                <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" required />
                <button type="submit">Login</button>
            </form>
            <div className="admin-login-buttons">
                <Link to="/registro"><button className="btn-secondary">Registro</button></Link>
                <Link to="/"><button className="btn-secondary">Login</button></Link>
            </div>
        </div>
    );
};

export default AdminLogin;
