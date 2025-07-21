const fs = require('fs-extra');
const path = require('path');
const inquirer = require('inquirer').default;
const { setPersonaje } = require('./state');

const SAVE_PATH = path.join(__dirname, "../storage/characters.json");

async function loadSavedGame() {
  try {
    const personajes = await fs.readJson(SAVE_PATH);

    if (!Array.isArray(personajes) || personajes.length === 0) {
      console.log('⚠️ No hay personajes guardados.');
      return;
    }

    const { seleccionada } = await inquirer.prompt([
      {
        type: 'list',
        name: 'seleccionada',
        message: 'Selecciona un personaje para cargar:',
        choices: personajes.map(p => ({
          name: `ID: ${p.id} | ${p.name} (${p.class_type})`,
          value: p.id
        }))
      }
    ]);

    const personaje = personajes.find(p => p.id === seleccionada);
    if (!personaje) {
      console.log("❌ Error: personaje no encontrado.");
      return;
    }

    setPersonaje(personaje);
    console.log(`✅ Personaje cargado: ${personaje.name} (ID ${personaje.id})`);

  } catch (err) {
    console.error('❌ Error al leer personajes:', err.message);
  }
}

module.exports = loadSavedGame;
