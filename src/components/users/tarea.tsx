import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Alert from '../alertas/Alerts';
import { getFromLocalStorage, saveToLocalStorage } from '../../utils/localStorageUtils';
import { validateCedula, validateName } from '../../utils/validationUtils';
import './TaskSubmission.css';

const TaskSubmission: React.FC = () => {
    const [formData, setFormData] = useState({
        title: '',
        body: '',
        taskType: '',
        cedula: '',
        author: '',
    });

    const [alert, setAlert] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const { title, body, taskType, cedula, author } = formData;

        if (title.length < 5 || title.length > 20) {
            setAlert({ message: 'Título inválido', type: 'error' });
            return;
        }

        if (body.length < 10 || body.length > 30) {
            setAlert({ message: 'Cuerpo del documento inválido', type: 'error' });
            return;
        }

        if (!validateCedula(cedula)) {
            setAlert({ message: 'Cédula inválida', type: 'error' });
            return;
        }

        if (!validateName(author)) {
            setAlert({ message: 'Autor inválido', type: 'error' });
            return;
        }

        const tasks = getFromLocalStorage('tasks') || [];
        tasks.push(formData);
        saveToLocalStorage('tasks', tasks);

        setAlert({ message: 'Documento de tarea enviado', type: 'success' });
        setFormData({
            title: '',
            body: '',
            taskType: '',
            cedula: '',
            author: '',
        });
    };

    const users = getFromLocalStorage('users') || [];

    return (
        <div>
            <nav className="navbar">
                <Link to="/">Inicio</Link>
                <Link to="/perfil">Perfil</Link>
                <Link to="/verTarea">Ver Tareas</Link>
                <Link to="/verTesis">Ver Tesis</Link>
                <Link to="/verRetro">Ver Retroalimentación</Link>
                <Link to="/verEvaluacion">Ver Evaluaciones</Link>
                <Link to="/agregarTarea">Agregar Tarea</Link>
                <Link to="/agregarTesis">Agregar Tesis</Link>
            </nav>
            <div className="task-submission-container">
                <h2>Entrega de Documentos de Tareas</h2>
                {alert && <div className={`alert alert-${alert.type}`}>{alert.message}</div>}
                <form onSubmit={handleSubmit} className="task-submission-form">
                    <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Título" required />
                    <textarea name="body" value={formData.body} onChange={handleChange} placeholder="Cuerpo del documento" required />
                    <select name="taskType" value={formData.taskType} onChange={handleChange} required>
                        <option value="">Seleccione tipo de tarea</option>
                        <option value="Trabajo Autonomo">Trabajo Autónomo</option>
                        <option value="Trabajo Practico">Trabajo Práctico</option>
                        <option value="Trabajo de Produccion">Trabajo de Producción</option>
                    </select>
                    <select name="cedula" value={formData.cedula} onChange={handleChange} required>
                        <option value="">Seleccione una cédula</option>
                        {users.map((user: any) => (
                            <option key={user.cedula} value={user.cedula}>{user.cedula}</option>
                        ))}
                    </select>
                    <input type="text" name="author" value={formData.author} onChange={handleChange} placeholder="Autor" required />
                    <button type="submit">Enviar</button>
                </form>
            </div>
        </div>
    );
};

export default TaskSubmission;
