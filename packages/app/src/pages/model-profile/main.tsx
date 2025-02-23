import { ModelProfiles } from '@prisma/client';
import { Box, Plus } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '../../library/input/button';
import { IconSection } from '../../library/layout/icon-section';
import { PageCrumbed } from '../../library/layout/page-crumbed';
import { useDatabaseTableSubscription } from '../../state/database-connection';

function ModelProfileCard({ model }: { model: ModelProfiles }) {
    const navigate = useNavigate();
    return (
        <div
            className="flex flex-col gap-1 bg-bg-secondary p-2 rounded-sm border border-transparent hover:border-primary-300 transition-colors cursor-pointer"
            onClick={() => navigate(`/model-profile/id/${model.id}`)}
        >
            <div className="text-text-400">{model.name}</div>
            <div className="text-text-500">{model.provider}</div>
        </div>
    );
}

export const ModelProfileMainPage = () => {
    // Subscribe to the model profiles table and get the data whenever it changes
    const ModelProfiles = useDatabaseTableSubscription('ModelProfiles', async database => database.table.ModelProfiles.findMany());

    // Navigate to the model profile page
    const navigate = useNavigate();

    const createModelProfileElement = () => {
        return <IconButton icon={Plus} onClick={() => navigate('/model-profile/create')} />;
    };

    return (
        <PageCrumbed
            title="Connected Models"
            breadcrumbs={[
                { name: 'Home', url: '/' },
                { name: 'Models', url: '/model-profile' },
            ]}
        >
            <IconSection title="Model Profiles" icon={Box} action={createModelProfileElement()}>
                {ModelProfiles.data?.map(model => (
                    <ModelProfileCard key={model.id} model={model} />
                ))}
                {ModelProfiles.data?.length === 0 && <div className="text-text-500">No model profiles found</div>}
            </IconSection>
        </PageCrumbed>
    );
};
