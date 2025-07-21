const Enemy = require("../abstract/Enemys");

class Dragon extends Enemy {

    constructor(lives = 25,atk = 30 ,def = 25 ,class_type = "monster",gold=500,level=10,exp=500) {
           super(lives,atk,def,class_type,gold,level,exp)
        }
    }


module.exports = Dragon;