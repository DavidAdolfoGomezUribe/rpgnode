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