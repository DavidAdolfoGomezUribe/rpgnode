const inquirer = require('inquirer').default;

class Battle {
  constructor(player, enemy) {
    this.player = player;
    this.enemy = enemy;
    this.huir = false;
    this.maxLives = player.stats.lives;
  }

  getAtkBonus() {
    return this.player.stats.inventory
      .filter(item => item.type === 'weapon' && item.bonus?.atk)
      .reduce((acc, item) => acc + item.bonus.atk, 0);
  }

  getDefBonus() {
    return this.player.stats.inventory
      .filter(item => item.type === 'armor' && item.bonus?.def)
      .reduce((acc, item) => acc + item.bonus.def, 0);
  }

  async usarPocion() {
    const pociones = this.player.stats.inventory
      .filter((item, i) => item.type === 'potion')
      .map((item, i) => ({
        name: `${item.name} (+${item.bonus.lives} ❤️)`,
        value: i
      }));

    if (pociones.length === 0) {
      console.log("🧪 No tienes pociones.");
      return false; // pierde turno igual
    }

    const { seleccion } = await inquirer.prompt([
      {
        type: 'list',
        name: 'seleccion',
        message: 'Selecciona una poción para usar:',
        choices: pociones
      }
    ]);

    const pocion = this.player.stats.inventory.splice(seleccion, 1)[0];
    this.player.stats.lives += pocion.bonus.lives;
    if (this.player.stats.lives > this.maxLives) {
      this.player.stats.lives = this.maxLives;
    }

    console.log(`🧪 Usaste ${pocion.name}. ❤️ Vidas restauradas: ${this.player.stats.lives}`);
    return true;
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
            { name: '🧪 Usar poción', value: 'item' },
            { name: '🌀 Usar habilidad', value: 'habilidad' },
            { name: '🏃 Huir', value: 'huir' },
          ],
        }
      ]);

      switch (accion) {
        case 'atacar': {
          const totalAtk = this.player.stats.atk + this.getAtkBonus();
          const damage = Math.max(totalAtk - this.enemy.def, 1);
          this.enemy.lives -= damage;
          console.log(`✅ Atacaste e hiciste ${damage} de daño (Base: ${this.player.stats.atk} + Bonus: ${this.getAtkBonus()})`);
          break;
        }
        case 'item': {
          await this.usarPocion(); // pierde turno igual
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
        const totalDef = this.player.stats.def + this.getDefBonus();
        const damage = Math.max(this.enemy.atk - totalDef, 1);
        this.player.stats.lives -= damage;
        console.log(`💥 El ${this.enemy.constructor.name} atacó e hizo ${damage} de daño (Tu defensa: ${this.player.stats.def} + Bonus: ${this.getDefBonus()})`);
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
      this.player.stats.lives = this.maxLives;
      console.log("❤️ Tus vidas han sido restauradas.");
    }

    if (this.player.stats.lives > 0 && this.huir) {
      this.player.stats.lives = this.maxLives;
      console.log("😮‍💨 Te recuperaste después de huir.");
    }
  }
}

module.exports = Battle;
