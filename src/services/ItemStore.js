const Item = require('../abstract/Item');

class ItemStore {
  constructor(armor = [], weapons = [], potions = []) {
    this.armor = armor;
    this.weapons = weapons;
    this.potions = potions;
  }

  getAvailableItemsForClass(classType) {
    const filterByClass = item => item.canBeUsedBy(classType);
    return {
      armor: this.armor.filter(filterByClass),
      weapons: this.weapons.filter(filterByClass),
      potions: this.potions.filter(filterByClass),
    };
  }

  getAllItems() {
    return [...this.armor, ...this.weapons, ...this.potions];
  }
}

module.exports = ItemStore;
