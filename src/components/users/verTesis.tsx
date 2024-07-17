import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getFromLocalStorage } from '../../utils/localStorageUtils';
import { jsPDF } from 'jspdf';
import './ViewThesisDocuments.css';

const ViewThesisDocuments: React.FC = () => {
    const session = getFromLocalStorage('session');
    const theses = getFromLocalStorage('theses') || [];
    const userTheses = theses.filter((thesis: any) => thesis.cedula === session.cedula);

    const [filter, setFilter] = useState('');

    const filteredTheses = userTheses.filter((thesis: any) => thesis.title.includes(filter));

    const handlePrint = (title: string, body: string) => {
        const doc = new jsPDF();
        doc.text(title, 10, 10);
        doc.text(body, 10, 20);
        doc.save(`${title}.pdf`);
    };

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
            <div className="thesis-documents-container">
                <h2>Documentos de Tesis</h2>
                <input
                    type="text"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    placeholder="Filtrar por título"
                />
                {filteredTheses.length > 0 ? (
                    filteredTheses.map((thesis: any, index: number) => (
                        <div key={index} className="thesis-card">
                            <h3>{thesis.title}</h3>
                            <p>{thesis.body}</p>
                            <button onClick={() => handlePrint(thesis.title, thesis.body)}>Imprimir</button>
                        </div>
                    ))
                ) : (
                    <p>No hay documentos disponibles.</p>
                )}
            </div>
        </div>
    );
};

export default ViewThesisDocuments;
