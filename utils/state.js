// utils/state.js

let personajeSeleccionado = null;

module.exports = {
  getPersonaje: () => personajeSeleccionado,
  setPersonaje: (p) => { personajeSeleccionado = p; }
};
