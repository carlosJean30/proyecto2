import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getFromLocalStorage, saveToLocalStorage } from '../../utils/localStorageUtils';
import { jsPDF } from 'jspdf';
import './PanelDocuments.css';

const PanelDocuments: React.FC = () => {
    const [filter, setFilter] = useState('');
    const tasks = getFromLocalStorage('tasks') || [];
    const theses = getFromLocalStorage('theses') || [];

    const filteredTasks = tasks.filter((task: any) => task.title.includes(filter));
    const filteredTheses = theses.filter((thesis: any) => thesis.title.includes(filter));

    const handleDelete = (type: 'tasks' | 'theses', index: number) => {
        const items = type === 'tasks' ? tasks : theses;
        items.splice(index, 1);
        saveToLocalStorage(type, items);
        window.location.reload();
    };

    const handlePrint = (title: string, body: string) => {
        const doc = new jsPDF();
        doc.text(title, 10, 10);
        doc.text(body, 10, 20);
        doc.save(`${title}.pdf`);
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
            <div className="documents-container">
                <h2>Documentos</h2>
                <input
                    type="text"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    placeholder="Filtrar por título"
                />
                <h3>Tareas</h3>
                {filteredTasks.length > 0 ? (
                    filteredTasks.map((task: any, index: number) => (
                        <div key={index} className="document-card">
                            <h4>{task.title}</h4>
                            <p>{task.body}</p>
                            <button onClick={() => handleDelete('tasks', index)}>Eliminar</button>
                            <button onClick={() => handlePrint(task.title, task.body)}>Imprimir</button>
                        </div>
                    ))
                ) : (
                    <p>No hay tareas disponibles.</p>
                )}
                <h3>Tesis</h3>
                {filteredTheses.length > 0 ? (
                    filteredTheses.map((thesis: any, index: number) => (
                        <div key={index} className="document-card">
                            <h4>{thesis.title}</h4>
                            <p>{thesis.body}</p>
                            <button onClick={() => handleDelete('theses', index)}>Eliminar</button>
                            <button onClick={() => handlePrint(thesis.title, thesis.body)}>Imprimir</button>
                        </div>
                    ))
                ) : (
                    <p>No hay tesis disponibles.</p>
                )}
            </div>
        </div>
    );
};

export default PanelDocuments;
