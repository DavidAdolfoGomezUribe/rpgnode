class Item {
    constructor(name, type, price, classRestriction = null, bonus = {}) {
      if (new.target === Item) {
        throw new Error("Item es una clase abstracta y no puede ser instanciada directamente.");
      }
  
      this.name = name;
      this.type = type; // 'weapon', 'armor', 'potion'
      this.price = price;
      this.classRestriction = classRestriction; // 'warrior', 'mage', etc. || null
      this.bonus = bonus; // ejemplo: { atk: 2, def: 1 }
    }
  
    canBeUsedBy(classType) {
      return !this.classRestriction || this.classRestriction === classType;
    }
  }
  
  module.exports = Item;
  