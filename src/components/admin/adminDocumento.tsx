// src/pages/ViewDocuments.tsx
import React from 'react';
import { getFromLocalStorage, saveToLocalStorage } from '../../utils/localStorageUtils';


const ViewDocuments: React.FC = () => {
    const tasks = getFromLocalStorage('tasks') || [];
    const theses = getFromLocalStorage('theses') || [];

    const handleDelete = (type: 'tasks' | 'theses', index: number) => {
        const items = type === 'tasks' ? tasks : theses;
        items.splice(index, 1);
        saveToLocalStorage(type, items);
        window.location.reload();
    };

    return (
        <div>
            <h2>Documentos</h2>
            <h3>Tareas</h3>
            {tasks.length > 0 ? (
                tasks.map((task: any, index: number) => (
                    <div key={index}>
                        <h4>{task.title}</h4>
                        <p>{task.body}</p>
                        <button onClick={() => handleDelete('tasks', index)}>Eliminar</button>
                        <button onClick={() => console.log('Imprimir documento')}>Imprimir</button>
                    </div>
                ))
            ) : (
                <p>No hay tareas disponibles.</p>
            )}
            <h3>Tesis</h3>
            {theses.length > 0 ? (
                theses.map((thesis: any, index: number) => (
                    <div key={index}>
                        <h4>{thesis.title}</h4>
                        <p>{thesis.body}</p>
                        <button onClick={() => handleDelete('theses', index)}>Eliminar</button>
                        <button onClick={() => console.log('Imprimir documento')}>Imprimir</button>
                    </div>
                ))
            ) : (
                <p>No hay tesis disponibles.</p>
            )}
        </div>
    );
};

export default ViewDocuments;
