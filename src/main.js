const { app, BrowserWindow, globalShortcut, ipcMain, dialog } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        frame: true, // shows the top bar
        autoHideMenuBar: true, // hides menu bar on Windows/Linux
        webPreferences: {
            preload: path.join(__dirname, '..', 'dist', 'preload.bundle.js'),
            contextIsolation: true,
            devTools: true // enables dev tools
        }
    });

    win.loadFile(path.join(__dirname, '..', 'dist', 'index.html'));
}

app.whenReady().then(() => {
    createWindow();

    globalShortcut.register('CommandOrControl+Alt+1', () => {
        BrowserWindow.getAllWindows()[0].webContents.send('play-sound', 'slot1');
    });

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

ipcMain.handle('open-file', async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] });
    return canceled ? [] : filePaths;
});