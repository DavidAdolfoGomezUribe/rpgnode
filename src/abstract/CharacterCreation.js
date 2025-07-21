class CharacterCreation {

 
    constructor(lives,atk,def,class_type,inventory,gold,level,exp) {
        if ( new.target === CharacterCreation) {
            throw console.error("this accion its not permited");
        } else {
            this.exp = exp
            this.gold = gold;            
            this.lives = lives;
            this.atk = atk;
            this.def = def;
            this.class_type = class_type;
            this.inventory = inventory;
            this.level = level
        }
    }
}

module.exports = CharacterCreation;