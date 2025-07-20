// In preload.js
const { contextBridge, ipcRenderer } = require('electron');
const fs = require('fs');
const path = require('path');

const dataPath = path.join(
    require('electron').app.getPath('userData'),
    'boards.json'
);

contextBridge.exposeInMainWorld('storage', {
    save: (layout) =>
        fs.writeFileSync(dataPath, JSON.stringify(layout, null, 2)),
    load: () =>
        fs.existsSync(dataPath)
            ? JSON.parse(fs.readFileSync(dataPath))
            : null,
});
