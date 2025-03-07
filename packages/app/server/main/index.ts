import { app, BrowserWindow, ipcMain, Menu } from 'electron';
import { autoUpdater } from 'electron-updater';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

process.env.DIST_ELECTRON = join(__dirname, '../');
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist');
process.env.VITE_PUBLIC = process.env.VITE_DEV_SERVER_URL ? join(process.env.DIST_ELECTRON, '../public') : process.env.DIST;

// Create the main application window
let mainWindow: BrowserWindow | null = null;
const preload = join(__dirname, '../preload/index.mjs');
const url = process.env.VITE_DEV_SERVER_URL;
const indexHtml = join(process.env.DIST, 'index.html');

async function createWindow() {
    mainWindow = new BrowserWindow({
        title: 'Abyss',
        icon: join(process.env.VITE_PUBLIC!, 'favicon.ico'),
        webPreferences: {
            preload,
            nodeIntegration: true,
            contextIsolation: true,
            webSecurity: true,
        },
        width: 1200,
        height: 800,
        frame: false,
        titleBarStyle: 'hidden',
    });

    if (process.env.VITE_DEV_SERVER_URL) {
        mainWindow.webContents.openDevTools();
    }

    if (url) {
        mainWindow.loadURL(url);
    } else {
        mainWindow.loadFile(indexHtml);
    }
}

// Ensure single instance of the application
if (!app.requestSingleInstanceLock()) {
    app.quit();
    process.exit(0);
}

app.whenReady().then(() => {
    createWindow();
});

app.on('window-all-closed', () => {
    mainWindow = null;
    app.quit();
});

app.on('second-instance', () => {
    if (mainWindow) {
        if (mainWindow.isMinimized()) mainWindow.restore();
        mainWindow.focus();
    }
});

app.on('activate', () => {
    const allWindows = BrowserWindow.getAllWindows();
    if (allWindows.length) {
        allWindows[0].focus();
    } else {
        createWindow();
    }
});

ipcMain.handle('open-win', (_, arg) => {
    const childWindow = new BrowserWindow({
        webPreferences: {
            preload,
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    if (process.env.VITE_DEV_SERVER_URL) {
        childWindow.loadURL(`${url}#${arg}`);
    } else {
        childWindow.loadFile(indexHtml, { hash: arg });
    }
});

autoUpdater.setFeedURL({
    provider: 'github',
    owner: 'eric-aerrober',
    repo: 'Abyss',
    private: false,
});

// Forward autoUpdater events to the renderer via IPC
autoUpdater.on('update-available', info => {
    console.log('Update available:', info);
    if (mainWindow) {
        mainWindow.webContents.send('update-available', info);
    }
});

autoUpdater.on('download-progress', progress => {
    console.log('Download progress:', progress);
    if (mainWindow) {
        mainWindow.webContents.send('download-progress', progress);
    }
});

autoUpdater.on('update-downloaded', info => {
    console.log('Update downloaded:', info);
    if (mainWindow) {
        mainWindow.webContents.send('update-downloaded', info);
    }
});

autoUpdater.on('update-not-available', info => {
    if (mainWindow) {
        mainWindow.webContents.send('update-not-available', info);
    }
});

autoUpdater.on('error', info => {
    if (mainWindow) {
        mainWindow.webContents.send('updator-error', info);
    }
});

autoUpdater.on('update-cancelled', info => {
    if (mainWindow) {
        mainWindow.webContents.send('updator-error', info);
    }
});

ipcMain.handle('check-for-updates', async () => {
    const data = await autoUpdater.checkForUpdates();
    return data?.updateInfo;
});

ipcMain.handle('restart-to-update', () => {
    autoUpdater.quitAndInstall();
});
