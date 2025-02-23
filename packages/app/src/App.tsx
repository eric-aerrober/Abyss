import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { MainPage } from './pages/main';
import { AbyssBackground } from './library/layout/background';
import { HeaderBar } from './library/layout/header-bar';
import { ModelProfileMainPage } from './pages/model-connections/main';
import { ModelProfileCreatePage } from './pages/model-connections/create';
import { ModelProfileViewPage } from './pages/model-connections/view';

export function App() {
    return (
        <div>
            <HeaderBar />
            <AbyssBackground />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/model-connection" element={<ModelProfileMainPage />} />
                    <Route path="/model-connection/create" element={<ModelProfileCreatePage />} />
                    <Route path="/model-connection/id/:id" element={<ModelProfileViewPage />} />
                    <Route path="*" element={<MainPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
