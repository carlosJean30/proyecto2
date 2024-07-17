import React from "react";
import { AdminLogin, GradePanel, Home, Login, PanelDocuments, Retro, TaskSubmission, ThesisSubmission, TutorAssignment, UserProfile, UserRegister, ViewEvaluation, ViewFeedbacks, ViewTasks, ViewThesis,  } from "./pages";

export const routes = [
    {
        path: '/d',
        element: <Home/>
    },
    {
        path: '/',
        element: <Login/>
    },
    {
        path: '/loginAdmin',
        element: <AdminLogin/>
    },
    {
        path: '/retro',
        element: <Retro/>
    },
    {
        path: '/perfil',
        element: <UserProfile/>,
    },
    {
        path: '/asignarTutor',
        element: <TutorAssignment/>
    },
    {
        path: '/verTarea',
        element: <ViewTasks/>
    },
    {
        path: '/verTesis',
        element: <ViewThesis/>
    },
    {
        path: '/verRetro',
        element: <ViewFeedbacks/>,
    },
    {
        path: '/verEvaluacion',
        element: <ViewEvaluation/>
    },
    {
        path: '/registro',
        element: <UserRegister/>
    },
    {
        path: '/agregarTarea',
        element: <TaskSubmission/>
    },
    {
        path: '/evaluar',
        element: <GradePanel/>,
    },
    {
        path: '/agregarTesis',
        element: <ThesisSubmission/>
    },
    {
        path: '/panelDocumento',
        element: <PanelDocuments/>,
    }
]