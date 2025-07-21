const PvPBattle = require('../src/services/PvPBattle');

async function startPVP() {
  const combate = new PvPBattle();
  await combate.start();
}

module.exports = startPVP;
