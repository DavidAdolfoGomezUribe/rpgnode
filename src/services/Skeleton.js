const Enemy = require("../abstract/Enemys");

class Skeleton extends Enemy {

    constructor(lives = 3,atk = 4 ,def = 1 ,class_type = "monster",gold=100,level=1,exp=50) {
           super(lives,atk,def,class_type,gold,level,exp)
        }
    }


module.exports = Skeleton;