import React from 'react';
import { Link } from 'react-router-dom';
import { getFromLocalStorage } from '../../utils/localStorageUtils';
import './ViewEvaluation.css';

const ViewEvaluation: React.FC = () => {
    const session = getFromLocalStorage('session');
    const tasks = getFromLocalStorage('tasks') || [];

    const userTasks = tasks.filter((task: any) => task.cedula === session.cedula);

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
            <div className="evaluation-container">
                <h2>Evaluaciones</h2>
                {userTasks.length > 0 ? (
                    userTasks.map((task: any, index: number) => (
                        <div key={index} className="evaluation-card">
                            <h3>{task.title}</h3>
                            <p>{task.body}</p>
                            <p>Comentario: {task.comment || 'Sin comentario'}</p>
                            <p>Calificación: {task.grade || 'Sin calificación'}</p>
                        </div>
                    ))
                ) : (
                    <p>No hay evaluaciones disponibles.</p>
                )}
            </div>
        </div>
    );
};

export default ViewEvaluation;
