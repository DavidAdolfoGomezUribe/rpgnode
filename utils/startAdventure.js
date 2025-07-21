const inquirer = require("inquirer").default;
const Skeleton = require("../src/services/Skeleton");
const Battle = require("../src/services/gameLogic");
const DarkKnight = require("../src/services/DarkKnight");
const { getPersonaje } = require('./state');
const Dragon = require("../src/services/Dragon");

// Futuras implementaciones:

async function startAdventure() {
  const personaje = getPersonaje();
  if (!personaje) {
    console.log("⚠️ No has seleccionado ningún personaje aún.");
    return;
  }

  const { enemigoSeleccionado } = await inquirer.prompt([
    {
      type: 'list',
      name: 'enemigoSeleccionado',
      message: 'Selecciona un enemigo para enfrentar:',
      choices: [
        { name: '💀 Skeleton (fácil)', value: 'skeleton' },
        { name: '🛡️ DarkKnight (medio)', value: 'darkknight' },
        { name: '🐉 Dragon (difícil)', value: 'dragon' },
      ]
    }
  ]);

  let enemigo;
  switch (enemigoSeleccionado) {
    case 'skeleton':
      enemigo = new Skeleton();
      break;
    case 'darkknight':
      enemigo = new DarkKnight();
      break;
    case 'dragon':
      enemigo = new Dragon();
      break;
    default:
      console.log("❌ Selección inválida.");
      return;
  }

  const batalla = new Battle(personaje, enemigo);
  await batalla.start();
}

module.exports = startAdventure;
