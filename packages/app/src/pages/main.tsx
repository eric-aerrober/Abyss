import React from 'react';
import { PageCenter } from '../library/layout/page-center';
import { IconButton } from '../library/input/button';
import { Box } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const MainPage = () => {
    const navigate = useNavigate();
    return (
        <>
            <PageCenter>
                <img src="/logo.png" alt="logo" className="w-[100px] opacity-50" />
                <div className="text-3xl font-bold text-[#3d5788] rubik-glitch-regular">Abyss</div>
                <div className="grid grid-cols-2 gap-10 mt-12">
                    <IconButton icon={Box} label="Connected Models" onClick={() => navigate('/model-connection')} />
                </div>
            </PageCenter>
        </>
    );
};
