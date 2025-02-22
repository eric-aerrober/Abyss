import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style.css';
import type { PrismaAPI } from '../server/preload/database-connection';

// @ts-ignore
export const Database = window.prisma as PrismaAPI;

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
