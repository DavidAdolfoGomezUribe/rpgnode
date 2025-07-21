const Item = require('../abstract/Item');

class Weapon extends Item {
  constructor(name, price, classRestriction, bonus) {
    super(name, 'weapon', price, classRestriction, bonus);
  }
}

class Armor extends Item {
  constructor(name, price, classRestriction, bonus) {
    super(name, 'armor', price, classRestriction, bonus);
  }
}

class Potion extends Item {
  constructor(name, price, bonus) {
    super(name, 'potion', price, null, bonus); // potions son universales
  }
}

module.exports = {
  Weapon,
  Armor,
  Potion
};
