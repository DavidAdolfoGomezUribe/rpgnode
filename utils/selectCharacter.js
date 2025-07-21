const fs = require('fs-extra');
const path = require('path');
const inquirer = require('inquirer').default;
const { setPersonaje } = require('./state');

const FILE_PATH = path.join(__dirname, '../storage/characters.json');

async function seleccionarPersonajeGuardado() {
  try {
    const personajes = await fs.readJson(FILE_PATH);

    if (!Array.isArray(personajes) || personajes.length === 0) {
      console.log('❌ No hay personajes guardados.');
      return;
    }

    const respuestas = await inquirer.prompt([
      {
        type: 'list',
        name: 'seleccionado',
        message: 'Selecciona un personaje guardado:',
        choices: personajes.map((p, i) => ({
          name: `${p.name} (${p.class_type})`,
          value: i,
        }))
      }
    ]);

    const personaje = personajes[respuestas.seleccionado];
    setPersonaje(personaje);
    console.log(`✅ Personaje "${personaje.name}" cargado correctamente.`);

  } catch (err) {
    console.error('❌ Error al leer personajes:', err.message);
  }
}

module.exports = seleccionarPersonajeGuardado;
