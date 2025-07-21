const inquirer = require('inquirer').default;
const Skeleton = require('../src/services/Skeleton');
const Battle = require('../src/services/gameLogic');
const { getPersonaje } = require('./state');

// Futuras implementaciones:
// const DarkKnight = require('../src/services/DarkKnight');
// const Dragon = require('../src/services/Dragon');

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
      console.log("⚠️ DarkKnight aún no está implementado.");
      return;
    case 'dragon':
      console.log("⚠️ Dragon aún no está implementado.");
      return;
    default:
      console.log("❌ Selección inválida.");
      return;
  }

  const batalla = new Battle(personaje, enemigo);
  await batalla.start();
}

module.exports = startAdventure;
