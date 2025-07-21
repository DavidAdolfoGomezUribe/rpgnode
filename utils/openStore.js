const inquirer = require('inquirer').default;
const { getPersonaje } = require('./state');
const ItemStore = require('../src/services/ItemStore');
const { Weapon, Armor, Potion } = require('../src/services/Items');

// Crear ítems
const store = new ItemStore(
  [
    new Armor('Escudo Ligero', 30, 'warrior', { def: 2 }),
    new Armor('Túnica Arcana', 40, 'mage', { def: 1 }),
  ],
  [
    new Weapon('Espada de Hierro', 50, 'warrior', { atk: 2 }),
    new Weapon('Bastón Místico', 70, 'mage', { atk: 4 }),
  ],
  [
    new Potion('Poción de Vida', 20, { lives: 2 })
  ]
);

async function openStore() {
  const personaje = getPersonaje();
  if (!personaje) {
    console.log("⚠️ No hay personaje seleccionado.");
    return;
  }

  let salir = false;

  while (!salir) {
    console.log(`\n🏪 Bienvenido a la tienda, ${personaje.name} (Clase: ${personaje.class_type})`);
    console.log(`💰 Oro: ${personaje.stats.gold} | 🎒 Inventario: ${personaje.stats.inventory.length}/5`);

    const { opcion } = await inquirer.prompt([
      {
        type: 'list',
        name: 'opcion',
        message: '¿Qué deseas hacer?',
        choices: [
          { name: '🛒 Comprar', value: 'comprar' },
          { name: '💰 Vender', value: 'vender' },
          { name: '🚪 Salir de la tienda', value: 'salir' },
        ]
      }
    ]);

    switch (opcion) {
      case 'comprar':
        await comprarItem(personaje);
        break;
      case 'vender':
        await venderItem(personaje);
        break;
      case 'salir':
        salir = true;
        break;
    }
  }
}

async function comprarItem(personaje) {
  if (personaje.stats.inventory.length >= 5) {
    console.log("🎒 Tu inventario está lleno. No puedes llevar más de 5 ítems.");
    return;
  }

  const disponibles = store.getAvailableItemsForClass(personaje.class_type);
  const opciones = [...disponibles.weapons, ...disponibles.armor, ...disponibles.potions];

  if (opciones.length === 0) {
    console.log("🛒 No hay ítems disponibles para tu clase.");
    return;
  }

  const { seleccion } = await inquirer.prompt([
    {
      type: 'list',
      name: 'seleccion',
      message: 'Selecciona un ítem para comprar:',
      choices: opciones.map(item => ({
        name: `${item.name} - 💰 ${item.price} | Bonus: ${JSON.stringify(item.bonus)}`,
        value: item
      }))
    }
  ]);

  if (personaje.stats.gold < seleccion.price) {
    console.log("❌ No tienes suficiente oro.");
    return;
  }

  personaje.stats.gold -= seleccion.price;
  personaje.stats.inventory.push(seleccion);
  console.log(`🛍️ Compraste ${seleccion.name}. Oro restante: ${personaje.stats.gold}`);
}

async function venderItem(personaje) {
  const inventario = personaje.stats.inventory;

  if (inventario.length === 0) {
    console.log("📭 No tienes ítems para vender.");
    return;
  }

  const { itemSeleccionado } = await inquirer.prompt([
    {
      type: 'list',
      name: 'itemSeleccionado',
      message: 'Selecciona un ítem para vender:',
      choices: inventario.map((item, index) => ({
        name: `${item.name} (Recibes: 💰 ${Math.floor(item.price / 2)})`,
        value: index
      }))
    }
  ]);

  const vendido = inventario.splice(itemSeleccionado, 1)[0];
  const oroGanado = Math.floor(vendido.price / 2);
  personaje.stats.gold += oroGanado;

  console.log(`✅ Vendiste ${vendido.name} por 💰 ${oroGanado}. Oro actual: ${personaje.stats.gold}`);
}

module.exports = openStore;
