import { app, BrowserWindow, ipcMain } from "electron";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import pkg from "electron-updater";
const { autoUpdater } = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

process.env.DIST_ELECTRON = join(__dirname, "../");
process.env.DIST = join(process.env.DIST_ELECTRON, "../dist");
process.env.VITE_PUBLIC = process.env.VITE_DEV_SERVER_URL
    ? join(process.env.DIST_ELECTRON, "../public")
    : process.env.DIST;

// Configure auto-updater
autoUpdater.logger = console;
// Enable updates in dev mode
autoUpdater.forceDevUpdateConfig = true;

// Configure GitHub as update source
autoUpdater.setFeedURL({
    provider: "github",
    owner: "eric-aerrober",
    repo: "abyss",
    private: false,
});

// Add event listeners for update events
autoUpdater.on("checking-for-update", () => {
    console.log("Checking for updates...");
});

autoUpdater.on("update-available", (info) => {
    console.log("Update available:", info);
});

autoUpdater.on("update-not-available", (info) => {
    console.log("No updates available:", info);
});

autoUpdater.on("error", (err) => {
    console.error("Auto-updater error:", err);
});

autoUpdater.on("download-progress", (progressObj) => {
    console.log(
        `Download progress - ${progressObj.percent}% (${progressObj.transferred}/${progressObj.total})`
    );
});

autoUpdater.on("update-downloaded", (info) => {
    console.log("Update downloaded:", info);
});

// Check for updates and notify the user
console.log("Starting auto-updater check...");
autoUpdater.checkForUpdatesAndNotify();

if (!app.requestSingleInstanceLock()) {
    app.quit();
    process.exit(0);
}

let win: BrowserWindow | null = null;
const preload = join(__dirname, "../preload/index.mjs");
const url = process.env.VITE_DEV_SERVER_URL;
const indexHtml = join(process.env.DIST, "index.html");

async function createWindow() {
    win = new BrowserWindow({
        title: "Abyss",
        icon: join(process.env.VITE_PUBLIC!, "favicon.ico"),
        webPreferences: {
            preload,
            nodeIntegration: true,
            webSecurity: false,
            contextIsolation: false,
        },
        width: 1200,
        height: 800,
    });

    if (url) {
        win.loadURL(url);
        win.webContents.openDevTools();
    } else {
        win.loadFile(indexHtml);
    }
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
    win = null;
    if (process.platform !== "darwin") app.quit();
});

app.on("second-instance", () => {
    if (win) {
        if (win.isMinimized()) win.restore();
        win.focus();
    }
});

app.on("activate", () => {
    const allWindows = BrowserWindow.getAllWindows();
    if (allWindows.length) {
        allWindows[0].focus();
    } else {
        createWindow();
    }
});

ipcMain.handle("open-win", (_, arg) => {
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
