const CharacterCreation = require("../abstract/CharacterCreation");

class Warrior extends CharacterCreation{
    
    constructor(lives = 5 ,atk = 3 ,def = 3 ,class_type = "warrior",inventory=[],gold = 100) {
       super(lives, atk, def, class_type, inventory, gold);
            
        
    }

}

module.exports = Warrior;
// const papa = new CharacterCreation("lives","atk","def","class_type","inventory","gold");

// console.log(papa);

