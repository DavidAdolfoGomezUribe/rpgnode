const CharacterCreation = require("../abstract/CharacterCreation");

class Warrior extends CharacterCreation {
  constructor(lives = 5, atk = 3, def = 3, class_type = "warrior", inventory = [], gold = 100, level = 1, exp = 0) {
    super(lives, atk, def, class_type, inventory, gold, level, exp);

    
  }
}

module.exports = Warrior;
