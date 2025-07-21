const Enemy = require("../abstract/Enemys");

class DarkKnight extends Enemy {

    constructor(lives = 10,atk = 17 ,def = 15 ,class_type = "monster",gold=300,level=5,exp=200) {
           super(lives,atk,def,class_type,gold,level,exp)
        }
    }


module.exports = DarkKnight;