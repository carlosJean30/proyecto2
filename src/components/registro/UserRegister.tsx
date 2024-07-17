import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Alert from '../alertas/Alerts';
import { validateEmail, validatePassword, validateName, validateCedula, validatePhone } from '../../utils/validationUtils';
import { saveToLocalStorage, getFromLocalStorage } from '../../utils/localStorageUtils';
import './registro.css';

const UserRegister: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        cedula: '',
        phone: '',
        faculty: '',
    });

    const [alert, setAlert] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const { email, password, confirmPassword, firstName, lastName, cedula, phone, faculty } = formData;

        if (!validateEmail(email)) {
            setAlert({ message: 'Email inválido', type: 'error' });
            return;
        }

        if (!validatePassword(password) || password !== confirmPassword) {
            setAlert({ message: 'Contraseña inválida o no coincide', type: 'error' });
            return;
        }

        if (!validateName(firstName) || !validateName(lastName)) {
            setAlert({ message: 'Nombre o apellido inválido', type: 'error' });
            return;
        }

        if (!validateCedula(cedula)) {
            setAlert({ message: 'Cédula inválida', type: 'error' });
            return;
        }

        if (!validatePhone(phone)) {
            setAlert({ message: 'Teléfono inválido', type: 'error' });
            return;
        }

        const users = getFromLocalStorage('users') || [];
        users.push(formData);
        saveToLocalStorage('users', users);
        
        setAlert({ message: 'Registro exitoso', type: 'success' });
        setFormData({
            email: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: '',
            cedula: '',
            phone: '',
            faculty: '',
        });
    };

    return (
        <div className="register-container">
            <h2>Registro de Usuarios</h2>
            {alert && <div className={`alert alert-${alert.type}`}>{alert.message}</div>}
            <form onSubmit={handleSubmit} className="register-form">
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Contraseña" required />
                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirmar Contraseña" required />
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Nombre" required />
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Apellido" required />
                <input type="text" name="cedula" value={formData.cedula} onChange={handleChange} placeholder="Cédula" required />
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Teléfono" required />
                <select name="faculty" value={formData.faculty} onChange={handleChange} required>
                    <option value="">Seleccione una facultad</option>
                    <option value="Ingeniería">Ingeniería</option>
                    <option value="Medicina">Medicina</option>
                    <option value="Derecho">Derecho</option>
                </select>
                <button type="submit">Registrar</button>
            </form>
            <div className="register-buttons">
                {/* <Link to="/registro"><button className="btn-secondary">Registro</button></Link> */}
                <Link to="/"><button className="btn-secondary">Iniciar sesión</button></Link>
            </div>
        </div>
    );
};

export default UserRegister;
