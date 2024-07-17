import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Alert from '../alertas/Alerts';
import { getFromLocalStorage, saveToLocalStorage } from '../../utils/localStorageUtils';
import './FeedbackPanel.css';

const FeedbackPanel: React.FC = () => {
    const [cedula, setCedula] = useState('');
    const [message, setMessage] = useState('');
    const [alert, setAlert] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (message.length < 5 || message.length > 30) {
            setAlert({ message: 'Mensaje de retroalimentación inválido', type: 'error' });
            return;
        }

        const feedbacks = getFromLocalStorage('feedbacks') || [];
        feedbacks.push({ cedula, message });
        saveToLocalStorage('feedbacks', feedbacks);

        setAlert({ message: 'Retroalimentación enviada', type: 'success' });
        setCedula('');
        setMessage('');
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
            <div className="feedback-panel-container">
                <h2>Panel de Retroalimentación</h2>
                {alert && <div className={`alert alert-${alert.type}`}>{alert.message}</div>}
                <form onSubmit={handleSubmit} className="feedback-form">
                    <select name="cedula" value={cedula} onChange={(e) => setCedula(e.target.value)} required>
                        <option value="">Seleccione una cédula</option>
                        {users.map((user: any) => (
                            <option key={user.cedula} value={user.cedula}>{user.cedula}</option>
                        ))}
                    </select>
                    <textarea name="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Mensaje de retroalimentación" required />
                    <button type="submit">Enviar</button>
                </form>
            </div>
        </div>
    );
};

export default FeedbackPanel;
