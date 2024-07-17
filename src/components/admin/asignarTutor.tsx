import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Alert from '../../components/alertas/Alerts';
import { getFromLocalStorage, saveToLocalStorage } from '../../utils/localStorageUtils';
import { validateName } from '../../utils/validationUtils';
import './TutorAssignment.css';

const TutorAssignment: React.FC = () => {
    const [cedula, setCedula] = useState('');
    const [tutor, setTutor] = useState('');
    const [alert, setAlert] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateName(tutor)) {
            setAlert({ message: 'Nombre de tutor inválido', type: 'error' });
            return;
        }

        const users = getFromLocalStorage('users') || [];
        const userIndex = users.findIndex((user: any) => user.cedula === cedula);

        if (userIndex !== -1) {
            users[userIndex].tutor = tutor;
            saveToLocalStorage('users', users);
            setAlert({ message: 'Tutor asignado exitosamente', type: 'success' });
            setCedula('');
            setTutor('');
        } else {
            setAlert({ message: 'Usuario no encontrado', type: 'error' });
        }
    };

    const users = getFromLocalStorage('users') || [];

    return (
        <div>
            <nav className="navbar">
                <Link to="/evaluar">Evaluar</Link>
                <Link to="/asignarTutor">Asignar Tutor</Link>
                <Link to="/retro">Agregar retroalimentación</Link>
                <Link to="/panelDocumento">Documentos</Link>
                <Link to="/">Cerrar sesión</Link>
            </nav>
            <div className="tutor-assignment-container">
                <h2>Asignación de Tutor</h2>
                {alert && <div className={`alert alert-${alert.type}`}>{alert.message}</div>}
                <form onSubmit={handleSubmit} className="tutor-assignment-form">
                    <select name="cedula" value={cedula} onChange={(e) => setCedula(e.target.value)} required>
                        <option value="">Seleccione una cédula</option>
                        {users.map((user: any) => (
                            <option key={user.cedula} value={user.cedula}>{user.cedula}</option>
                        ))}
                    </select>
                    <input type="text" name="tutor" value={tutor} onChange={(e) => setTutor(e.target.value)} placeholder="Nombre del tutor" required />
                    <button type="submit">Asignar</button>
                </form>
            </div>
        </div>
    );
};

export default TutorAssignment;
