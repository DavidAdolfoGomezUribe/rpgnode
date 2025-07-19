class CharacterCreation {

 
    constructor(lives,atk,def,class_type,inventory,gold) {
        if ( new.target === CharacterCreation) {
            throw console.error("this accion its not permited");
        } else {
            this.gold = gold;            
            this.lives = lives;
            this.atk = atk;
            this.def = def;
            this.class_type = class_type;
            this.inventory = inventory;
            
        }
    }
}

module.exports = CharacterCreation;