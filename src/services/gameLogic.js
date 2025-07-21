const inquirer = require('inquirer').default;

class Battle {
  constructor(player, enemy) {
    this.player = player;
    this.enemy = enemy;
    this.huir = false;

    // Guardar la vida original del jugador
    this.maxLives = player.stats.lives;
  }

  async start() {
    console.log("********************************");
    console.log(`🔥 ¡Comienza la aventura contra ${this.enemy.constructor.name}!`);
    console.log("********************************");

    while (this.player.stats.lives > 0 && this.enemy.lives > 0 && !this.huir) {
      console.log(`\n👤 ${this.player.name} | ❤️ Vidas: ${this.player.stats.lives}`);
      console.log(`👹 ${this.enemy.constructor.name} | ❤️ Vidas: ${this.enemy.lives}`);

      const { accion } = await inquirer.prompt([
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

      switch (accion) {
        case 'atacar': {
          const damage = Math.max(this.player.stats.atk - this.enemy.def, 1);
          this.enemy.lives -= damage;
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
          this.huir = true;
          break;
        }
      }

      // Turno del enemigo
      if (this.enemy.lives > 0 && !this.huir) {
        const damage = Math.max(this.enemy.atk - this.player.stats.def, 1);
        this.player.stats.lives -= damage;
        console.log(`💥 El ${this.enemy.constructor.name} te atacó e hizo ${damage} de daño.`);
      }
    }

    // Resultado del combate
    if (this.player.stats.lives <= 0) {
      console.log("☠️ Has sido derrotado...");
    } else if (this.enemy.lives <= 0) {
      console.log(`🏆 ¡Has vencido al ${this.enemy.constructor.name}!`);
      console.log(`🎉 Ganaste ${this.enemy.exp} EXP y ${this.enemy.gold} gold.`);
      this.player.stats.exp += this.enemy.exp;
      this.player.stats.gold += this.enemy.gold;

      // Reiniciar vida al máximo
      this.player.stats.lives = this.maxLives;
      console.log("❤️ Tus vidas han sido restauradas.");
    }

    // Si huyó o ganó, igual se restauran vidas
    if (this.player.stats.lives > 0 && this.huir) {
      this.player.stats.lives = this.maxLives;
      console.log("😮‍💨 Te recuperaste después de huir.");
    }
  }
}

module.exports = Battle;
