'use strict'

const { BrowserWindow } = require('electron');

// impostazioni di default per le finestre
const defaultProps = {
    width: 500,
    height: 800,
    show: false,
    webPreferences: {nodeIntegration: true}
    }

class Window extends BrowserWindow {
    constructor ({ file, ...windowSettings }) {
        // chiamiamo un nuovo BrowserWindows
        super({ ...defaultProps, ...windowSettings });

        // carica l'html e apre devtools
        this.loadFile(file);
        // this.webContents.openDevTools()

        // mostra il tutto quando è pronto per evitare il flickering
        this.once('ready-to-show', () => {
            this.show();
        });
    }
}

module.exports = Window;
