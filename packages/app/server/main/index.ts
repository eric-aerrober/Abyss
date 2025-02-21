import { app, BrowserWindow, ipcMain, Menu } from "electron";
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

// Configure update settings
autoUpdater.autoDownload = false; // Don't download automatically
autoUpdater.allowDowngrade = false;
autoUpdater.allowPrerelease = false;

// Configure GitHub as update source
autoUpdater.setFeedURL({
    provider: "github",
    owner: "eric-aerrober",
    repo: "Abyss",
    private: false,
});

// Auto-updater event handlers
function setupAutoUpdater() {
    autoUpdater.on("checking-for-update", () => {
        console.log("Checking for updates...");
    });

    autoUpdater.on("update-available", (info) => {
        console.log("Update available:", info);
        autoUpdater.downloadUpdate().catch((err) => {
            console.error("Download failed:", err);
        });
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
        autoUpdater.quitAndInstall(false, true);
    });
}

// Create application menu
function createAppMenu() {
    const isMac = process.platform === "darwin";
    const template = [
        ...(isMac
            ? [
                  {
                      label: app.name,
                      submenu: [
                          { label: "About " + app.name, role: "about" },
                          {
                              label: "Check for Updates...",
                              click: () => {
                                  console.log(
                                      "Manually checking for updates..."
                                  );
                                  autoUpdater.checkForUpdates().catch((err) => {
                                      console.error(
                                          "Update check failed:",
                                          err
                                      );
                                  });
                              },
                          },
                          { type: "separator" },
                          { role: "services" },
                          { type: "separator" },
                          { role: "hide" },
                          { role: "hideOthers" },
                          { role: "unhide" },
                          { type: "separator" },
                          { role: "quit" },
                      ],
                  },
              ]
            : []),
        {
            label: "File",
            submenu: [isMac ? { role: "close" } : { role: "quit" }],
        },
        {
            label: "Edit",
            submenu: [
                { role: "undo" },
                { role: "redo" },
                { type: "separator" },
                { role: "cut" },
                { role: "copy" },
                { role: "paste" },
                ...(isMac
                    ? [
                          { role: "pasteAndMatchStyle" },
                          { role: "delete" },
                          { role: "selectAll" },
                      ]
                    : [
                          { role: "delete" },
                          { type: "separator" },
                          { role: "selectAll" },
                      ]),
            ],
        },
        {
            label: "View",
            submenu: [
                { role: "reload" },
                { role: "forceReload" },
                { role: "toggleDevTools" },
                { type: "separator" },
                { role: "resetZoom" },
                { role: "zoomIn" },
                { role: "zoomOut" },
                { type: "separator" },
                { role: "togglefullscreen" },
            ],
        },
        {
            label: "Window",
            submenu: [
                { role: "minimize" },
                { role: "zoom" },
                ...(isMac
                    ? [
                          { type: "separator" },
                          { role: "front" },
                          { type: "separator" },
                          { role: "window" },
                      ]
                    : [{ role: "close" }]),
            ],
        },
    ];

    const menu = Menu.buildFromTemplate(template as any);
    Menu.setApplicationMenu(menu);
}

// Initialize app
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

if (!app.requestSingleInstanceLock()) {
    app.quit();
    process.exit(0);
}

let win: BrowserWindow | null = null;
const preload = join(__dirname, "../preload/index.mjs");
const url = process.env.VITE_DEV_SERVER_URL;
const indexHtml = join(process.env.DIST, "index.html");

app.whenReady().then(() => {
    setupAutoUpdater();
    createAppMenu();
    createWindow();

    // Initial update check
    console.log("Starting initial auto-updater check...");
    autoUpdater.checkForUpdates().catch((err) => {
        console.error("Initial update check failed:", err);
    });
});

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
