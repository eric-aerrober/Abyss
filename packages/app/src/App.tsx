import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { MainPage } from './pages/main';
import { ModelProfileMainPage } from './pages/model-profile/main';
import { AbyssBackground } from './library/layout/background';
import { HeaderBar } from './library/layout/header-bar';
import { ModelProfileCreatePage } from './pages/model-profile/create';

export function App() {
    return (
        <div>
            <HeaderBar />
            <AbyssBackground />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/model-profile" element={<ModelProfileMainPage />} />
                    <Route path="/model-profile/create" element={<ModelProfileCreatePage />} />
                    <Route path="*" element={<MainPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
