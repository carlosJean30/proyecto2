import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
//import Alert from '../alertas/Alerts';
import { getFromLocalStorage, saveToLocalStorage } from '../../utils/localStorageUtils';
import { validateEmail, validatePassword, validateName, validatePhone } from '../../utils/validationUtils';
import './UserProfile.css';

const Perfil: React.FC = () => {
    const [userData, setUserData] = useState<any>(null);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        phone: '',
        faculty: '',
    });
    const [alert, setAlert] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

    useEffect(() => {
        const session = getFromLocalStorage('session');
        if (session) {
            setUserData(session);
            setFormData({
                email: session.email,
                password: '',
                confirmPassword: '',
                firstName: session.firstName,
                lastName: session.lastName,
                phone: session.phone,
                faculty: session.faculty,
            });
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const { email, password, confirmPassword, firstName, lastName, phone, faculty } = formData;

        if (!validateEmail(email)) {
            setAlert({ message: 'Email inválido', type: 'error' });
            return;
        }

        if (password && (!validatePassword(password) || password !== confirmPassword)) {
            setAlert({ message: 'Contraseña inválida o no coincide', type: 'error' });
            return;
        }

        if (!validateName(firstName) || !validateName(lastName)) {
            setAlert({ message: 'Nombre o apellido inválido', type: 'error' });
            return;
        }

        if (!validatePhone(phone)) {
            setAlert({ message: 'Teléfono inválido', type: 'error' });
            return;
        }

        const updatedUser = { ...userData, email, password: password || userData.password, firstName, lastName, phone, faculty };
        const users = getFromLocalStorage('users') || [];
        const updatedUsers = users.map((user: any) => user.cedula === userData.cedula ? updatedUser : user);
        saveToLocalStorage('users', updatedUsers);
        saveToLocalStorage('session', updatedUser);
        
        setAlert({ message: 'Perfil actualizado', type: 'success' });
    };

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <nav className="navbar">
                <Link to="/">Inicio</Link>
                <Link to="/perfil">Perfil</Link>
                <Link to="/verTesis">Ver Tesis</Link>
                <Link to="/verRetro">Ver Retroalimentación</Link>
                <Link to="/verEvaluacion">Ver Evaluaciones</Link>
                <Link to="/agregarTarea">Agregar Tarea</Link>
                <Link to="/agregarTesis">Agregar Tesis</Link>
            </nav>
            <div className="profile-container">
                <h2>Perfil de Usuario</h2>
                {alert && <div className={`alert alert-${alert.type}`}>{alert.message}</div>}
                <form onSubmit={handleSubmit} className="profile-form">
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                    <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Contraseña" />
                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirmar Contraseña" />
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Nombre" required />
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Apellido" required />
                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Teléfono" required />
                    <select name="faculty" value={formData.faculty} onChange={handleChange} required>
                        <option value="">Seleccione una facultad</option>
                        <option value="Ingeniería">Ingeniería</option>
                        <option value="Medicina">Medicina</option>
                        <option value="Derecho">Derecho</option>
                    </select>
                    <button type="submit">Actualizar</button>
                </form>
                <div className="tutor-info">
                    <h3>Tutor Asignado:</h3>
                    <p>{userData.tutor || 'Sin tutor asignado'}</p>
                </div>
            </div>
        </div>
    );
};

export default Perfil;
