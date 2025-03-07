import { ModelConnections } from '@prisma/client';
import { Box, Download, Link, PaintBucket, Plus, RefreshCcw } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, GhostButton, GhostIconButton, IconButton } from '../../library/input/button';
import { IconSection } from '../../library/layout/icon-section';
import { PageCrumbed } from '../../library/layout/page-crumbed';
import { useDatabaseTableSubscription } from '../../state/database-connection';
import { Select } from '../../library/input/select';
import { Database } from '../../main';
import { AppUpdaterStatus, useAppUpdator } from '../../state/app-updater';

export function SettingsPage() {
    const updater = useAppUpdator();
    const settings = useDatabaseTableSubscription('UserSettings', database => database.table.userSettings.get());

    const updateerMessage = () => {
        switch (updater.status) {
            case AppUpdaterStatus.IDLE:
                return 'No updates available';
            case AppUpdaterStatus.DOWNLOADING:
                return 'Downloading updates...';
            case AppUpdaterStatus.READY_TO_INSTALL:
                return 'Updates downloaded';
            case AppUpdaterStatus.ERROR:
                return 'Error downloading updates';
        }
    };
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

            <IconSection
                icon={Download}
                title="App Updates"
                action={<GhostIconButton icon={RefreshCcw} onClick={() => updater.checkForUpdate()} />}
            >
                <div className="flex flex-col gap-2">
                    <a
                        href="https://github.com/eric-aerrober/Abyss/releases"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block gap-2 flex flex-row items-center hover:underline"
                    >
                        Tracking updates from GitHub <Link className="inline-block" size={16} />
                    </a>
                    <div className="flex flex-row gap-2">
                        <div className="text-text-base">{updateerMessage()}</div>
                    </div>
                </div>
            </IconSection>
        </PageCrumbed>
    );
}
