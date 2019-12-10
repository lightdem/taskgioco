// Il modulo principale electron
const {app, ipcMain} = require('electron');
const path = require('path')
const Window = require('./Window.js')
const DataStore = require('./DataStore.js')
require('electron-reload');
// creiamo l'archivio per i nostri task
const datiTask=new DataStore({name:'Lista task'})

function main () {
    // Creiamo la finestra per l'elenco dei tag in memoria
    let finestraPrincipale = new Window({
      file: path.join('./renderer','finestraPrincipale.html')
    });

    // Aggiungiamo la finestra dei task alla memoria
    let finestraAggiungiTask

    //inziializza finestraPrincipale con il datastore dei task
    finestraPrincipale.once('show', () =>  {
        finestraPrincipale.webContents.send('tasks', datiTask.tasks);
    });

    ipcMain.on("aggiungi-task-finestra", () => {
		// Creiamo la nuova finestra quando l'utente clicca il pulsante 'Crea nuovo task'
		if (!finestraAggiungiTask) {
			// creiamo una nuova finestra per aggiungere il task
			finestraAggiungiTask = new Window({
				file: path.join('renderer','finestraAggiungiTask.html'),
				width: 400,
				height: 400,
				/// rendiamo finestraAggiungiTask figlo di finestraPrincipale
				parent: finestraPrincipale
			})
		
			// puliamo la finestra alla chiusura
			finestraAggiungiTask.on('closed', () => {
				finestraAggiungiTask = null
			})
		}
    })
    
    // evento per la creazione di un nuovo task
	ipcMain.on('aggiungi-task', (event, task) => {
		const taskAggiornati = datiTask.aggiungiTask(task).tasks
		// aggiorniamo la finestra
		finestraPrincipale.send('tasks', taskAggiornati)
	})

    // Evento che rimuove un task
	ipcMain.on('elimina-task', (event, task) => {
		const taskAggiornati = datiTask.eliminaTask(task).tasks

		finestraPrincipale.send('tasks', taskAggiornati)
	})


}
// Fine della funzione main
// aspettiamo che l'applicazione sia pronta
app.on('ready',main)
// Chiudiamo tutto quando si chiude la finestra principale
app.on('closed',function() {
    app.quit();
  });
  