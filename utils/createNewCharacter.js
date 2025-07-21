const inquirer = require('inquirer').default;
const fs = require('fs-extra');
const path = require('path');

const Warrior = require("../src/services/Warrior");
const Mage = require("../src/services/Mage");

const FILE_PATH = path.join(__dirname, "../storage/characters.json");

const clasesDisponibles = {
  warrior: Warrior,
  mage: Mage,
};

async function createNewCharacter() {
  try {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: '¿Cuál es el nombre del personaje?',
        validate: input => input.trim() !== '' || 'El nombre no puede estar vacío.',
      },
      {
        type: 'list',
        name: 'class_type',
        message: 'Selecciona la clase del personaje:',
        choices: Object.keys(clasesDisponibles),
      }
    ]);

    const { name, class_type } = answers;
    const Clase = clasesDisponibles[class_type];
    const stats = new Clase();

    // Leer personajes actuales
    let personajes = [];
    if (await fs.pathExists(FILE_PATH)) {
      personajes = await fs.readJson(FILE_PATH);
      if (!Array.isArray(personajes)) {
        throw new Error("El archivo de personajes no contiene un array válido.");
      }
    }

    // Generar ID único
    const nextId = personajes.length > 0
      ? Math.max(...personajes.map(p => p.id || 0)) + 1
      : 1;

    // Crear nuevo personaje con ID
    const nuevoPersonaje = {
      id: nextId,
      name,
      class_type,
      stats,
    };

    personajes.push(nuevoPersonaje);
    await fs.writeJson(FILE_PATH, personajes, { spaces: 2 });

    console.log(`✅ Personaje "${name}" creado y guardado con ID #${nextId}`);
    return true;

  } catch (error) {
    console.error('❌ Error al crear personaje:', error.message);
    return false;
  }
}

module.exports = createNewCharacter;
