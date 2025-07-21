const fs = require('fs-extra');
const path = require('path');
const inquirer = require('inquirer').default;

class PvPBattle {
  constructor(jsonPath = path.join(__dirname, '../../storage/characters.json')) {
    this.path = jsonPath;
    this.player1 = null;
    this.player2 = null;
    this.originalLives1 = null;
    this.originalLives2 = null;
    this.turno = 0;
    this.fin = false;
  }

  getAtkBonus(inventory) {
    return inventory
      .filter(i => i.type === 'weapon')
      .reduce((sum, i) => sum + (i.bonus?.atk || 0), 0);
  }

  getDefBonus(inventory) {
    return inventory
      .filter(i => i.type === 'armor')
      .reduce((sum, i) => sum + (i.bonus?.def || 0), 0);
  }

  async usarPocion(jugador) {
    const potions = jugador.stats.inventory
      .filter((item, i) => item.type === 'potion')
      .map((item, i) => ({
        name: `${item.name} (+${item.bonus.lives} ❤️)`,
        value: i
      }));

    if (potions.length === 0) {
      console.log("🧪 No tienes pociones.");
      return;
    }

    const { seleccion } = await inquirer.prompt([
      {
        type: 'list',
        name: 'seleccion',
        message: 'Selecciona una poción para usar:',
        choices: potions
      }
    ]);

    const pocion = jugador.stats.inventory.splice(seleccion, 1)[0];
    jugador.stats.lives += pocion.bonus.lives;
    console.log(`🧪 ${jugador.name} usó ${pocion.name}. ❤️ Vidas: ${jugador.stats.lives}`);
  }

  async seleccionarJugadores() {
    try {
      const personajes = await fs.readJson(this.path);

      if (personajes.length < 2) {
        console.log("⚠️ Se necesitan al menos 2 personajes guardados para PvP.");
        return false;
      }

      const { jugador1Id } = await inquirer.prompt([
        {
          type: 'list',
          name: 'jugador1Id',
          message: 'Jugador 1: selecciona tu personaje:',
          choices: personajes.map(p => ({
            name: `ID ${p.id} | ${p.name} (${p.class_type})`,
            value: p.id
          }))
        }
      ]);

      const restantes = personajes.filter(p => p.id !== jugador1Id);

      const { jugador2Id } = await inquirer.prompt([
        {
          type: 'list',
          name: 'jugador2Id',
          message: 'Jugador 2: selecciona tu personaje:',
          choices: restantes.map(p => ({
            name: `ID ${p.id} | ${p.name} (${p.class_type})`,
            value: p.id
          }))
        }
      ]);

      this.player1 = JSON.parse(JSON.stringify(personajes.find(p => p.id === jugador1Id)));
      this.player2 = JSON.parse(JSON.stringify(personajes.find(p => p.id === jugador2Id)));

      this.originalLives1 = this.player1.stats.lives;
      this.originalLives2 = this.player2.stats.lives;

      return true;
    } catch (err) {
      console.error("❌ Error al seleccionar personajes:", err.message);
      return false;
    }
  }

  async start() {
    const jugadoresSeleccionados = await this.seleccionarJugadores();
    if (!jugadoresSeleccionados) return;

    console.log(`⚔️ ${this.player1.name} VS ${this.player2.name} ⚔️`);

    while (!this.fin) {
      const atacante = this.turno % 2 === 0 ? this.player1 : this.player2;
      const defensor = this.turno % 2 === 0 ? this.player2 : this.player1;

      console.log(`\n🎯 Turno de ${atacante.name}`);
      console.log(`🛡️ ${defensor.name} tiene ❤️ ${defensor.stats.lives}`);

      const { accion } = await inquirer.prompt([
        {
          type: 'list',
          name: 'accion',
          message: `¿Qué desea hacer ${atacante.name}?`,
          choices: [
            { name: '⚔️ Atacar', value: 'atacar' },
            { name: '🧪 Usar poción', value: 'item' },
          ]
        }
      ]);

      if (accion === 'atacar') {
        const atkBonus = this.getAtkBonus(atacante.stats.inventory);
        const defBonus = this.getDefBonus(defensor.stats.inventory);

        const dmg = Math.max(atacante.stats.atk + atkBonus - (defensor.stats.def + defBonus), 1);
        defensor.stats.lives -= dmg;

        console.log(`💥 ${atacante.name} hace ${dmg} de daño a ${defensor.name}`);
      } else if (accion === 'item') {
        await this.usarPocion(atacante);
      }

      if (defensor.stats.lives <= 0) {
        console.log(`🏆 ${atacante.name} ha derrotado a ${defensor.name} y gana el combate PvP!`);
        this.fin = true;
      } else {
        this.turno++;
      }
    }

    this.player1.stats.lives = this.originalLives1;
    this.player2.stats.lives = this.originalLives2;

    console.log("🔁 Ambos personajes han sido restaurados a sus vidas originales.");
  }
}

module.exports = PvPBattle;
