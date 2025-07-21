////npm importations
const inquirer = require('inquirer').default;
const fs = require('fs-extra');
const path = require('path');

//services imports
const Warrior = require("./src/services/Warrior");
const Skeleton = require("./src/services/Skeleton");

//utils imports
const createNewCharacter = require('./utils/createNewCharacter');
const seleccionarPersonajeGuardado = require('./utils/selectCharacter');
const { getPersonaje } = require('./utils/state');
const player = require('play-sound')();

//Menu principal
async function mainMenu() {
  let salir = false;

  //posible integrecion a futuro
//   const audio = player.play('./src/sounds/mainmenu.mp3', function (err) {
//   if (err) console.error('❌ Error al reproducir el audio:', err);
// });
    

  //bucle infinito
  while (!salir) {
    //logica usando inquirer
    const answers = await inquirer.prompt([
      {
        type: 'list', //tipo lista 
        name: 'opcion', // opcion
        message: 'Welcome to Node Rpg (NR)',//mensaje por defecto
        choices: [ // opciones
          { name: 'Create a new character', value: 'Character' },
          { name: 'Use a storage character', value: 'Storage' },
          { name: 'Start adventure', value: 'vsCPU'},
          { name: 'Salir', value: 'salir' },
        ],
      },
    ]);

    switch (answers.opcion) {
      case 'Character': {
        const created = await createNewCharacter();
        if (!created) {
          console.log("⚠️ No se creó ningún personaje.");
        }
        break;
      }

      case 'Storage': {
        await seleccionarPersonajeGuardado();
        break;
      }

      case 'vsCPU': {
        {const { getPersonaje } = require('./utils/state');
const inquirer = require('inquirer').default;



 const personaje = getPersonaje();
    if (!personaje) {
        console.log("⚠️ No has seleccionado ningún personaje aún.");
        break;
    }

    const enemy = new Skeleton();

    async function gameLogicAdventure(player, enemy) {
        console.log("********************************");
        console.log(`🔥 ¡Comienza la aventura contra ${enemy.constructor.name}!`);
        console.log("********************************");

        let huir = false;

        while (player.stats.lives > 0 && enemy.lives > 0 && !huir) {
        console.log(`\n👤 ${player.name} | ❤️ Vidas: ${player.stats.lives}`);
        console.log(`👹 ${enemy.constructor.name} | ❤️ Vidas: ${enemy.lives}`);

        const respuesta = await inquirer.prompt([
            {
            type: 'list',
            name: 'accion',
            message: '¿Qué quieres hacer?',
            choices: [
                { name: '⚔️ Atacar', value: 'atacar' },
                { name: '🧪 Usar item', value: 'item' },
                { name: '🌀 Usar habilidad', value: 'habilidad' },
                { name: '🏃 Huir', value: 'huir' },
            ],
            }
        ]);

        switch (respuesta.accion) {
            case 'atacar': {
            const damage = Math.max(player.stats.atk - enemy.def, 1);
            enemy.lives -= damage;
            console.log(`✅ Atacaste al enemigo e hiciste ${damage} de daño.`);
            break;
            }
            case 'item': {
            console.log("🧪 No tienes items aún.");
            break;
            }
            case 'habilidad': {
            console.log("🌀 No tienes habilidades aún.");
            break;
            }
            case 'huir': {
            console.log("🏃 Huiste del combate.");
            huir = true;
            break;
            }
        }

        // Si el enemigo sigue vivo, ataca
        if (enemy.lives > 0 && !huir) {
            const damage = Math.max(enemy.atk - player.stats.def, 1);
            player.stats.lives -= damage;
            console.log(`💥 El ${enemy.constructor.name} te atacó e hizo ${damage} de daño.`);
        }
        }

        // Resultado del combate
        if (player.stats.lives <= 0) {
        console.log("☠️ Has sido derrotado...");
        } else if (enemy.lives <= 0) {
        console.log(`🏆 ¡Has vencido al ${enemy.constructor.name}!`);
        console.log(`🎉 Ganaste ${enemy.exp} EXP y ${enemy.gold} gold.`);
        player.stats.exp += enemy.exp;
        player.stats.gold += enemy.gold;
        }
    }

    await gameLogicAdventure(personaje, enemy);}
   
     //game logic
    break;
    }

      case 'salir': {
        console.log('👋 Adiós!');
        salir = true;
        // audio.kill();
        break;

      }
    }
  }
}

mainMenu();
