// src/components/Alerts.tsx
import React from 'react';
// import '../../assets/css/alerts.css';
import './Alerts.css';
interface AlertProps {
    message: string;
    type: 'success' | 'error';
}

const Alert: React.FC<AlertProps> = ({ message, type }) => {
    return (
        <div className={`alert ${type}`}>
            {message}
        </div>
    );
};

export default Alert;
