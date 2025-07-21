class Enemy {

    constructor(lives,atk,def,class_type,gold,level,exp) {
        if ( new.target === Enemy) {
            throw console.error("this accion its not permited");
        } else {
            this.exp = exp
            this.gold = gold;            
            this.lives = lives;
            this.atk = atk;
            this.def = def;
            this.class_type = class_type;
            this.level = level
        }
    }
}

module.exports = Enemy;