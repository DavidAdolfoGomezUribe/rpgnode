const inquirer = require('inquirer').default;

// utils
const saveCurrentCharacter = require('./utils/saveCharacter');
const loadSavedGame = require('./utils/loadSavedGame');
const startAdventure = require('./utils/startAdventure');
const openStore = require('./utils/openStore');
const startPVP = require('./utils/startPVP');
const createNewCharacter = require('./utils/createNewCharacter');


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
          { name: '🏪 Tienda', value: 'store' },
          { name: '🧑‍🤝‍🧑 PvP: J1 vs J2', value: 'pvp' },
          { name: '⚔️ Comenzar aventura', value: 'adventure' },
          { name: '🚪 Salir', value: 'exit' }
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

     case 'pvp':
      await startPVP();
      break;

      case 'exit':
        console.log("👋 ¡Hasta la próxima!");
        salir = true;
        break;
    }
  }
}

main();
