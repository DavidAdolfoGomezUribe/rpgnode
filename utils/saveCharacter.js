const fs = require('fs-extra');
const path = require('path');
const { getPersonaje } = require('./state');

const SAVE_PATH = path.join(__dirname, "../storage/characters.json");

async function saveCurrentCharacter() {
  const personaje = getPersonaje();
  if (!personaje) {
    console.log("⚠️ No hay ningún personaje seleccionado.");
    return;
  }

  try {
    let personajes = [];

    if (await fs.pathExists(SAVE_PATH)) {
      personajes = await fs.readJson(SAVE_PATH);
      if (!Array.isArray(personajes)) {
        throw new Error("El archivo no contiene un array válido.");
      }
    }

    // Buscar si el personaje ya existe (por id)
    const index = personajes.findIndex(p => p.id === personaje.id);

    if (index !== -1) {
      personajes[index] = personaje; // Actualizar
      console.log(`📝 Personaje actualizado: ${personaje.name} (ID ${personaje.id})`);
    } else {
      personajes.push(personaje); // Agregar nuevo
      console.log(`💾 Nuevo personaje guardado: ${personaje.name} (ID ${personaje.id})`);
    }

    await fs.writeJson(SAVE_PATH, personajes, { spaces: 2 });
  } catch (err) {
    console.error("❌ Error al guardar el personaje:", err.message);
  }
}

module.exports = saveCurrentCharacter;
