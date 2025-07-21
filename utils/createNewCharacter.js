const inquirer = require('inquirer').default;
const fs = require('fs-extra');
const path = require('path');

const Warrior = require("../src/services/Warrior");
const Mage = require("../src/services/Mage");

const FILE_PATH = path.join(__dirname, "../storage/characters.json");

// Mapeo de clases disponibles
const clasesDisponibles = {
  warrior: Warrior,
  mage: Mage,
  // archer: Archer,
};

async function createNewCharacter() {
  try {
    // Preguntar nombre y clase
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

    // Crear instancia del personaje
    const ClasePersonaje = clasesDisponibles[class_type];
    const personaje = {
      name,
      class_type,
      stats: new ClasePersonaje()
    };

    let personajes = [];

    // Leer archivo si existe
    if (await fs.pathExists(FILE_PATH)) {
      personajes = await fs.readJson(FILE_PATH);
      if (!Array.isArray(personajes)) {
        throw new Error("El archivo characters.json no contiene un array válido.");
      }
    }

    // Guardar personaje
    personajes.push(personaje);
    await fs.writeJson(FILE_PATH, personajes, { spaces: 2 });

    console.log(`✅ Personaje "${name}" (${class_type}) guardado correctamente.`);
    console.log("   ***********   ");
    
    return true;
  } catch (error) {
    console.error('❌ Error al crear personaje:', error.message);
    return false;
  }
  
  
  
}

module.exports = createNewCharacter;
