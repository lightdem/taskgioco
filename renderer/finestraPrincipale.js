'use strict';
const { ipcRenderer } = require('electron');

// Rimuovi task da una lista esistente
const eliminaTask = (e) => {
	ipcRenderer.send('elimina-task', e.target.textContent)
};


// Gestione dei task
ipcRenderer.on('tasks', (event, tasks) => {
    //prende l'elenco dallo storage
    const elencoTask = document.getElementById('elencoTask')

    //lo trasformiamo in stringa HTML
    const ogettiTask = tasks.reduce((html, task) =>
          {
        html += `<li class="oggetto-task">${task}</li>`
              console.log(task);
        return html
          }, '')

    // Impostiamo la lista html in elencoTask
    elencoTask.innerHTML = ogettiTask

    // Aggiungiamo la gestione per eliminare i task
    elencoTask.querySelectorAll('.oggetto-task').forEach(item => {
        item.addEventListener('click', eliminaTask)
    })
})

// Creiamo le azioni del pulsante nella pagina
document.getElementById('btnCreaTask').addEventListener('click',(e) => {
    ipcRenderer.send('aggiungi-task-finestra')
});
