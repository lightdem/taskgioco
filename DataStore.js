'use strict'

const Store = require('electron-store');

class DataStore extends Store {
    constructor (settings) {
        super(settings);

        // si inizializza con i task o con un array vuoto
        this.tasks = this.get('tasks') || [];
    }

    salvaTask () {
        // salva i task in un file JSON
        this.set('tasks', this.tasks);

        // ritornando 'this' permettiamo il concatenamento dei metodi
        return this;
    }

    getTask () {
        // imposta gli oggetti task 
        this.tasks = this.get('tasks') || [];

        return this;
    }

    aggiungiTask (task) {
        // fonde i task esistenti con il nuovo task
        this.tasks = [ ...this.tasks, task ];

        return this.salvaTask();
    }

    eliminaTask (task) {
        // rimuove il task bersaglio con filter
        this.tasks = this.tasks.filter(t => t !== task);

        return this.salvaTask();
    }
}

module.exports = DataStore;
