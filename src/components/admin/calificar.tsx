import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Alert from '../alertas/Alerts';
import { getFromLocalStorage, saveToLocalStorage } from '../../utils/localStorageUtils';
import './GradePanel.css';

const GradePanel: React.FC = () => {
    const tasks = getFromLocalStorage('tasks') || [];
    const [selectedTask, setSelectedTask] = useState<number | null>(null);
    const [grade, setGrade] = useState<number | null>(null);
    const [comment, setComment] = useState('');
    const [alert, setAlert] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

    const handleGrade = () => {
        if (selectedTask === null || grade === null || grade < 1 || grade > 10 || comment.length < 5 || comment.length > 30) {
            setAlert({ message: 'Datos inválidos', type: 'error' });
            return;
        }

        tasks[selectedTask].grade = grade;
        tasks[selectedTask].comment = comment;
        saveToLocalStorage('tasks', tasks);
        setAlert({ message: 'Tarea calificada', type: 'success' });
    };

    return (
        <div>
            <nav className="navbar">
                <Link to="/evaluar">Evaluar</Link>
                <Link to="/asignarTutor">Asignar Tutor</Link>
                <Link to="/retro">Agregar retroalimentación</Link>
                <Link to="/panelDocumento">Documentos</Link>
                <Link to="/">Cerrar sesión</Link>
            </nav>
            <div className="grade-panel-container">
                <h2>Panel de Calificación</h2>
                {alert && <div className={`alert alert-${alert.type}`}>{alert.message}</div>}
                <div className="task-list">
                    {tasks.length > 0 ? (
                        tasks.map((task: any, index: number) => (
                            <div key={index} onClick={() => setSelectedTask(index)}>
                                <h4>{task.title}</h4>
                                <p>{task.body}</p>
                            </div>
                        ))
                    ) : (
                        <p>No hay tareas disponibles.</p>
                    )}
                </div>
                {selectedTask !== null && (
                    <div>
                        <h3>Calificar Tarea</h3>
                        <form className="grade-form">
                            <input type="number" value={grade || ''} onChange={(e) => setGrade(Number(e.target.value))} placeholder="Calificación (1-10)" />
                            <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Comentario" />
                            <button type="button" onClick={handleGrade}>Calificar</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GradePanel;
