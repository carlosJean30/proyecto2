import React from 'react';
import { Link } from 'react-router-dom';
import { getFromLocalStorage } from '../../utils/localStorageUtils';
import './ViewFeedback.css';

const ViewFeedback: React.FC = () => {
    const session = getFromLocalStorage('session');
    const feedbacks = getFromLocalStorage('feedbacks') || [];

    const userFeedbacks = feedbacks.filter((feedback: any) => feedback.cedula === session.cedula);

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
            <div className="feedback-container">
                <h2>Retroalimentación</h2>
                {userFeedbacks.length > 0 ? (
                    userFeedbacks.map((feedback: any, index: number) => (
                        <div key={index} className="feedback-card">
                            <p>{feedback.message}</p>
                        </div>
                    ))
                ) : (
                    <p>No hay retroalimentación disponible.</p>
                )}
            </div>
        </div>
    );
};

export default ViewFeedback;
