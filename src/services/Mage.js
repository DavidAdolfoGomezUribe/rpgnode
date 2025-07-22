const CharacterCreation = require("../abstract/CharacterCreation");

class Mage extends CharacterCreation {
  constructor(lives = 4, atk = 5, def = 2, class_type = "mage", inventory = [], gold = 100, level = 1, exp = 0) {
    super(lives, atk, def, class_type, inventory, gold, level, exp);

   
  }
}

module.exports = Mage;
