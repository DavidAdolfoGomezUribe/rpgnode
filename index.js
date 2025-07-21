const inquirer = require('inquirer').default;
const fs = require('fs-extra');
const path = require('path');

const Skeleton = require("./src/services/Skeleton");
const Battle = require("./src/services/gameLogic");

// utils
const saveCurrentCharacter = require('./utils/saveCharacter');
const loadSavedGame = require('./utils/loadSavedGame');
const startAdventure = require('./utils/startAdventure');
const openStore = require('./utils/openStore');


const createNewCharacter = require('./utils/createNewCharacter');
const seleccionarPersonajeGuardado = require('./utils/selectCharacter');
const { getPersonaje, setPersonaje } = require('./utils/state');

// Paths
const STORAGE_PATH = path.join(__dirname, 'storage', 'characters.json');
const SAVE_DIR = path.join(__dirname, 'save_files');

async function main() {
  let salir = false;

  while (!salir) {
    const { opcion } = await inquirer.prompt([
      {
        type: 'list',
        name: 'opcion',
        message: '🧙 Bienvenido a Node RPG',
        choices: [
          { name: '👤 Crear nuevo personaje', value: 'create' },
          { name: '📂 Cargar personaje guardado', value: 'load' },
          { name: '💾 Guardar progreso', value: 'save' },
          { name: '⚔️ Comenzar aventura', value: 'adventure' },
          { name: '🏪 Tienda', value: 'store' },
          { name: '🚪 Salir', value: 'exit' },
        ],
      }
    ]);

    switch (opcion) {
      case 'create':
        await createNewCharacter();
        break;

      case 'load':
          await loadSavedGame(); 
          break;

      case 'save':
        await saveCurrentCharacter();
        break;
        

      case 'adventure':
        await startAdventure();
        break;

      case 'store':
        await openStore();
        break;

      case 'exit':
        console.log("👋 ¡Hasta la próxima!");
        salir = true;
        break;
    }
  }
}

main();
