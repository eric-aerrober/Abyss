import { ModelConnections } from '@prisma/client';
import { Box, PaintBucket, Plus } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '../../library/input/button';
import { IconSection } from '../../library/layout/icon-section';
import { PageCrumbed } from '../../library/layout/page-crumbed';
import { useDatabaseTableSubscription } from '../../state/database-connection';
import { Select } from '../../library/input/select';
import { Database } from '../../main';

export function SettingsPage() {
    const settings = useDatabaseTableSubscription('UserSettings', database => database.table.userSettings.get());
    const navigate = useNavigate();

    if (!settings.data) {
        return <></>;
    }

    const onChangeAppTheme = (theme: string) => {
        Database.table.userSettings.update({ theme });
    };

    return (
        <PageCrumbed
            title="Abyss Settings"
            breadcrumbs={[
                { name: 'Home', url: '/' },
                { name: 'Settings', url: '/settings' },
            ]}
        >
            <IconSection icon={PaintBucket} title="App Theme">
                <Select
                    value={settings.data.theme || 'abyss'}
                    onChange={onChangeAppTheme}
                    options={[
                        { value: 'abyss', label: 'Abyss' },
                        { value: 'etherial', label: 'Etherial' },
                    ]}
                />
            </IconSection>

            <div className="border border-themed">testing</div>
        </PageCrumbed>
    );
}
