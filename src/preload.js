const { contextBridge, ipcRenderer } = require('electron');
const fs = require('fs');
const path = require('path');

let dataPath = '';

ipcRenderer.invoke('getDataPath').then((userData) => {
    dataPath = path.join(userData, 'ByteBlast-boards.json');
});

contextBridge.exposeInMainWorld('storage', {
    save: (layout) => {
        if (!dataPath) return console.warn('Data path not yet loaded.');
        try {
            fs.writeFileSync(dataPath, JSON.stringify(layout, null, 2));
        } catch (err) {
            console.error('Save failed:', err);
        }
    },
    load: () => {
        if (!dataPath) return null;
        try {
            return fs.existsSync(dataPath)
                ? JSON.parse(fs.readFileSync(dataPath))
                : null;
        } catch (err) {
            console.error('Load failed:', err);
            return null;
        }
    }
});