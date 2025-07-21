const levelRequirements = {
  2: 100,
  3: 250,
  4: 450,
  5: 700,
  6: 1000,
  7: 1400,
  8: 1900,
  9: 2500,
  10: 5000,
};

function revisarSubidaNivel(personaje) {
  const { exp, level } = personaje.stats;

  // Ya está en el nivel máximo
  if (level >= 10) return;

  const siguienteNivel = level + 1;
  const expNecesaria = levelRequirements[siguienteNivel];

  if (exp >= expNecesaria) {
    personaje.stats.level = siguienteNivel;
    personaje.stats.atk += 1;
    personaje.stats.def += 1;
    personaje.stats.lives += 1;

    console.log(`🆙 ¡${personaje.name} ha subido a nivel ${siguienteNivel}!`);
    console.log(`📈 Stats: ❤️+1 | 🗡️+1 | 🛡️+1`);

    // Verificar si puede subir más niveles en cadena
    revisarSubidaNivel(personaje);
  }
}

module.exports = revisarSubidaNivel;
