import React from 'react';
import Home from '../components/home/Home'

export { Home }

export const Login = React.lazy(() => import('../components/login/Login')); //1
export const AdminLogin = React.lazy(() => import('../components/login/LoginAdmin'));
export const UserProfile = React.lazy(() => import('../components/users/perfil'));
export const Retro = React.lazy(() => import('../components/admin/panel-retro'));
export const TutorAssignment = React.lazy(() => import('../components/admin/asignarTutor'));
export const ViewTasks = React.lazy(() => import('../components/users/verDocumento'));
export const ViewThesis = React.lazy(() => import('../components/users/verTesis'));
export const ViewFeedbacks = React.lazy(() => import('../components/users/verRetroA'));
export const ViewEvaluation = React.lazy(() => import('../components/users/verEvaluacion'));
export const UserRegister = React.lazy(() => import('../components/registro/UserRegister'));
export const TaskSubmission = React.lazy(() => import('../components/users/tarea'));
export const ThesisSubmission = React.lazy(() => import('../components/users/tesis'));
export const  UserFeedbackAdmin = React.lazy(() => import('../components/admin/panel-retro'));
export const GradePanel = React.lazy(() => import('../components/admin/calificar'));
export const PanelDocuments = React.lazy(() => import('../components/admin/panelDocumento'));