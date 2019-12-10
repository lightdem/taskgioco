'use strict'

// Requisiti di base per la finestra
const { ipcRenderer } = require('electron')

// Prendiamo la form dal documento HTML
document.getElementById('taskForm').addEventListener('submit', (evt) => {
    // Evitiamo che la form scateni il normale refresh
	evt.preventDefault()
	// prendiamo l'input dalla form
	const input = evt.target[0]
	// inviamo il task al processo principale
	ipcRenderer.send('aggiungi-task',input.value)
	// resettiamo i valori
	input.value='';
})